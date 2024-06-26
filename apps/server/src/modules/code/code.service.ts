import { DockerService } from '../docker/docker.service';
import { PrismaService } from '../prisma/prisma.service';
import { RunCodeDto } from './dto/run-code.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeService {
  constructor(
    private prisma: PrismaService,
    private dockerService: DockerService,
  ) {}
  async runCode(runCodeDto: RunCodeDto) {
    const { code, type } = runCodeDto;
    // const dockerOptions = this.dockerService.imageMap[type];
    const dockerOptions = this.dockerService.setDockerOptions(type);
    if (!dockerOptions) return new Error('未知语言');

    try {
      const container = await this.dockerService.generateContainer(code);
    } catch (error) {
      return error;
    }
  }
}
