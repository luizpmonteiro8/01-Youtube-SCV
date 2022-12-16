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
      include: { unity: true, categories: true },
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
    return await this.prisma.product.create({
      select: { id: true },
      data: {
        name: createProductDTO.name,
        priceSale: createProductDTO.priceSale,
        unityId: createProductDTO.unityId,
        categories: {
          connect: createProductDTO.categoryId.map((itemCategory) => ({
            id: itemCategory,
          })),
        },
      },
    });
  }

  async update(id: bigint, updateProductDTO: UpdateProductDto) {
    await this.prisma.product.update({
      where: { id },
      data: {
        categories: {
          set: [],
        },
      },
    });

    return await this.prisma.product.update({
      select: { id: true },
      where: { id },
      data: {
        name: updateProductDTO.name,
        priceSale: updateProductDTO.priceSale,
        unityId: updateProductDTO.unityId,
        categories: {
          connect: updateProductDTO.categoryId.map((itemCategory) => ({
            id: itemCategory,
          })),
        },
      },
    });
  }

  async remove(id: bigint) {
    return await this.prisma.product.delete({
      select: { id: true },
      where: { id },
    });
  }
}