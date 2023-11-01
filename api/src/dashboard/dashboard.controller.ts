import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProjectId } from 'src/common/decorators/project-id.decorator';
import { ProjectOwnership } from 'src/common/guards/project-ownership.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard, ProjectOwnership)
  @Get('/stats')
  findAll(@ProjectId() projectId: string | null) {
    return this.dashboardService.getStats({ projectId });
  }
}
