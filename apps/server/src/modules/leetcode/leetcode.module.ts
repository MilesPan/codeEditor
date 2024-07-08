import { Module } from '@nestjs/common';
import { LeetcodeService } from './leetcode.service';
import { LeetcodeController } from './leetcode.controller';

@Module({
  controllers: [LeetcodeController],
  providers: [LeetcodeService],
})
export class LeetcodeModule {}
