import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class StartDebugDto {
  @IsNotEmpty()
  code: string;

  @IsArray()
  @IsOptional()
  breakPoints: number[];
}

export class StartDebugResponseDto {
  result: { name: string; value: StartDebugResponseDto['result'] | string | number | boolean; type: string }[];
  curLine: number;
}
