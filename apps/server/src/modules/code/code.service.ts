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
    const dockerOptions = this.dockerService.setDockerOptions(type);
    if (!dockerOptions) return new Error('未知语言');


    return new Promise((resolve, reject) => {
        this.dockerService.generateContainer(code, resolve, reject);
    })
  }
}
