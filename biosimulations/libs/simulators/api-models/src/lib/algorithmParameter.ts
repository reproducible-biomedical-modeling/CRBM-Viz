import { KisaoOntologyId } from '@biosimulations/datamodel/api';
import {
  AlgorithmParameter as IAlgorithmParameter,
  AlgorithmParameterType,
} from '@biosimulations/datamodel/common';

import { ApiProperty } from '@nestjs/swagger';

export class AlgorithmParameter implements IAlgorithmParameter {
  @ApiProperty()
  kisaoId!: KisaoOntologyId;

  @ApiProperty({
    description: "Id of the parameter within the simulator's implementation of the algorithm such as the name of a function argument which implements the parameter. The scope of this id is typically limited to the individual simulator.",
    type: String,
    nullable: true,
    required: false,
    default: null,
  })
  id!: string | null;

  @ApiProperty({
    description: "Name of the parameter within the simulator's implementation of the algorithm. The scope of this name is typically limited to the individual simulator.",
    type: String,
    nullable: true,
    required: false,
    default: null
  })
  name!: string | null;

  @ApiProperty({
    enum: AlgorithmParameterType,
  })
  type!: AlgorithmParameterType;

  @ApiProperty({
    type: String,
    example: "30.5",
    nullable: true,
  })
  value!: string | null;

  @ApiProperty({
    type: [String],
    example: ["22.7", "2270"],
    nullable: true,
  })
  recommendedRange!: string[] | null;
}
