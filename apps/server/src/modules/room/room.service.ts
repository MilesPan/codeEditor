import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOrCreateRoom, FindRoom, UserJoinRoom, UserLeaveRoom } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}
  async find(findRoomDto: FindRoom) {
    const room = await this.prisma.room.findUnique({
      where: { id: findRoomDto.id },
    });
    if (!room) throw new Error('不存在房间');
    return room;
  }
  async findOrCreate(findOrCreateRoomDto: FindOrCreateRoom) {
    let isCreate = false;
    let room = await this.prisma.room.findUnique({
      where: { id: findOrCreateRoomDto.id },
    });

    if (!room) {
      isCreate = true;
      room = await this.prisma.room.create({
        data: { id: findOrCreateRoomDto.id },
      });
    }
    return {
      ...room,
      message: isCreate
        ? '未找到房间号, 已自动创建'
        : '找到房间, 请填写名称进入房间',
    };
  }
  //  用户加入房间
  async userJoinRoom(userJoinRoomDto: UserJoinRoom) {
    const { roomId, userName } = userJoinRoomDto;
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: { users: true },
    });
    if (!room) throw new Error('不存在该房间');

    const existingUser = room.users.find((user) => user.name === userName);
    if (existingUser?.roomId)
      throw new Error('房间内已存在该名称用户, 请更换用户名');

    const user = existingUser
      ? await this.prisma.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            roomId,
          },
        })
      : await this.prisma.user.create({
          data: {
            name: userName,
            room: {
              connect: {
                id: roomId,
              },
            },
          },
        });
    return user;
  }

  //  用户离开房间
  async userLeaveRoom(userLeaveRoomDto: UserLeaveRoom) {
    const { roomId, userName } = userLeaveRoomDto;

    const user = await this.prisma.user.findFirst({
      where: {
        name: userName,
        roomId,
      },
    });

    if (!user) throw new NotFoundException('用户不存在');

    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return { message: '已离开房间' };
  }
}
