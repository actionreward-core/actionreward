import { Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { PrismaService } from 'src/prisma.service';
import { CacheModule } from 'src/cache/cache.module';
import { RewardsController } from './rewards.controller';

@Module({
  imports: [CacheModule],
  providers: [RewardsService, PrismaService],
  controllers: [RewardsController],
})
export class RewardsModule {}
