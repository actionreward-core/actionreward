import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/prisma.service';
import { IssuerService } from 'src/issuer/issuer.service';
import { StorageService } from 'src/storage/storage.service';

@Module({
  controllers: [ProjectsController],
  providers: [PrismaService, ProjectsService, IssuerService, StorageService],
  exports: [ProjectsService],
})
export class ProjectsModule { }
