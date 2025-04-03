import { CodeType } from '@Request/index';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CaseDeltaType } from '@Types/leetcode';
export class RunCodeDto {
  @IsString()
  @IsNotEmpty({ message: '代码类型不能为空' })
  type: CodeType;

  @IsString()
  code: string;

  @IsArray()
  @IsNotEmpty({ message: '测试用例不能为空' })
  testCases: Array<CaseDeltaType[]>;

  @IsString()
  @IsNotEmpty({ message: '入口函数名不能为空' })
  functionName: string;
}
