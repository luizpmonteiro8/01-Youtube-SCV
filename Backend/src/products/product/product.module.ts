import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductRepository } from './repository/product.repository';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [PrismaService, ProductService, ProductRepository],
})
export class ProductModule {}
