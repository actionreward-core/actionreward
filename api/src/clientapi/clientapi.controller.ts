import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Project } from '@prisma/client';
import { ConnectService } from 'src/connect/connect.service';
import { PrismaService } from 'src/prisma.service';
import { SendActionDto } from 'src/projects/dto/send-action.dto';
import { ProjectsService } from 'src/projects/projects.service';

@Controller('sdk')
export class ClientApiController {
  constructor(
    private prismaService: PrismaService,
    private projectService: ProjectsService,
    private connectService: ConnectService,
  ) {}

  @Post('/send-action')
  async sendAction(
    @Body() body: SendActionDto,
    @Req() req: Express.Request & { project: Project },
  ) {
    const { claimId, qrcode } = await this.projectService.sendAction(
      req.project.id,
      body,
    );
    return {
      claimId,
      qrcode,
    };
  }

  @Post('/connect-auth-request')
  async connect(
    @Body() { userId }: { userId: string },
    @Req() req: Express.Request & { project: Project },
  ) {
    return this.connectService.getConnectAuthRequest(req.project.id, userId);
  }

  @Get('/user/:id')
  async getUser(
    @Param('id') id: string,
    @Req() req: Express.Request & { project: Project },
  ) {
    const projectUser = await this.prismaService.projectUser.findUnique({
      where: {
        projectId_userId: {
          projectId: req.project.id,
          userId: id,
        },
      },
    });
    if (!projectUser) {
      throw new NotFoundException('User not found');
    }
    return {
      did: projectUser.did,
      userId: projectUser.userId,
    };
  }
}
