import { Injectable } from '@nestjs/common';
import { PaginatorOptions, paginator } from 'src/common/helpers/paginator';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ActionsService {
  constructor(private prismaService: PrismaService) {}
  findAll({ projectId }: { projectId: string }, opts: PaginatorOptions) {
    return paginator({
      model: this.prismaService.projectAction,
      args: {
        where: {
          schema: {
            projectId,
          },
        },
        include: {
          schema: true,
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      opts,
    });
  }
}
