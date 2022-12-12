import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSaleItemDto {
  @IsNotEmpty({ message: 'A quantidade não pode ser vazio.' })
  @IsNumber({}, { message: 'A quantidade não pode ser vazio.' })
  quantity: number;

  @IsNotEmpty({ message: 'O produto id não pode ser vazio.' })
  @IsNumber({}, { message: 'O produto id não pode ser vazio.' })
  productId: number;

  price: number;
}
