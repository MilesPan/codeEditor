import { Body, Controller, Post } from '@nestjs/common';
import { DebugService } from './debug.service';
import { StartDebugDto } from '@Dtos/debug';

@Controller('debug')
export class DebugController {
  constructor(private readonly debugService: DebugService) {}

  @Post('startDebug')
  async startDebug(@Body() startDebugDto: StartDebugDto) {
    const res = await this.debugService.startDebug(startDebugDto);
    return res;
  }
  @Post('stepInto')
  async stepInto() {
    return await this.debugService.stepInto();
  }
  @Post('resume')
  async resume() {
    return await this.debugService.resume();
  }
  @Post('stepOver')
  stepOver() {
    return this.debugService.stepOver();
  }
  @Post('stepOut')
  stepOut() {
    return this.debugService.stepOut();
  }
  @Post('getInfos')
  getInfos() {
    return this.debugService.getInfos();
  }
}
