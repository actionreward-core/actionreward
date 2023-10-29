import { Body, Controller, Post, Req } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { IdentifyDto } from 'src/projects/dto/identify.dto';
import { ProjectsService } from 'src/projects/projects.service';

@Controller()
export class ClientApiController {
  constructor(
    private prismaService: PrismaService,
    private projectService: ProjectsService,
  ) {}

  @Post('/identify')
  async identify(
    @Body() body: IdentifyDto,
    @Req() req: Express.Request & { project: Project },
  ) {
    await this.projectService.identify(req.project.id, body);
    return {
      status: true,
    };
  }
}
