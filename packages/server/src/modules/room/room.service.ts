import { Injectable } from '@nestjs/common';
import { FindOrCreateRoom } from './dto/findOrCreateRoom';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}
  async findOrCreate(findOrCreateRoomDto: FindOrCreateRoom) {
    let room = await this.prisma.room.findUnique({
      where: { id: findOrCreateRoomDto.id },
    });

    if (!room) {
      room = await this.prisma.room.create({
        data: { id: findOrCreateRoomDto.id },
      });
    }
    return new Promise((res) => {
      setTimeout(() => {
        res(room);
      }, 4000);
    });
    // return room;
  }
}
