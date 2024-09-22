import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsInt()
  @IsNotEmpty()
  clientId: number;

  @IsInt()
  @IsNotEmpty()
  treatmentId: number;
}
