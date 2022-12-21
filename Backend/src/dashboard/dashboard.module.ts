import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DashboardRepository } from './repository/dashboard.repository';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [PrismaService, DashboardService, DashboardRepository],
})
export class DashboardModule {}
