import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class StartDebugDto {
  @IsNotEmpty()
  code: string;

  @IsArray()
  @IsOptional()
  breakPoints: number[];
}
