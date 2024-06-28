import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { DockerModule } from '../docker/docker.module';

@Module({
  controllers: [CodeController],
  imports: [DockerModule],
  providers: [CodeService],
})
export class CodeModule {}
