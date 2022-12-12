import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientRepository } from './repository/client.repository';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  providers: [PrismaService, ClientService, ClientRepository],
})
export class ClientModule {}
