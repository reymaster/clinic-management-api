import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTreatmentCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  groupIds: number[];
}
