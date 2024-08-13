import { Controller, Post } from '@nestjs/common';
import { DebugService } from './debug.service';

@Controller('debug')
export class DebugController {
  constructor(private readonly debugService: DebugService) {}

  @Post('start')
  startDebug() {
    this.debugService.startDebug();
    return 1;
  }
  @Post('getInfos')
  getInfos() {
    return this.debugService.getInfos();
  }
}
