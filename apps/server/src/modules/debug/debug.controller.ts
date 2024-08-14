import { Body, Controller, Post } from '@nestjs/common';
import { DebugService } from './debug.service';
import { StartDebugDto } from '@Dtos/debug';

@Controller('debug')
export class DebugController {
  constructor(private readonly debugService: DebugService) {}

  @Post('startDebug')
  startDebug(@Body() startDebugDto: StartDebugDto) {
    return this.debugService.startDebug(startDebugDto);
  }
  @Post('stepInto')
  stepInto() {
    return this.debugService.stepInto();
  }
  @Post('resume')
  resume() {
    return this.debugService.resume();
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
