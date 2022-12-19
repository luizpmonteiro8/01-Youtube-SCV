import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateSaleItemDto {
  @ApiProperty({
    description: 'Quantidade',
  })
  @IsNotEmpty({ message: 'A quantidade não pode ser vazio.' })
  @IsNumber({}, { message: 'A quantidade não pode ser vazio.' })
  quantity: number;

  @ApiProperty({
    description: 'Id do produto',
  })
  @IsNotEmpty({ message: 'O produto id não pode ser vazio.' })
  @IsNumber({}, { message: 'O produto id não pode ser vazio.' })
  productId: number;

  price: number;
}
