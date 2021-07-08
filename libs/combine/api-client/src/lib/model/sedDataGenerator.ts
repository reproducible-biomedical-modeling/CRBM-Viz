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
import { SedVariable } from './sedVariable';

/**
 * Data generator for SED report or plot.
 */
export interface SedDataGenerator {
  /**
   * Unique identifier within its parent SED document.
   */
  id: string;
  /**
   * Brief description.
   */
  name?: string;
  /**
   * Variables.
   */
  variables: Array<SedVariable>;
  /**
   * Mathematical expression for its value.
   */
  math: string;
  /**
   * Id of the results of a data set.
   */
  _resultsDataSetId?: string;
  /**
   * Type.
   */
  _type: SedDataGenerator.TypeEnum;
}
export namespace SedDataGenerator {
  export type TypeEnum = 'SedDataGenerator';
  export const TypeEnum = {
    SedDataGenerator: 'SedDataGenerator' as TypeEnum,
  };
}