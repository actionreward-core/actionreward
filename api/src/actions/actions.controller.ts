import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProjectId } from 'src/common/decorators/project-id.decorator';
import { ProjectOwnership } from 'src/common/guards/project-ownership.guard';
import { ActionsService } from './actions.service';

@Controller('actions')
export class ActionsController {
  constructor(private actionsService: ActionsService) {}

  @UseGuards(JwtAuthGuard, ProjectOwnership)
  @Get()
  findAll(@ProjectId() projectId: string | null) {
    return this.actionsService.findAll({ projectId }, { page: 1, perPage: 50 });
  }
}
