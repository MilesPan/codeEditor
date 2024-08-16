import { StartDebugResponseDto } from '@Dtos/debug';
import { makeAutoObservable } from 'mobx';

const EXCLUDE_NAMES = ['require', 'module', 'exports', '__filename', '__dirname'];

class DebugStore {
  debugActive: boolean = false;
  setDebugActive(status: boolean) {
    this.debugActive = status;
  }

  isDebugging: boolean = false;
  setIsDebugging(status: boolean) {
    this.isDebugging = status;
  }
  breakPoints: Set<number> = new Set();

  result: Record<PropertyKey, any> = {};
  setResult(result: StartDebugResponseDto['result']) {
    this.result = this.convertResult(result);
    console.log(this.result)
  }

  curLine: number = 0;
  setCurLine(curLine: StartDebugResponseDto['curLine']) {
    this.curLine = curLine;
  }
  // 将result转换为一个真正的JSON
  convertResult(result: StartDebugResponseDto['result']) {
    const obj: Record<PropertyKey, any> = {};
    result.forEach(item => {
      if (EXCLUDE_NAMES.includes(item.name)) {
        return;
      }

      if (item.value.type === 'undefined') {
        obj[item.name] = undefined;
      } else {
        obj[item.name] = item.value.value;
      }
    });
    return obj;
  }
  constructor() {
    makeAutoObservable(this);
  }
}

export default new DebugStore();
