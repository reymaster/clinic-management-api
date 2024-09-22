import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateEquipmentDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Nome do equipamento

  @IsString()
  @IsNotEmpty()
  description: string; // Descrição do equipamento

  @IsString()
  @IsNotEmpty()
  status: string; // Status do equipamento (ex: disponível, em manutenção)

  @IsArray()
  treatmentIds: number[]; // IDs dos tratamentos que utilizam o equipamento
}
