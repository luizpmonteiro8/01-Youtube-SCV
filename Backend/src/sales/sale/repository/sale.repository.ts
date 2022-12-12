import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from '../dto/create-sale.dto';
import { UpdateSaleDto } from '../dto/update-sale.dto';

@Injectable()
export class SaleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const results = await this.prisma.sale.findMany({
      skip: page * size,
      take: Number(size),
      orderBy: { [sort]: order },
      include: {
        saleItem: { include: { product: true } },
        client: true,
        seller: true,
      },
    });
    const totalItems = await this.prisma.sale.count({});
    return { results, totalItems };
  }

  async findById(id: bigint) {
    return await this.prisma.sale.findFirstOrThrow({
      where: { id },
    });
  }

  async create(createSaleDTO: CreateSaleDto) {
    return await this.prisma.sale.create({
      select: { id: true },
      data: {
        toDelivery: createSaleDTO.toDelivery,
        delivered: createSaleDTO.delivered,
        clientId: createSaleDTO.clientId,
        sellerId: createSaleDTO.sellerId,
        saleItem: {
          create: createSaleDTO.saleItem.map((item) => {
            return {
              price: item.price,
              quantity: item.quantity,
              productId: item.productId,
            };
          }),
        },
      },
    });
  }

  async update(id: bigint, updateSaleDTO: UpdateSaleDto) {
    await this.prisma.saleItem.deleteMany({
      where: { saleId: updateSaleDTO.id },
    });

    return await this.prisma.sale.update({
      select: { id: true },
      where: { id },
      data: {
        toDelivery: updateSaleDTO.toDelivery,
        delivered: updateSaleDTO.delivered,
        clientId: updateSaleDTO.clientId,
        sellerId: updateSaleDTO.sellerId,
        saleItem: {
          create: updateSaleDTO.saleItem.map((item) => {
            return {
              price: item.price,
              quantity: item.quantity,
              productId: item.productId,
            };
          }),
        },
      },
    });
  }

  async remove(id: bigint) {
    return await this.prisma.sale.delete({
      select: { id: true },
      where: { id },
    });
  }
}
