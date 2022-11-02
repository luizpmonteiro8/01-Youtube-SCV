import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome não pode ser vazio.' })
  name: string;

  @IsNumber({}, { message: 'O preço de venda deve ser um número.' })
  @Type(() => Number)
  priceSale: number;

  @IsNumber({}, { message: 'A unidade deve ser um número.' })
  @Type(() => Number)
  unityId: number;
}
