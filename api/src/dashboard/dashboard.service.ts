import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prismaService: PrismaService) {}

  async getStats({ projectId }: { projectId: string }) {
    const actions = await this.prismaService.projectAction.count({
      where: {
        user: {
          projectId,
        },
      },
    });
    const users = await this.prismaService.projectUser.count({
      where: {
        projectId,
      },
    });
    const schemas = await this.prismaService.projectActionSchema.count({
      where: {
        projectId,
      },
    });

    return {
      actions,
      users,
      schemas,
    };
  }
}
