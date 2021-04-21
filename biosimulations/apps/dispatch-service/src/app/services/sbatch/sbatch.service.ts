import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SbatchService {
  public constructor(private configService: ConfigService) {}

  public generateSbatch(
    tempSimDir: string,
    simulator: string,
    cpus: number,
    memory: number,
    maxTime: number,
    omexName: string,
    apiDomain: string,
    simId: string,
  ): string {
    const homeDir = this.configService.get('hpc.homeDir');
    const bucket = this.configService.get('storage.bucket');
    const endpoint = this.configService.get('storage.endpoint');

    const memoryFormatted = Math.ceil(memory * 1000);

    let maxTimeMin = Math.floor(maxTime);
    let maxTimeSec = Math.ceil((maxTime % 1) * 60);
    if (maxTimeSec == 60) {
      maxTimeMin++;
      maxTimeSec = 0;
    }
    const maxTimeFormatted = `${maxTimeMin}:${maxTimeSec
      .toString()
      .padStart(2, '0')}`;

    const nc = '\\033[0m';
    const red = '\\033[0;31m';
    const cyan = '\\033[0;36m';

    if (apiDomain.startsWith('http://localhost')) {
      apiDomain = 'https://run.api.biosimulations.dev/';
    }
    /*
     *
     */
    const template = `#!/bin/bash
#SBATCH --job-name=${simId}_Biosimulations
#SBATCH --time=${maxTimeFormatted}
#SBATCH --output=${tempSimDir}/job.output
#SBATCH --error=${tempSimDir}/job.output
#SBATCH --chdir=${tempSimDir}
#SBATCH --ntasks=1
#SBATCH --partition=crbm
#SBATCH --mem=${memoryFormatted}M
#SBATCH --cpus-per-task=${cpus}
#SBATCH --qos=general\n

export MODULEPATH=/isg/shared/modulefiles:/tgcapps/modulefiles
source /usr/share/Modules/init/bash
export PATH=$PATH:/usr/sbin/
module load singularity/3.7.1
export SINGULARITY_CACHEDIR=${homeDir}/singularity/cache/
export SINGULARITY_LOCALCACHEDIR=${homeDir}/singularity/localCache/
export SINGULARITY_TMPDIR=${homeDir}/singularity/tmp/
export SINGULARITY_PULLFOLDER=${homeDir}/singularity/images/
cd ${tempSimDir}
echo -e '${cyan}=============Downloading Combine Archive=============${nc}'
srun wget ${apiDomain}run/${simId}/download -O '${omexName}'
echo -e '${cyan}=============Running docker image for simulator=============${nc}'
srun  singularity run -B ${tempSimDir}:/root ${simulator} -i '/root/${omexName}' -o '/root'
echo -e '${cyan}=============Creating output archive=============${nc}'
srun zip ${simId}.zip reports.h5 log.yml plots.zip job.output
echo -e '${cyan}=============Uploading outputs to storage=============${nc}'
srun aws --no-verify-ssl --endpoint-url  ${endpoint} s3 sync --exclude "*.sbatch" --exclude "*.omex" . s3://${bucket}/${simId}

`;

    return template;
  }

  public generateImageUpdateSbatch(url: string, force: string): string {
    const homeDir = this.configService.get('hpc.homeDir');
    const image = url.split('docker://ghcr.io/biosimulators/')[1];
    const template = `#!/bin/bash
#SBATCH --job-name=${image}-Build
#SBATCH --time=90:00
#SBATCH --chdir=${homeDir}/singularity/images/
#SBATCH --partition=crbm
#SBATCH --qos=general
#SBATCH --ntasks=1
#SBATCH --output=${homeDir}/singularity/images/${image}.output
#SBATCH --cpus-per-task=8
#SBATCH --mem=16G

export MODULEPATH=/isg/shared/modulefiles:/tgcapps/modulefiles
source /usr/share/Modules/init/bash
export PATH=$PATH:/usr/sbin/
module load singularity/3.7.1
export SINGULARITY_CACHEDIR=${homeDir}/singularity/cache/
export SINGULARITY_LOCALCACHEDIR=${homeDir}/singularity/localCache/
export SINGULARITY_TMPDIR=${homeDir}/singularity/tmp/
export SINGULARITY_PULLFOLDER=${homeDir}/singularity/images/
echo "Building On:"
hostname
echo "Using Singularity"
singularity --version
singularity -v pull ${force} ${url}`;
    return template;
  }
}
