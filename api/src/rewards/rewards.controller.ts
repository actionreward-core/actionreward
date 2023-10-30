import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Query,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { RewardsService } from './rewards.service';

@Controller('rewards')
export class RewardsController {
  constructor(private rewardsService: RewardsService) {}

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
}
