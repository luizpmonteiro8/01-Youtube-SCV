import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome',
  })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome não pode ser vazio.' })
  name: string;

  @ApiProperty({
    description: 'Preço de venda',
  })
  @IsNumber({}, { message: 'O preço de venda deve ser um número.' })
  @Type(() => Number)
  priceSale: number;

  @ApiProperty({
    description: 'Id da unidade',
  })
  @IsNumber({}, { message: 'A unidade deve ser um número.' })
  @Type(() => Number)
  unityId: number;

  @ApiProperty({
    description: 'Id da categoria',
  })
  @IsNotEmpty({ message: 'A categoria deve ser um conjunto de número.' })
  @ArrayNotEmpty({ message: 'A categoria deve ser um conjunto de número.' })
  @IsNumber(
    {},
    { message: 'A categoria deve ser um conjunto de número.', each: true },
  )
  categoryId: number[];
}
