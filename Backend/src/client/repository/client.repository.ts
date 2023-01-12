import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const results = await this.prisma.client.findMany({
      skip: page * size,
      take: Number(size),
      where: { name: { contains: search, mode: 'insensitive' } },
      orderBy: { [sort]: order },
      include: { address: true },
    });
    const totalItems = await this.prisma.client.count({
      where: { name: { contains: search, mode: 'insensitive' } },
    });
    return { results, totalItems };
  }

  async findById(id: bigint) {
    return await this.prisma.client.findFirstOrThrow({
      where: { id },
	  include: { address: true },
    });
  }

  async create(createClientDTO: CreateClientDto) {
    return await this.prisma.client.create({
      select: { id: true },
      data: {
        name: createClientDTO.name,
        cpf: createClientDTO.cpf,
        address: { create: { ...createClientDTO.address } },
      },
    });
  }

  async update(id: bigint, updateClientDTO: UpdateClientDto) {
    return await this.prisma.client.update({
      select: { id: true },
      where: { id },
      data: {
        name: updateClientDTO.name,
        cpf: updateClientDTO.cpf,
        address: { update: { ...updateClientDTO.address } },
      },
    });
  }

  async remove(id: bigint) {
    return await this.prisma.client.delete({
      select: { id: true },
      where: { id },
    });
  }
}
