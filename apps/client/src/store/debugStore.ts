import codeStore from '@/store/codeStore';
import { setHighlightLine } from '@/components/CodeEditor/helpers/BreakPoint';
import { StartDebugResponseDto } from '@Dtos/debug';
import { autorun, makeAutoObservable, reaction } from 'mobx';
import { isNumber } from 'lodash-es';

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
    console.log('res', result);
    this.result = this.convertResult(result);
  }

  curLine: number = -1;
  setCurLine(curLine: StartDebugResponseDto['curLine']) {
    this.curLine = curLine;
  }
  // 将result转换为一个真正的JSON
  convertResult(result: StartDebugResponseDto['result']) {
    if (typeof result !== 'object') return result;
    const obj: Record<PropertyKey, any> = {};
    result.forEach(item => {
      if (item.type === 'undefined') {
        obj[item.name] = undefined;
      } else {
        if (Array.isArray(item.value)) {
          if (
            item.value[item.value.length - 1]?.name === 'length' &&
            item.value.slice(0, -1).every(childItem => isNumber(parseInt(childItem.name)))
          ) {
            obj[item.name] = item.value
              .filter(childItem => childItem.name !== 'length')
              .map(childItem => this.convertResult(childItem.value as StartDebugResponseDto['result']));
          } else {
            obj[item.name] = this.convertResult(item.value);
          }
        } else {
          obj[item.name] = item.value;
        }
      }
    });
    return obj;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
const debugStore = new DebugStore();
reaction(
  () => debugStore.curLine,
  curLine => {
    console.log(curLine);
    if (codeStore.editorRef && codeStore.monacoRef)
      setHighlightLine(codeStore.editorRef, (curLine || 0) + 1, codeStore.monacoRef);
  }
);

export default debugStore;
