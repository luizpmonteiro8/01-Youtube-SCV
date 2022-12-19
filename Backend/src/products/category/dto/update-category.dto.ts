import { PartialType } from '@nestjs/swagger/dist/type-helpers';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    description: 'Id',
  })
  @IsNumber({}, { message: 'O id não pode ser vazio.' })
  @Type(() => Number)
  readonly id: bigint;
}
