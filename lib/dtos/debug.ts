import { Debugger } from '@Types/debugger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class StartDebugDto {
  @IsNotEmpty()
  code: string;

  @IsArray()
  @IsOptional()
  breakPoints: number[];
}

export class StartDebugResponseDto {
  result: Debugger.PropertyItemType[];
  curLine: number;
}
