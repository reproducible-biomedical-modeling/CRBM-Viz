import { modelOptions, prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { SimulationStatus } from '@biosimulations/datamodel/common';

export interface DispatchSimulationModel {
  uuid: string;
  email: string;
  name: string;
  simulator: string;
  simulatorVersion: string;
  submitted: Date;
  updated: Date;
  status: SimulationStatus;
  runtime: number;
  resultsSize: number;
  projectSize: number;
}

export interface DispatchSimulator {
  id: string;
  version: string;
}

@modelOptions({ schemaOptions: { collection: 'dispatches' } })
export class DispatchSimulationModelDB implements DispatchSimulationModel {
  @ApiProperty({ type: String })
  @prop({ type: String, required: true })
  uuid!: string;

  @ApiProperty({ type: String })
  @prop({ type: String, required: false })
  email!: string;

  @ApiProperty({ type: String })
  @prop({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  @prop({ type: String })
  simulator!: string;

  @ApiProperty({ type: String })
  @prop({ type: String })
  simulatorVersion!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  @prop()
  submitted!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  @prop()
  updated!: Date;

  @ApiProperty({ type: String, enum: SimulationStatus })
  @prop({
    type: String, 
    enum: Object.entries(SimulationStatus).map((keyVal: [string, string]): string => {
      return keyVal[1];
    }),
  })
  status!: SimulationStatus;

  @ApiProperty({ type: Number })
  @prop({ type: Number })
  runtime!: number;

  @prop({ type: Number })
  projectSize!: number;

  @prop({ type: Number })
  resultsSize!: number;

  constructor(public model: DispatchSimulationModel) {
    this.uuid = model.uuid;
    this.email = model.email;
    this.name = model.name;
    this.simulator = model.simulator;
    this.simulatorVersion = model.simulatorVersion;
    this.submitted = model.submitted;
    this.updated = model.updated;
    this.status = model.status;
    this.runtime = model.runtime;
    this.resultsSize = model.resultsSize;
    this.projectSize = model.projectSize;
  }
}
