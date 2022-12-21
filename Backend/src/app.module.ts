import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { PrismaService } from './prisma/prisma.service';
import { CategoryModule } from './products/category/category.module';
import { ProductModule } from './products/product/product.module';
import { UnityModule } from './products/unity/unity.module';
import { SaleModule } from './sales/sale/sale.module';
import { SellerModule } from './seller/seller.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UnityModule,
    ProductModule,
    CategoryModule,
    SellerModule,
    ClientModule,
    SaleModule,
    UserModule,
    LoginModule,
    DashboardModule,
    AuthModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
