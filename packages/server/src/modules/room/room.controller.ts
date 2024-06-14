import { Controller, Post, Body } from '@nestjs/common';
import { RoomService } from './room.service';
import { FindOrCreateRoom } from './dto/findOrCreateRoom';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() findOrCreateRoomDto: FindOrCreateRoom) {
    return this.roomService.findOrCreate(findOrCreateRoomDto);
  }
}
