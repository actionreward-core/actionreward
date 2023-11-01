import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientApiController } from './clientapi.controller';
import { PrismaService } from 'src/prisma.service';
import { ProjectMiddleware } from './middlewares/project.middleware';
import { ProjectsService } from 'src/projects/projects.service';
import { IssuerService } from 'src/issuer/issuer.service';
import { StorageService } from 'src/storage/storage.service';
import { ConnectService } from 'src/connect/connect.service';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  controllers: [ClientApiController],
  providers: [
    PrismaService,
    ProjectsService,
    IssuerService,
    StorageService,
    ConnectService,
  ],
  imports: [CacheModule],
})
export class ClientApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProjectMiddleware).forRoutes('/sdk/*');
  }
}
