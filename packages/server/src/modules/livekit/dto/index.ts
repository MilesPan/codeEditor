import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateToken {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;
}
