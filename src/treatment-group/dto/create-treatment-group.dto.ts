import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTreatmentGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  treatments: number[];
}
