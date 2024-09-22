import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string; // O email deve ser válido

  @IsString()
  @MinLength(6)
  password: string; // A senha deve ter no mínimo 6 caracteres

  @IsString()
  role: string; // O papel do usuário (ex: 'admin' ou 'user')
}
