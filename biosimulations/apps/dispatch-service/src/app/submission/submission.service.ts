import { SimulationRun } from '@biosimulations/dispatch/api-models';
import {
  DispatchPayload,
  DispatchMessage,
  DispatchFinishedPayload
} from '@biosimulations/messages/messages';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { HpcService } from '../services/hpc/hpc.service';
import { SimulationRunService } from '@biosimulations/dispatch/nest-client';
import { SimulationRunStatus } from '@biosimulations/datamodel/common';

@Injectable({})
export class SubmissionService {
  logger: Logger;
  constructor(
    private service: SimulationRunService,
    private hpcService: HpcService,
    private schedulerRegistry: SchedulerRegistry,
    @Inject('NATS_CLIENT') private messageClient: ClientProxy
  ) {
    this.logger = new Logger(SubmissionService.name);
  }
  private createJob(
    jobId: string,
    simId: string,
    seconds: number,
    transpose: boolean
  ) {
    const job = new CronJob(`*/${seconds.toString()} * * * * *`, async () => {
      const jobStatus: SimulationRunStatus = await this.hpcService.getJobStatus(
        jobId
      );
      this.logger.debug(
        `Checking status for job with id ${jobId} for simulation ${simId}: Status is ${jobStatus}`
      );

      this.updateSimulationRunStatus(simId, jobStatus);

      switch (jobStatus) {
        case SimulationRunStatus.QUEUED: {
          const message: DispatchPayload = {
            _message: DispatchMessage.queued,
            id: simId
          };
          this.messageClient.emit(DispatchMessage.queued, message);


          break;
        }

        case SimulationRunStatus.RUNNING: {
          const runningMessage: DispatchPayload = {
            _message: DispatchMessage.started,
            id: simId
          };
          this.messageClient.emit(DispatchMessage.started, runningMessage);

          break;
        }

        case SimulationRunStatus.PROCESSING: {

          const succeededMessage: DispatchFinishedPayload = {
            _message: DispatchMessage.finished,
            id: simId,
            transpose: transpose
          };
          this.messageClient.emit(DispatchMessage.finished, succeededMessage);
          this.schedulerRegistry.getCronJob(jobId).stop();
          break;
        }
        case SimulationRunStatus.FAILED: {
          this.logger.error(`Job with id ${jobId} failed`);

          const failedMessage: DispatchPayload = {
            _message: DispatchMessage.failed,
            id: simId
          };
          this.messageClient.emit(DispatchMessage.failed, failedMessage);
          this.schedulerRegistry.getCronJob(jobId).stop();

          break;
        }
      }
    });
    return job;
  }
  async startMonitoringCronJob(
    jobId: string,
    simId: string,
    seconds: number,
    transpose: boolean
  ) {
    const job = this.createJob(jobId, simId, seconds, transpose);
    this.schedulerRegistry.addCronJob(jobId, job);
    this.logger.debug(
      `Starting to monitor job with id ${jobId} for simulation ${simId}`
    );
    job.start();
  }

  async updateSimulationRunStatus(
    simId: string,
    simStatus: SimulationRunStatus
  ): Promise<SimulationRun | void> {
    return this.service.updateSimulationRunStatus(simId, simStatus).toPromise().then(val => {
      this.logger.log("Successfully updated simulation")
    }).catch(err => {
      this.logger.error("Failed to update status")
      return
    });;
  }
}
