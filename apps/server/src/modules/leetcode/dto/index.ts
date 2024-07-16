import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetQuestionDto {
  @IsNotEmpty()
  @IsString()
  page: string;
}
export class GetQuesionCommentsDto {
  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @IsNumber()
  @IsOptional()
  start?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
