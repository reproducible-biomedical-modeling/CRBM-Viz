import { ExternalReferences, Person } from '@biosimulations/datamodel/api';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { SpdxOntologyId } from '@biosimulations/datamodel/api';
import { Image } from './image';
import { Algorithm } from './algorithm';
import { BiosimulatorsMeta } from './biosimulatorsMeta';

export class Simulator {
  @ApiProperty()
  biosimulators!: BiosimulatorsMeta;

  @ApiProperty({
    example: 'tellurium',
    name: 'id',
  })
  id!: string;

  @ApiProperty({ example: 'Tellurium' })
  name!: string;

  @ApiProperty({
    example: '2.1.6',
  })
  version!: string;

  @ApiProperty({
    example:
      'Tellurium is a Python-based environment for model building, simulation, and analysis that facilitates reproducibility of models in systems and synthetic biology.',
  })
  description!: string;

  @ApiProperty({
    example: 'http://tellurium.analogmachine.org/',
  })
  url!: string;

  @ApiProperty({
    required: true,
    nullable: true,
    type: Image,
  })
  image!: Image | null;

  @ApiProperty({ type: [Person] })
  authors!: Person[];
  @ApiProperty({ type: ExternalReferences })
  references!: ExternalReferences;
  @ApiProperty({ type: SpdxOntologyId, required: true, nullable: true })
  license!: SpdxOntologyId | null;
  @ApiProperty({ type: [Algorithm] })
  algorithms!: Algorithm[];

  @ApiResponseProperty({})
  created!: Date;
  @ApiResponseProperty({})
  updated!: Date;
}
