import {
  Controller,
  HttpCode,
  Post,
  Query,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { ConnectService } from './connect.service';

@Controller('connect')
export class ConnectController {
  constructor(private connectService: ConnectService) {}

  @Post('/callback')
  @HttpCode(200)
  async callback(
    @Query('sessionId') sessionId: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    const raw = req.body;
    const token = raw.toString().trim();
    return this.connectService.completeConnect(sessionId, token);
  }
}
