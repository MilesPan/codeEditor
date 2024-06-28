import { Controller, Get } from '@nestjs/common';
import { LeetcodeService } from './leetcode.service';

@Controller('leetcode')
export class LeetcodeController {
  constructor(private readonly leetcodeService: LeetcodeService) {}
  @Get()
  getQuestions() {
    return this.leetcodeService.getQuestions();
  }
}
