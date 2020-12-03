import { Injectable, Logger } from '@nestjs/common';

import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import {
  DispatchSimulationModelDB as DSimMDB,
  DispatchSimulationModel as DSimModel,
} from '@biosimulations/dispatch/api-models';
import { SimulationStatus } from '@biosimulations/datamodel/common';

@Injectable()
export class ModelsService {
  private logger = new Logger(ModelsService.name);
  constructor(
    @InjectModel(DSimMDB)
    private readonly dispatchSimulationModel: ReturnModelType<typeof DSimMDB>
  ) {}

  async createNewDispatchSimulationModel(model: DSimModel) {
    const createdDispatchSimulationModel = new this.dispatchSimulationModel(
      new DSimMDB(model)
    ).save();
    return createdDispatchSimulationModel;
  }
  async search(): Promise<DSimMDB[] | null> {
    return this.dispatchSimulationModel.find().lean();
  }

  async get(uuid: string): Promise<DSimMDB | null> {
    return this.dispatchSimulationModel.findOne({ uuid });
  }
  async deleteAll() {
    return this.dispatchSimulationModel.deleteMany({});
  }

  async updateStatus(uuid: string, status: SimulationStatus) {
    const doc = await this.dispatchSimulationModel.findOne({ uuid });
    if (doc !== null) {
      doc.status = status;
      doc.updated = new Date();
      doc.runtime =
        (doc.updated.getTime() - doc.submitted.getTime()) / 1000;
      await doc.save();
    }
  }

  async getData(uuids: string[]) {
    return this.dispatchSimulationModel.find({
      uuid: { $in: uuids },
    });
  }

  async getOlderUuids() {
    const now = new Date();
    const sixMonthsOldDate = now.setDate(now.getDate() - 180);
    return await this.dispatchSimulationModel.find(
      {
        submitted: { $lt: new Date(sixMonthsOldDate) },
      },
      { uuid: 1, _id: 0 }
    );
  }

  async deleteSixOldData(uuids: string[]) {
    try {
      await this.dispatchSimulationModel.deleteMany({
        uuid: {
          $in: uuids,
        },
      });
    } catch (error) {
      this.logger.log('Write error: ', error);
    }
  }
}
