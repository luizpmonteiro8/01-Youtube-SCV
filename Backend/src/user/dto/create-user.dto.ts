import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O email não pode ser vazio.' })
  @IsEmail({}, { message: 'O email está inválido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazio.' })
  @IsString({ message: 'A senha não pode ser vazio.' })
  @MinLength(8, { message: 'A senha deve conter 8 caracteres no mínimo.' })
  password: string;

  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome não pode ser vazio.' })
  name: string;
}
