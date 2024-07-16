import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LeetcodeService } from './leetcode.service';
import { GetQuesionCommentsDto, GetQuestionDto } from './dto';

@Controller('leetcode')
export class LeetcodeController {
  constructor(private readonly leetcodeService: LeetcodeService) {}
  @Get('questions')
  getQuestions(@Query() getQuestionDto: GetQuestionDto) {
    return this.leetcodeService.getQuestions(getQuestionDto);
  }
  @Post('comments')
  getQuestionComment(@Body() getQuesionCommentsDto: GetQuesionCommentsDto) {
    return this.leetcodeService.getQuestionComment(getQuesionCommentsDto);
  }
}
