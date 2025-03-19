import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StartDebugDto {
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  functionName: string;

  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  userName: string;
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

export class StartDebugResponseVo {
  fileName: string;
}
