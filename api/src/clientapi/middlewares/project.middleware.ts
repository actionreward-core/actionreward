import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-project-token'];
    if (!token) {
      throw new UnauthorizedException();
    }
    const project = await this.prismaService.project.findFirst({
      where: {
        accessToken: token as string,
      },
    });

    if (!project) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.project = project;
    next();
  }
}
