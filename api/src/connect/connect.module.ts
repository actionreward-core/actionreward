import { Module } from '@nestjs/common';
import { ConnectService } from './connect.service';
import { CacheModule } from 'src/cache/cache.module';
import { ProjectsService } from 'src/projects/projects.service';
import { IssuerService } from 'src/issuer/issuer.service';
import { StorageService } from 'src/storage/storage.service';
import { PrismaService } from 'src/prisma.service';
import { ConnectController } from './connect.controller';

@Module({
  providers: [
    ConnectService,
    PrismaService,
    ProjectsService,
    IssuerService,
    StorageService,
  ],
  imports: [CacheModule],
  controllers: [ConnectController],
})
export class ConnectModule {}
