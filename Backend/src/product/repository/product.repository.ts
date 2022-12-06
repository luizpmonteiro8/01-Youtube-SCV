import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const results = await this.prisma.product.findMany({
      skip: page * size,
      take: Number(size),
      where: { name: { contains: search, mode: 'insensitive' } },
      orderBy: { [sort]: order },
      include: { unity: true },
    });
    const totalItems = await this.prisma.product.count({
      where: { name: { contains: search, mode: 'insensitive' } },
    });
    return { results, totalItems };
  }

  async findById(id: bigint) {
    return await this.prisma.product.findFirstOrThrow({
      where: { id },
      include: { unity: true },
    });
  }

  async create(createProductDTO: CreateProductDto) {
    return await this.prisma.product.create({ data: createProductDTO });
  }

  async update(id: bigint, updateProductDTO: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data: updateProductDTO,
    });
  }

  async remove(id: bigint) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }
}
