import { IsNotEmpty, IsString } from 'class-validator';

export class GetQuestionDto {
  @IsNotEmpty()
  @IsString()
  page: string;
}
