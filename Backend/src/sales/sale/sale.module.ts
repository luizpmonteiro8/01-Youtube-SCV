import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductRepository } from 'src/products/product/repository/product.repository';
import { SaleItemService } from '../saleItem/saleItem.service';
import { SaleRepository } from './repository/sale.repository';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  controllers: [SaleController],
  providers: [
    PrismaService,
    SaleService,
    SaleRepository,
    SaleItemService,
    ProductRepository,
  ],
})
export class SaleModule {}
