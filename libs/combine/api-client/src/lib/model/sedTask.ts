/**
 * BioSimulations COMBINE service
 * Endpoints for working with COMBINE/OMEX archives and model (e.g., SBML) and simulation (e.g., SED-ML) files that they typically contain.  Note, this API may change significantly in the future.
 *
 * The version of the OpenAPI document: 0.1
 * Contact: info@biosimulations.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { SedSimulation } from './sedSimulation';
import { SedModel } from './sedModel';

/**
 * A SED task.
 */
export interface SedTask {
  /**
   * Unique identifier within is parent SED document.
   */
  id: string;
  /**
   * Brief description.
   */
  name?: string;
  model: SedModel;
  simulation: SedSimulation;
  /**
   * Type.
   */
  _type: SedTask.TypeEnum;
}
export namespace SedTask {
  export type TypeEnum = 'SedTask';
  export const TypeEnum = {
    SedTask: 'SedTask' as TypeEnum,
  };
}