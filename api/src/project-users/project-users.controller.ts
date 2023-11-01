import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProjectUsersService } from './project-users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProjectOwnership } from 'src/common/guards/project-ownership.guard';
import { ProjectId } from 'src/common/decorators/project-id.decorator';

@Controller('project-users')
export class ProjectUsersController {
  constructor(private projectUserService: ProjectUsersService) {}

  @UseGuards(JwtAuthGuard, ProjectOwnership)
  @Get()
  findAll(@ProjectId() projectId: string | null) {
    return this.projectUserService.findAll(
      { projectId },
      { page: 1, perPage: 50 },
    );
  }
}
