import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientApiController } from './clientapi.controller';
import { PrismaService } from 'src/prisma.service';
import { ProjectMiddleware } from './middlewares/project.middleware';
import { ProjectsService } from 'src/projects/projects.service';
import { IssuerService } from 'src/issuer/issuer.service';
import { StorageService } from 'src/storage/storage.service';

@Module({
  controllers: [ClientApiController],
  providers: [PrismaService, ProjectsService, IssuerService, StorageService],
})
export class ClientApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProjectMiddleware).forRoutes('/sdk/*');
  }
}
