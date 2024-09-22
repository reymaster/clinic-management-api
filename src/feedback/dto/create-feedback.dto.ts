import { IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateFeedbackDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number; // Avaliação de 1 a 5

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsInt()
  clientId: number; // ID do cliente que fez o feedback

  @IsInt()
  treatmentId: number; // ID do tratamento avaliado
}
