import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email',
  })
  @IsNotEmpty({ message: 'O email não pode ser vazio.' })
  @IsEmail({}, { message: 'O email está inválido.' })
  email: string;

  @ApiProperty({
    description: 'Senha',
    minimum: 8,
  })
  @IsNotEmpty({ message: 'A senha não pode ser vazio.' })
  @IsString({ message: 'A senha não pode ser vazio.' })
  @MinLength(8, { message: 'A senha deve conter 8 caracteres no mínimo.' })
  password: string;
}
