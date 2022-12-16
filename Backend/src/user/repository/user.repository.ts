import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const results = await this.prisma.user.findMany({
      skip: page * size,
      take: Number(size),
      where: {
        seller: { name: { contains: search, mode: 'insensitive' } },
      },
      orderBy: { [sort]: order },
      include: { seller: { include: { address: true } } },
    });
    const totalItems = await this.prisma.user.count({
      where: {
        seller: { name: { contains: search, mode: 'insensitive' } },
      },
    });
    return { results, totalItems };
  }

  async findById(id: bigint) {
    return await this.prisma.user.findFirstOrThrow({
      where: { id },
    });
  }

  async create(createUserDTO: CreateUserDto) {
    return await this.prisma.user.create({
      select: { id: true },
      data: {
        email: createUserDTO.email,
        enabled: true,
        password: createUserDTO.password,
        seller: { create: { name: createUserDTO.name } },
      },
    });
  }

  async update(id: bigint, updateUserDTO: UpdateUserDto) {
    const seller = await this.prisma.seller.findFirst({
      where: { userId: id },
      include: { address: true },
    });

    return await this.prisma.user.update({
      select: { id: true },
      where: { id },
      data: {
        email: updateUserDTO.email,
        enabled: updateUserDTO.enabled,
        password: updateUserDTO.password,
        seller: {
          update: {
            name: updateUserDTO.name,
            address: updateUserDTO.address
              ? {
                  upsert: {
                    update: { ...updateUserDTO.address },
                    create: { ...updateUserDTO.address },
                  },
                }
              : seller.address
              ? { delete: true }
              : undefined,
          },
        },
      },
    });
  }

  async remove(id: bigint) {
    return await this.prisma.user.delete({
      select: { id: true },
      where: { id },
    });
  }
}
