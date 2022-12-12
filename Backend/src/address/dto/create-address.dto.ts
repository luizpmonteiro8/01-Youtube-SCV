import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'A rua não pode ser vazio.' })
  @IsString({ message: 'A rua não pode ser vazio.' })
  street: string;

  @IsNotEmpty({ message: 'O número não pode ser vazio.' })
  @IsString({ message: 'O número não pode ser vazio.' })
  number: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O complemento não pode ser vazio.' })
  @IsString({ message: 'O complemento não pode ser vazio.' })
  complement: string;

  @IsNotEmpty({ message: 'O cep não pode ser vazio.' })
  @IsString({ message: 'O cep não pode ser vazio.' })
  zipCode: string;

  @IsNotEmpty({ message: 'O bairro não pode ser vazio.' })
  @IsString({ message: 'O bairro não pode ser vazio.' })
  district: string;

  @IsNotEmpty({ message: 'O estado não pode ser vazio.' })
  @IsString({ message: 'O estado não pode ser vazio.' })
  state: string;

  @IsNotEmpty({ message: 'O país não pode ser vazio.' })
  @IsString({ message: 'O país não pode ser vazio.' })
  country: string;
}
