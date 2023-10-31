import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Query,
  RawBodyRequest,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { ProjectOwnership } from 'src/common/guards/project-ownership.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProjectId } from 'src/common/decorators/project-id.decorator';
import { CreateRewardDto } from './dto/create-reward.dto';

@Controller('rewards')
export class RewardsController {
  constructor(private rewardsService: RewardsService) {}

  @UseGuards(JwtAuthGuard, ProjectOwnership)
  @Post()
  create(
    @Body() createRewardDto: CreateRewardDto,
    @ProjectId() projectId: string | null,
  ) {
    return this.rewardsService.create({
      ...createRewardDto,
      projectId,
    });
  }

  @UseGuards(JwtAuthGuard, ProjectOwnership)
  @Get()
  findAll(@ProjectId() projectId: string | null) {
    return this.rewardsService.findAll({ projectId }, { page: 1, perPage: 50 });
  }

  @Post('/:rewardId/sign-in')
  async signin(@Param('rewardId') rewardId: string) {
    return this.rewardsService.getRewardAuthRequest(rewardId);
  }

  @Post('/callback')
  @HttpCode(200)
  async callback(
    @Query('sessionId') sessionId: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    const raw = req.body;
    const token = raw.toString().trim();
    return this.rewardsService.completeRewardClaim(sessionId, token);
  }

  @Post('/check-status')
  async checkStatus(@Body() { sessionId }: { sessionId: string }) {
    return this.rewardsService.getClaimStatus(sessionId);
  }
}
