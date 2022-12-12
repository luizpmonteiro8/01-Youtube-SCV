import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const results = await this.prisma.category.findMany({
      skip: page * size,
      take: Number(size),
      where: { name: { contains: search, mode: 'insensitive' } },
      orderBy: { [sort]: order },
    });
    const totalItems = await this.prisma.category.count({
      where: { name: { contains: search, mode: 'insensitive' } },
    });
    return { results, totalItems };
  }

  async findById(id: bigint) {
    return await this.prisma.category.findFirstOrThrow({
      where: { id },
    });
  }

  async create(createCategoryDTO: CreateCategoryDto) {
    return await this.prisma.category.create({
      select: { id: true },
      data: createCategoryDTO,
    });
  }

  async update(id: bigint, updateCategoryDTO: UpdateCategoryDto) {
    return await this.prisma.category.update({
      select: { id: true },
      where: { id },
      data: updateCategoryDTO,
    });
  }

  async remove(id: bigint) {
    return await this.prisma.category.delete({
      select: { id: true },
      where: { id },
    });
  }
}
