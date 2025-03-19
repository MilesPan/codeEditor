import { Body, Controller, Post } from '@nestjs/common';
import { DebugService } from './debug.service';
import { StartDebugDto, StartDebugResponseVo } from '@Dtos/debug';
@Controller('debug')
export class DebugController {
  constructor(private readonly debugService: DebugService) {}

  @Post('startDebug')
  async startDebug(
    @Body() startDebugDto: StartDebugDto,
  ): Promise<StartDebugResponseVo> {
    const res = await this.debugService.generateDebugCode(startDebugDto);
    return res;
  }
}
