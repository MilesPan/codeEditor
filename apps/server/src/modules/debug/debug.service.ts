import { Injectable } from '@nestjs/common';
import { StartDebugDto } from '@Dtos/debug';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class DebugService {
  fixLineNumber: number;
  fileNameMap: Map<string, string>;
  constructor() {
    this.fixLineNumber = 0;
    this.fileNameMap = new Map();
  }

  generateDebugCode(startDebugDto: StartDebugDto) {
    const { roomId, userName, code, functionName } = startDebugDto;
    if (window[functionName]) {
      throw new Error('函数名已存在');
    }
    if (code.length > 10000) {
      throw new Error('代码长度超过10000');
    }
    this.fixLineNumber += 1;
    // const originCodeLines = code.split('\n');
    // const finallyCodeLine = originCodeLines.length + this.fixLineNumber + 2;
    const generatedCode = `(function (){
      ${code}
      ${functionName}();
    })()`;

    const fileName = `${roomId}.${userName}.js`;
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, generatedCode);
    console.log(filePath);
    this.fileNameMap.set(fileName, filePath);
    return {
      fileName,
    };
  }
}
