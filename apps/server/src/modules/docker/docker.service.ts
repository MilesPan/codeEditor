import { config } from './config';
// @ts-ignore
import { Container } from 'dockerode';
import * as Docker from 'dockerode';
import { Injectable } from '@nestjs/common';
import { ImageMap } from './constants';
import { CodeDockerOption } from './types';
import { CodeType } from '@Request/code';
import { isType } from '@Utils/index';
export enum DockerRunStatus {
  running = 'running',
  exited = 'exited',
}
@Injectable()
export class DockerService {
  imageMap = ImageMap;
  docker: Docker;
  container: Container | null;
  dockerOptions: CodeDockerOption | null;
  removeContainer: () => void | null;
  constructor() {
    this.docker = new Docker({
      ...config,
    });
  }
  setDockerOptions(type: CodeType) {
    this.dockerOptions = this.imageMap[type];
    return this.dockerOptions;
  }
  async generateContainer(code: string, resolver, rejecter) {
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
        try {
          const startTime = Date.now();
          let outputString: Buffer | string = await this.container.logs({
            stdout: true,
            stderr: true,
          });

          if (Buffer.isBuffer(outputString)) {
            outputString = outputString.toString('utf-8');
          }
          outputString = this.formatOutput(outputString);

          const containerInfo = await this.container.inspect();
          const isRunning = containerInfo.State.Running;

          const isTimeout = !!isRunning;
          if (isTimeout) {
            throw new Error('Timeout');
          } else {
            resolver({ output: outputString, time: Date.now() - startTime });
          }
        } catch (error) {
          rejecter(error);
          // throw new Error(error);
        } finally {
          this.removeContainer?.();
        }
      };

      const stream = await this.container.attach({
        stream: true,
        stdout: true,
        stderr: true,
      });
      stream?.pipe(process.stdout);

      const timeoutString = setTimeout(handleOutput, 6000);

      this.container.wait((status) => {
        if (!status || status?.Status === DockerRunStatus.exited) {
          clearTimeout(timeoutString);
          handleOutput();
        }
      });
    } catch (error) {
      rejecter(error);
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
    if (typeof outputString !== 'string') {
      outputString = String(outputString);
    }

    let outputStringArr = outputString.split('%0A');
    if (outputStringArr.length > 200) {
      outputStringArr = outputStringArr
        .slice(0, 100)
        .concat(
          ['%0A', '...' + encodeURI('数据太多,已折叠'), '%0A'],
          outputStringArr.slice(outputStringArr.length - 100),
        );
    }

    return outputStringArr.join('%0A');
  }
}
