import { Injectable, Logger } from '@nestjs/common';
import { StartDebugDto } from '@Dtos/debug';
import * as path from 'path';
import * as fs from 'fs';
import { validateFunction } from '@/utils/code';
@Injectable()
export class DebugService {
  private readonly logger = new Logger(DebugService.name);
  private fixLineNumber: number;
  private fileNameMap: Map<string, string>;

  constructor() {
    this.fixLineNumber = 0;
    this.fileNameMap = new Map();
  }
  async generateDebugCode(startDebugDto: StartDebugDto) {
    const { roomId, userName, code, functionName, curTestCase } = startDebugDto;
    const params = curTestCase.map((i) => i.value).join(',');

    // 首先验证函数是否在代码中正确定义
    try {
      await validateFunction(code, functionName);
    } catch (error) {
      this.logger.debug(error.message);
      throw new Error(error.message);
    }

    // 检查函数名是否在全局作用域中存在
    try {
      if (functionName in global) {
        throw new Error(
          `函数名 "${functionName}" 已在全局作用域中存在，请使用其他函数名`,
        );
      }
    } catch (error) {
      if (error.message.includes('已在全局作用域中存在')) {
        throw error;
      }
      this.logger.debug(
        `函数 "${functionName}" 不存在于全局作用域，可以继续使用`,
      );
    }

    if (code.length > 10000) {
      throw new Error('代码长度超过10000');
    }

    this.fixLineNumber += 1;
    const generatedCode = `(function (){
      ${code}
      ${functionName}(${params});
    })()`;

    const fileName = `${roomId}.${userName}.js`;
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, generatedCode);
    this.logger.debug(`Debug file created at: ${filePath}`);
    this.fileNameMap.set(fileName, filePath);
    return {
      fileName,
    };
  }
}
