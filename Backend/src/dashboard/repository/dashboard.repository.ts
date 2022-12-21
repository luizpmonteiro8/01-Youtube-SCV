import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async dashboard() {
    const productCount = await this.prisma.product.count();
    const productLast = await this.prisma.product.findFirst({
      orderBy: { id: 'desc' },
    });
    const categoryCount = await this.prisma.category.count();
    const saleCount = await this.prisma.sale.count();
    const saleLastItem = await this.prisma.sale.findFirst({
      orderBy: { id: 'desc' },
      include: { seller: true },
    });
    const saleLastTotal = await this.prisma.$queryRaw(
      Prisma.sql`select sum(s.quantity * s.price) from sale_item as s where "saleId"=${saleLastItem.id}`,
    );

    return {
      productCount,
      productLast: productLast.name,
      categoryCount,
      saleCount,
      saleLastSeller: saleLastItem.seller.name,
      saleLastTotal: saleLastTotal[0].sum,
      date: new Date().toLocaleString(),
    };
  }
}
