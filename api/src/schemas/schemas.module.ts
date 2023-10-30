import { Module } from '@nestjs/common';
import { SchemasService } from './schemas.service';
import { SchemasController } from './schemas.controller';
import { PrismaService } from 'src/prisma.service';
import { StorageService } from 'src/storage/storage.service';

@Module({
  controllers: [SchemasController],
  providers: [SchemasService, PrismaService, StorageService],
})
export class SchemasModule {}
