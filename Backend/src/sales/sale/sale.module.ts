import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginRepository } from 'src/login/repository/login.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductRepository } from 'src/products/product/repository/product.repository';
import { SaleRepository } from './repository/sale.repository';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  controllers: [SaleController],
  providers: [
    PrismaService,
    SaleService,
    SaleRepository,
    ProductRepository,
    AuthService,
    LoginRepository,
  ],
})
export class SaleModule {}
