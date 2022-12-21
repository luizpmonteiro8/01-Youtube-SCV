import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSellerDto } from '../dto/update-seller.dto';

@Injectable()
export class SellerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const results = await this.prisma.seller.findMany({
      skip: page * size,
      take: Number(size),
      where: { name: { contains: search, mode: 'insensitive' } },
      orderBy: { [sort]: order },
      include: { address: true },
    });
    const totalItems = await this.prisma.seller.count({
      where: { name: { contains: search, mode: 'insensitive' } },
    });
    return { results, totalItems };
  }

  async findById(id: bigint) {
    return await this.prisma.seller.findFirstOrThrow({
      where: { id },
    });
  }

  /*  async create(createSellerDTO: CreateSellerDto) {
    return await this.prisma.seller.create({
      select: { id: true },
      data: {
        name: createSellerDTO.name,
        address: { create: { ...createSellerDTO.address } },
      },
    });
  } */

  async update(id: bigint, updateSellerDTO: UpdateSellerDto) {
    return await this.prisma.seller.update({
      select: { id: true },
      where: { id },
      data: {
        name: updateSellerDTO.name,
        address: { update: { ...updateSellerDTO.address } },
      },
    });
  }

  async remove(id: bigint) {
    return await this.prisma.seller.delete({
      select: { id: true },
      where: { id },
    });
  }
}
