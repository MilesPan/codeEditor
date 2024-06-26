import { config } from './config';
import Docker, { Container } from 'dockerode';
import { Injectable } from '@nestjs/common';
import { ImageMap } from './constants';
import { CodeDockerOption } from './types';
import { CodeType } from '@Request/code';
import { isType } from '@Utils/index';
@Injectable()
export class DockerService {
  imageMap = ImageMap;
  docker: Docker;
  container: Container | null;
  dockerOptions: CodeDockerOption | null;
  removeContainer: () => void;
  constructor() {
    this.docker = new Docker({
      ...config,
    });
  }
  setDockerOptions(type: CodeType) {
    this.dockerOptions = this.imageMap[type];
    return this.dockerOptions;
  }
  async generateContainer(code: string) {
    const { env, fileSuffix, shell, prefix = '' } = this.dockerOptions;
    const execCode = '\n' + prefix + decodeURI(code) + '\n' + 'EOF' + '\n';
    const bashCmd = `cat > code.${fileSuffix} << 'EOF' ${execCode}${shell}`;
    this.container = await this.docker.createContainer({
      Image: env,
      Cmd: ['bash', '-c', bashCmd],
      StopTimeout: 6,
      Tty: true,
      AttachStdout: true,
      NetworkDisabled: true,
    });

    this.removeContainer = async () => {
      try {
        await this.container.remove({ force: true });
      } catch (error) {}
    };

    try {
      await this.container.start();

      const handleOutput = async () => {
        let outputString: Buffer | string = await this.container.logs({
          stdout: true,
          stderr: true,
        });

        if (Buffer.isBuffer(outputString)) {
          outputString = outputString.toString('utf-8');
        }
      };
    } catch (error) {
      return error;
    }
  }

  private formatOutput(outputString: string): string {
    if (outputString.length > 8200) {
      outputString =
        outputString.slice(0, 4000) +
        outputString.slice(outputString.length - 4000);
    }
    if (isType('Object', 'Array')(outputString)) {
      outputString = JSON.stringify(outputString);
    }
  }
}
