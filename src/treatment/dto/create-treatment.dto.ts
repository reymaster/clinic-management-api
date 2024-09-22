import {
  IsString,
  IsInt,
  IsDecimal,
  MinLength,
  Min,
  MaxLength,
  IsArray,
} from 'class-validator';

export class CreateTreatmentDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(255)
  description: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsDecimal({ decimal_digits: '2', force_decimal: false })
  price: number;

  @IsArray()
  categoryIds: number[]; // Lista de IDs das categorias

  @IsArray()
  equipmentIds: number[]; // Lista de IDs dos equipamentos
}
