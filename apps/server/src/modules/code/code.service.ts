import { CaseDeltaType, LogData } from '@Types/leetcode';
import { DockerService } from '../docker/docker.service';
import { PrismaService } from '../prisma/prisma.service';
import { RunCodeDto } from './dto/run-code.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeService {
  private flagName = '_P_SELF_RES_';
  private startFlag = this.flagName + 'START';
  private endFlag = this.flagName + 'END';
  constructor(
    private prisma: PrismaService,
    private dockerService: DockerService,
  ) {}
  async runCode(runCodeDto: RunCodeDto) {
    const { type } = runCodeDto;
    const finallyCode = this.addFunctionCall(runCodeDto);
    const dockerOptions = this.dockerService.setDockerOptions(type);
    if (!dockerOptions) return new Error('未知语言');

    return new Promise((resolve, reject) => {
      this.dockerService.generateContainer(finallyCode, resolve, reject);
    }).then(
      (res: { output: string; time: number }) => {
        const logs = this.convertRes(res.output);
        return {
          logs: logs,
          execTime: (res.time || 0) + 'ms',
        };
      },
      (rej) => rej,
    );
  }

  // 根据testCase生成最终docker运行的代码
  private addFunctionCall(runCodeDto: RunCodeDto): string {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
    let { code, functionName, testCases } = runCodeDto;
    let calcedCode = '';
    testCases.forEach((testCase, testCaseIndex) => {
      const params = this.genParams(testCase);

      const callFunctionName = `${this.flagName}${testCaseIndex}`;
      const callExec = `
      const ${callFunctionName} = ${functionName}(${params.join(',')});
      console.log('resStart:',${callFunctionName}, ':resEnd')
      `;
      calcedCode += this.genIIFE(
        `console.log("${this.startFlag}");` +
          code +
          `\n${callExec}` +
          `console.log("${this.endFlag}");`,
      );
    });
    return calcedCode;
  }
  // 根据测试用例中的参数生成最终参数
  private genParams(testCase: CaseDeltaType[]) {
    const params = [];
    testCase.forEach((param) => {
      // eslint-disable-next-line prefer-const
      let { type: paramType, value: paramValue } = param;
      if (paramType === 'string') {
        paramValue = `"${paramValue}"`;
        if (paramValue.startsWith(`'`) || paramValue.startsWith(`"`)) {
          paramValue = `${paramValue.slice(1, -1)}`;
        }
      }
      params.push(paramValue);
    });
    return params;
  }
  private convertRes(res: string) {
    return this.collectLogs(res);
  }
  private collectLogs(res: string): LogData[] {
    // 匹配整个日志块
    const blockRegex = /_P_SELF_RES_START([\s\S]*?)_P_SELF_RES_END/g;
    // 匹配 resStart 到 :resEnd 之间的内容
    const resultRegex = /resStart:\s*([\s\S]*?)\s*:resEnd/g;

    const logs: LogData[] = [];
    let match;

    while ((match = blockRegex.exec(res)) !== null) {
      const block = match[1];

      // 提取 consoleLogs 部分，去掉 resStart 到 :resEnd 之间的内容
      const consoleLogs = block
        .replace(resultRegex, '')
        .trim()
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      // 提取 results 部分
      const results = [];
      let resultMatch;
      while ((resultMatch = resultRegex.exec(block)) !== null) {
        results.push(resultMatch[1].trim());
      }

      logs.push({ consoleLogs, results });
    }

    return logs;
  }
  private genIIFE(code: string) {
    return `(function(){${code}})();`;
  }
}
