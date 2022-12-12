import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SellerRepository } from './repository/seller.repository';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

@Module({
  controllers: [SellerController],
  providers: [PrismaService, SellerService, SellerRepository],
})
export class SellerModule {}
