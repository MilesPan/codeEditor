import { Language } from '@Request/index';
import { IsNotEmpty, IsString } from 'class-validator';

export class RunCodeDto {
  @IsNotEmpty()
  @IsString()
  type: Language;

  @IsString()
  code: string;

  testCase: any;
}
