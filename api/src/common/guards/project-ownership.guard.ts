import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectOwnership implements CanActivate {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const projectId = request.headers['x-project-id'];
    if (!projectId) {
      return false;
    }
    const user = request.user;
    const project = await this.prismaService.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return null;
    }

    return user.id === project.ownerId;
  }
}
