import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

import {
  ArrayNotEmpty,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CreateSaleItemDto } from 'src/sales/saleItem/dto/create-sale-item.dto';

export class CreateSaleDto {
  @ApiProperty({
    description: 'Para entrega',
  })
  @IsBoolean({ message: 'Informe se é para entrega.' })
  toDelivery: boolean;

  @ApiProperty({
    description: 'Entregue',
    default: false,
  })
  @IsBoolean({ message: 'Venda entregue?.' })
  delivered: boolean;

  @ApiProperty({
    description: 'Id do cliente',
  })
  @IsNotEmpty({ message: 'O cliente id não pode ser vazio.' })
  @IsNumber({}, { message: 'O cliente id não pode ser vazio.' })
  clientId: number;

  @ApiProperty({
    description: 'Itens da venda',
    type: [CreateSaleItemDto],
  })
  @IsNotEmpty({ message: 'Os itens da venda deve conter os itens.' })
  @ArrayNotEmpty({
    message: 'Os itens da venda deve conter os itens.',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemDto)
  saleItem: CreateSaleItemDto[];

  sellerId: bigint;
}
