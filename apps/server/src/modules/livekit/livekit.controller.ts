import { Controller, Get, Query } from '@nestjs/common';
import { LivekitService } from './livekit.service';
import { GenerateToken } from './dto';

@Controller('livekit')
export class LivekitController {
  constructor(private readonly tokenService: LivekitService) {}

  @Get('generateToken')
  async generateToken(
    @Query() query: GenerateToken,
  ): Promise<{ token: string }> {
    const { roomId, userName } = query;
    if (!roomId || !userName) {
      throw new Error('缺少参数');
    }
    return await this.tokenService.generateToken(query);
  }
}
