import { Module } from '@nestjs/common';
import { EventModule } from './modules/gateway/event.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivekitModule } from './modules/livekit/livekit.module';
import { RoomModule } from './modules/room/room.module';
import { PrismaModule } from './modules/prisma/prisma.module';
@Module({
  imports: [PrismaModule, EventModule, LivekitModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
