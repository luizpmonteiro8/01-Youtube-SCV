import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
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
  @ApiProperty({
    description: 'Nome',
  })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome não pode ser vazio.' })
  name: string;

  @ApiProperty({
    description: 'Cpf',
  })
  @IsNotEmpty({ message: 'O cpf não pode ser vazio.' })
  @IsString({ message: 'O cpf não pode ser vazio.' })
  @Validate(CPFValidation, { message: 'CPF inválido!' })
  cpf: string;

  @ApiProperty({
    description: 'Endereço',
  })
  @IsObject({ message: 'O endereço não pode ser vazio.' })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
