import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SbatchService {
  constructor(private configService: ConfigService) {}

  public generateSbatch(
    tempSimDir: string,
    simulator: string,
    omexName: string,
    apiDomain: string,
    simId: string,
  ): string {
    const homeDir = this.configService.get('hpc.homeDir');
    apiDomain = 'https://run.api.biosimulations.dev/';
    const template = `#!/bin/bash    
#SBATCH --job-name=${simId}_Biosimulations
#SBATCH --time=20:00
#SBATCH --output=${tempSimDir}/out/job.output
#SBATCH --error=${tempSimDir}/out/job.output
#SBATCH --ntasks=1
#SBATCH --mem-per-cpu=1000
#SBATCH --partition=crbm
#SBATCH --qos=general\n

export MODULEPATH=/isg/shared/modulefiles:/tgcapps/modulefiles
source /usr/share/Modules/init/bash
module load singularity/3.1.1
export XDG_RUNTIME_DIR=${homeDir}/singularityXDG/
export SINGULARITY_CACHEDIR=${homeDir}/singularityCache/
wget ${apiDomain}run/${simId}/download -O "${tempSimDir}/in/${omexName}" 1>"${tempSimDir}/out/job.output" 2>&1
singularity run -B ${tempSimDir}/in:/root/in -B ${tempSimDir}/out:/root/out ${simulator} -i '/root/in/${omexName}' -o /root/out
date`;
    return template;
  }

  public generateImageUpdateSbatch(url: string, force: string): string {
    const homeDir = this.configService.get('hpc.homeDir');
    const template = `#!/bin/bash    
#SBATCH --job-name=BioSimulations_Image_Update
#SBATCH --time=10:00
#SBATCH --output=${homeDir}/singularityImages/job.output
#SBATCH --ntasks=1
#SBATCH --mem-per-cpu=1000
#SBATCH --partition=crbm
#SBATCH --qos=general\n
export MODULEPATH=/isg/shared/modulefiles:/tgcapps/modulefiles
source /usr/share/Modules/init/bash
module load singularity/3.1.1
export XDG_RUNTIME_DIR=${homeDir}/singularityXDG/
export SINGULARITY_CACHEDIR=${homeDir}/singularityCache/
command=\\"cd singularityImages && singularity pull ${force} ${url}\\"
    eval \\$command; `;
    return template;
  }
}
