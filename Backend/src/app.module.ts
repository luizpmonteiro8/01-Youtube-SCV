import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { PrismaService } from './prisma/prisma.service';
import { CategoryModule } from './products/category/category.module';
import { ProductModule } from './products/product/product.module';
import { UnityModule } from './products/unity/unity.module';
import { SaleModule } from './sales/sale/sale.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [
    UnityModule,
    ProductModule,
    CategoryModule,
    SellerModule,
    ClientModule,
    SaleModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
