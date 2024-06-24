import { Controller, Post, Body } from '@nestjs/common';
import { CodeService } from './code.service';
import { RunCodeDto } from './dto/run-code.dto';

@Controller('run')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Post()
  create(@Body() runCodeDto: RunCodeDto) {
    return this.codeService.create(runCodeDto);
  }
}
