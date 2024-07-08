import { Controller, Get, Query } from '@nestjs/common';
import { LeetcodeService } from './leetcode.service';
import { GetQuestionDto } from './dto';

@Controller('leetcode')
export class LeetcodeController {
  constructor(private readonly leetcodeService: LeetcodeService) {}
  @Get('questions')
  getQuestions(@Query() getQuestionDto: GetQuestionDto) {
    return this.leetcodeService.getQuestions(getQuestionDto);
  }
}
