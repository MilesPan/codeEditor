import { Module } from '@nestjs/common';
import { DockerService } from './docker.service';
import { DockerController } from './docker.controller';

@Module({
  controllers: [DockerController],
  exports: [DockerService],
  providers: [DockerService],
})
export class DockerModule {}
