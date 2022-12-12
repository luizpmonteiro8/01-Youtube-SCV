import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { CPFValidation } from 'src/validator/cpf.validator';

export class CreateClientDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome não pode ser vazio.' })
  name: string;

  @IsNotEmpty({ message: 'O cpf não pode ser vazio.' })
  @IsString({ message: 'O cpf não pode ser vazio.' })
  @Validate(CPFValidation, { message: 'CPF inválido!' })
  cpf: string;

  @IsObject({ message: 'O endereço não pode ser vazio.' })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
