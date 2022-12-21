import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './repository/dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly repository: DashboardRepository) {}

  async dashboard() {
    return await this.repository.dashboard();
  }
}
