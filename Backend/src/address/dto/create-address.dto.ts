import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Rua',
  })
  @IsNotEmpty({ message: 'A rua não pode ser vazio.' })
  @IsString({ message: 'A rua não pode ser vazio.' })
  street: string;

  @ApiProperty({
    description: 'Número',
  })
  @IsNotEmpty({ message: 'O número não pode ser vazio.' })
  @IsString({ message: 'O número não pode ser vazio.' })
  number: string;

  @ApiProperty({
    description: 'Complemento',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'O complemento não pode ser vazio.' })
  @IsString({ message: 'O complemento não pode ser vazio.' })
  complement: string;

  @ApiProperty({
    description: 'Cep',
  })
  @IsNotEmpty({ message: 'O cep não pode ser vazio.' })
  @IsString({ message: 'O cep não pode ser vazio.' })
  zipCode: string;

  @ApiProperty({
    description: 'Bairro',
  })
  @IsNotEmpty({ message: 'O bairro não pode ser vazio.' })
  @IsString({ message: 'O bairro não pode ser vazio.' })
  district: string;

  @ApiProperty({
    description: 'Estado',
  })
  @IsNotEmpty({ message: 'O estado não pode ser vazio.' })
  @IsString({ message: 'O estado não pode ser vazio.' })
  state: string;

  @ApiProperty({
    description: 'País',
  })
  @IsNotEmpty({ message: 'O país não pode ser vazio.' })
  @IsString({ message: 'O país não pode ser vazio.' })
  country: string;
}
