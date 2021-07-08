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
import { SedAlgorithm } from './sedAlgorithm';

/**
 * A SED one step simulation.
 */
export interface SedOneStepSimulation {
  /**
   * Unique identifier within its parent SED document.
   */
  id: string;
  /**
   * Type of the simulation.
   */
  _type: SedOneStepSimulation.TypeEnum;
  /**
   * Brief description.
   */
  name?: string;
  /**
   * Step size.
   */
  step?: number;
  algorithm: SedAlgorithm;
}
export namespace SedOneStepSimulation {
  export type TypeEnum = 'SedOneStepSimulation';
  export const TypeEnum = {
    SedOneStepSimulation: 'SedOneStepSimulation' as TypeEnum,
  };
}