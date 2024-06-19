import { Controller, Post, Body } from '@nestjs/common';
import { RoomService } from './room.service';
import { FindOrCreateRoom, FindRoom, UserJoinRoom, UserLeaveRoom } from './dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Post('getRoom')
  findRoom(@Body() findRoomDto: FindRoom) {
    return this.roomService.find(findRoomDto);
  }

  @Post()
  create(@Body() findOrCreateRoomDto: FindOrCreateRoom) {
    return this.roomService.findOrCreate(findOrCreateRoomDto);
  }

  @Post('addUser')
  userJoinRoom(@Body() userJoinRoomDto: UserJoinRoom) {
    return this.roomService.userJoinRoom(userJoinRoomDto);
  }
  @Post('deleteUser')
  userLeaveRoom(@Body() userLeaveRoomDto: UserLeaveRoom) {
    return this.roomService.userLeaveRoom(userLeaveRoomDto);
  }
}
