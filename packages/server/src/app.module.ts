import { Module } from '@nestjs/common';
import { EventModule } from './modules/gateway/event.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenModule } from './modules/token/token.module';
import { RoomModule } from './modules/room/room.module';
import { PrismaModule } from './modules/prisma/prisma.module';
@Module({
  imports: [PrismaModule, EventModule, TokenModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
