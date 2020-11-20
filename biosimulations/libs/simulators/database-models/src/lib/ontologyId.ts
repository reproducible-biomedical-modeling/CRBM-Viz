import {
  IOntologyId,
  Ontologies,
  IEdamOntologyId,
  IKisaoOntologyId,
  ISboOntologyId,
  ISioOntologyId,
  ISpdxOntologyId,
  KisaoIdRegEx,
  SboIdRegEx,
  SioIdRegEx,
  Identifier as IIdentifier,
  EdamFormatIdRegEx,
} from '@biosimulations/datamodel/common';
import { OntologiesService } from '@biosimulations/ontology/ontologies';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  _id: false,
  storeSubdocValidationError: false,
  strict: 'throw',
  useNestedStrict: true,
})
class Identifier implements IIdentifier {
  @Prop({ required: true })
  namespace!: string;
  @Prop({ required: true })
  id!: string;
  @Prop({ required: true })
  url!: string;
}
export const IdentifierSchema = SchemaFactory.createForClass(Identifier);

@Schema({
  _id: false,
  storeSubdocValidationError: false,
  strict: 'throw',
  useNestedStrict: true,
})
class OntologyId implements IOntologyId {
  @Prop({
    type: String,
    required: true,
    enum: Object.keys(Ontologies).map((k) => Ontologies[k as Ontologies]),
  })
  namespace!: Ontologies;

  @Prop({ required: true })
  id!: string;
}
export const OntologyIdSchema = SchemaFactory.createForClass(OntologyId);

@Schema({
  _id: false,
  storeSubdocValidationError: false,
  strict: 'throw',
  useNestedStrict: true,
})
class EdamOntologyId implements IEdamOntologyId {
  @Prop({ type: String, required: true, enum: [Ontologies.EDAM] })
  namespace!: Ontologies.EDAM;

  @Prop({
    required: true,
    validate: [
      {
        validator: EdamFormatIdRegEx,
        message: props => `${props.value} is not an id for an EDAM term!`
      },
      {
        validator: OntologiesService.edamValidator,
        message: props => `${props.value} is not an id for an EDAM term!`
      },
    ],
  })
  id!: string;
}
export const EdamOntologyIdSchema = SchemaFactory.createForClass(
  EdamOntologyId
);

@Schema({
  _id: false,
  storeSubdocValidationError: false,
  strict: 'throw',
  useNestedStrict: true,
})
class KisaoOntologyId implements IKisaoOntologyId {
  @Prop({
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    validate: (val: string) => val === Ontologies.KISAO,
  })
  namespace!: Ontologies.KISAO;

  @Prop({
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    validate: [
      { 
        validator: KisaoIdRegEx,
        message: props => `${props.value} is not an id for a KiSAO term!`
      },
      { 
        validator: OntologiesService.kisaoValidator,
        message: props => `${props.value} is not an id for a KiSAO term!`
      },
    ],
  })
  id!: string;
}
export const KisaoOntologyIdSchema = SchemaFactory.createForClass(
  KisaoOntologyId
);

@Schema({
  _id: false,
  storeSubdocValidationError: false,
  strict: 'throw',
  useNestedStrict: true,
})
class SboOntologyId implements ISboOntologyId {
  @Prop({ type: String, required: true })
  namespace!: Ontologies.SBO;

  @Prop({
    required: true,
    validate: [
      {
        validator: SboIdRegEx,
        message: props => `${props.value} is not an id for a SBO term!`
      },
      {
        validator: OntologiesService.sboValidator,
        message: props => `${props.value} is not an id for a SBO term!`
      },
    ],
  })
  id!: string;
}
export const SboOntologyIdSchema = SchemaFactory.createForClass(SboOntologyId);

@Schema({
  _id: false,
  storeSubdocValidationError: false,
  strict: 'throw',
  useNestedStrict: true,
})
class SioOntologyId implements ISioOntologyId {
  @Prop({ type: String, required: true })
  namespace!: Ontologies.SIO;

  @Prop({
    required: true,
    validate: [
      {
        validator: SioIdRegEx,
        message: props => `${props.value} is not an id for a SIO term!`
      },
      {
        validator: OntologiesService.sioValidator,
        message: props => `${props.value} is not an id for a SIO term!`
      },
    ],
  })
  id!: string;
}
export const SioOntologyIdSchema = SchemaFactory.createForClass(SioOntologyId);

@Schema({
  _id: false,
  storeSubdocValidationError: false,
  strict: 'throw',
  useNestedStrict: true,
})
class SpdxOntologyId implements ISpdxOntologyId {
  @Prop({ type: String, required: true })
  namespace!: Ontologies.SPDX;

  @Prop({
    type: String,
    required: true,
    validate: [{
      validator: OntologiesService.spdxValidator,
      message: props => `${props.value} is not an id for a SPDX term!`
    }],
  })
  id!: string;
}
export const SpdxOntologyIdSchema = SchemaFactory.createForClass(SpdxOntologyId);
