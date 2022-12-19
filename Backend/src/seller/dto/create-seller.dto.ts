import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreateSellerDto {
  @ApiProperty({
    description: 'Nome',
  })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome não pode ser vazio.' })
  name: string;

  @ApiProperty({
    description: 'Endereço',
    required: false,
  })
  @IsOptional()
  @IsObject({ message: 'O endereço não pode ser vazio.' })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
