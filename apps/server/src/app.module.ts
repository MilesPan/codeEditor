import { Module } from '@nestjs/common';
import { EventModule } from './modules/gateway/event.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivekitModule } from './modules/livekit/livekit.module';
import { RoomModule } from './modules/room/room.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CodeModule } from './modules/code/code.module';
import { DockerModule } from './modules/docker/docker.module';
import { LeetcodeModule } from './modules/leetcode/leetcode.module';
@Module({
  imports: [
    PrismaModule,
    EventModule,
    LivekitModule,
    RoomModule,
    CodeModule,
    DockerModule,
    LeetcodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
