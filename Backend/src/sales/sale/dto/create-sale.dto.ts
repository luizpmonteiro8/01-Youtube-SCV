import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateSaleItemDto } from 'src/sales/saleItem/dto/create-sale-item.dto';

export class CreateSaleDto {
  @IsBoolean({ message: 'Informe se é para entrega.' })
  toDelivery: boolean;

  @IsBoolean({ message: 'Venda entregue?.' })
  delivered: boolean;

  @IsNotEmpty({ message: 'O cliente id não pode ser vazio.' })
  @IsNumber({}, { message: 'O cliente id não pode ser vazio.' })
  clientId: number;

  @IsNotEmpty({ message: 'Os items da venda deve conter os itens.' })
  @ArrayNotEmpty({
    message: 'Os items da venda deve conter os itens.',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemDto)
  saleItem: CreateSaleItemDto[];

  sellerId: number;
}
