import { Injectable } from '@nestjs/common';
import { PaginatorOptions, paginator } from 'src/common/helpers/paginator';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectUsersService {
  constructor(private prismaService: PrismaService) {}
  findAll({ projectId }: { projectId: string }, opts: PaginatorOptions) {
    return paginator({
      model: this.prismaService.projectUser,
      args: {
        where: {
          projectId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      opts,
    });
  }
}
