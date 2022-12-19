import { PartialType } from '@nestjs/swagger/dist/type-helpers';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Id',
  })
  @IsNumber({}, { message: 'O id não pode ser vazio.' })
  @Type(() => Number)
  readonly id: bigint;

  @IsOptional()
  @IsObject({ message: 'O endereço não pode ser vazio.' })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty({ message: 'Ativo não pode ser vazio.' })
  @IsBoolean({ message: 'Ativo não pode ser vazio.' })
  enabled: boolean;
}
