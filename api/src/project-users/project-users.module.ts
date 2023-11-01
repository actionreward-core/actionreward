import { Module } from '@nestjs/common';
import { ProjectUsersService } from './project-users.service';
import { ProjectUsersController } from './project-users.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ProjectUsersService, PrismaService],
  controllers: [ProjectUsersController],
})
export class ProjectUsersModule {}
