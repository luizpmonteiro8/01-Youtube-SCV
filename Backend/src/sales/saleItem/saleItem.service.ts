import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/products/product/repository/product.repository';
import { CreateSaleItemDto } from './dto/create-sale-item.dto';

@Injectable()
export class SaleItemService {
  constructor(private readonly repository: ProductRepository) {}

  async addPriceToSaleItem(saleItem: CreateSaleItemDto) {
    const product = await this.repository.findById(BigInt(saleItem.productId));
    console.log('pre', product);

    saleItem.price = Number(product.priceSale);
  }
}
