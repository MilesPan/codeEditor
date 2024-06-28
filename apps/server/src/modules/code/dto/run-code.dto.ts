import { CodeType } from '@Request/index';
import { IsNotEmpty, IsString } from 'class-validator';

export class RunCodeDto {
  @IsString()
  @IsNotEmpty({ message: '代码类型不能为空' })
  type: CodeType;

  @IsString()
  code: string;

  testCase: any;
}
