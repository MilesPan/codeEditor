import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StartDebugDto {
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  functionName: string;

  @IsArray()
  @IsOptional()
  breakPoints: number[];
}

export class NeedSessionDto {
  @IsString()
  @IsNotEmpty()
  sessionId: string;
}

export class StepIntoDto extends NeedSessionDto {}

export class StepOverDto extends NeedSessionDto {}

export class StepOutDto extends NeedSessionDto {}

export class ResumeDto extends NeedSessionDto {}

export class StartDebugResponseDto {
  sessionId: string;
  status: 'debugging' | 'end';
  result: { name: string; value: StartDebugResponseDto['result'] | string | number | boolean; type: string }[];
  curLine: number;
}
