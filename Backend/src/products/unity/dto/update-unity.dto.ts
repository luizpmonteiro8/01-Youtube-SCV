import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { PartialType } from '@nestjs/swagger/dist/type-helpers';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { CreateUnityDto } from './create-unity.dto';

export class UpdateUnityDto extends PartialType(CreateUnityDto) {
  @ApiProperty({
    description: 'Id da unidade',
  })
  @ApiProperty({
    description: 'Id',
  })
  @IsNumber({}, { message: 'O id não pode ser vazio.' })
  @Type(() => Number)
  readonly id: bigint;
}
