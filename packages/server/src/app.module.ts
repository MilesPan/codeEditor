import { Module } from '@nestjs/common';
import { EventModule } from './gateway/event.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenModule } from './token/token.module';
@Module({
  imports: [EventModule, TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
