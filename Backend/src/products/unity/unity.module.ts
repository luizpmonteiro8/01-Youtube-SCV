import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnityRepository } from './repository/unity.repository';
import { UnityController } from './unity.controller';
import { UnityService } from './unity.service';

@Module({
  controllers: [UnityController],
  providers: [PrismaService, UnityService, UnityRepository],
})
export class UnityModule {}
