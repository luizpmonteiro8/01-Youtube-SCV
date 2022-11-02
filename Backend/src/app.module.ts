import { Module } from '@nestjs/common';
import { UnityModule } from './unity/unity.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UnityModule, ProductModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
