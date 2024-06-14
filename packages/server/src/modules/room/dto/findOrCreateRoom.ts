import { IsString } from 'class-validator';

export class FindOrCreateRoom {
  @IsString()
  readonly id: string;
}
