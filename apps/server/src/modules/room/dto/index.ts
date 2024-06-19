import { IsString } from 'class-validator';

export class FindOrCreateRoom {
  @IsString()
  readonly id: string;
}
export class FindRoom {
  @IsString()
  readonly id: string;
}

export class UserJoinRoom {
  @IsString()
  readonly roomId: string;
  @IsString()
  readonly userName: string;
}
export class UserLeaveRoom {
  @IsString()
  readonly roomId: string;
  @IsString()
  readonly userName: string;
}
