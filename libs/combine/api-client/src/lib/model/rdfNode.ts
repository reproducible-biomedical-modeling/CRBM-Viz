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
import { RdfUriNode } from './rdfUriNode';
import { RdfLiteralNode } from './rdfLiteralNode';
import { RdfBlankNode } from './rdfBlankNode';

/**
 * A node of an RDF triple.
 */
export interface RdfNode {
  /**
   * Type
   */
  _type: RdfNode.TypeEnum;
  /**
   * Uniform Resource Identifier (URI)
   */
  value: string;
}
export namespace RdfNode {
  export type TypeEnum = 'RdfUriNode';
  export const TypeEnum = {
    RdfUriNode: 'RdfUriNode' as TypeEnum,
  };
}
