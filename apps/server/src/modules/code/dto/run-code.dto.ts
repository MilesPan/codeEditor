import { CodeType } from '@Request/index';
import { IsNotEmpty, IsString } from 'class-validator';

export class RunCodeDto {
  @IsNotEmpty()
  @IsString()
  type: CodeType;

  @IsString()
  code: string;

  testCase: any;
}
