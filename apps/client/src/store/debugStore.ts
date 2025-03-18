import codeStore from '@/store/codeStore';
import { clearHighlightLine, setHighlightLine } from '@/components/CodeEditor/helpers/BreakPoint';
import { StartDebugResponseDto } from '@Dtos/debug';
import { makeAutoObservable, reaction } from 'mobx';
import { isMyArray } from '@Utils/index';
import { useTabContext } from '@/contexts/TabContext';
import { Actions } from 'flexlayout-react';
import model, { TabName } from '@/components/FlexLayout/model';

class DebugStore {
  debugActive: boolean = false;
  setDebugActive(status: boolean) {
    this.debugActive = status;
  }

  isDebugging: boolean = false;
  setIsDebugging(status: boolean) {
    this.isDebugging = status;
  }
  sessionId: string = '';
  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }
  breakPoints: Set<number> = new Set();

  result: Record<PropertyKey, any> = {};
  setResult(result: StartDebugResponseDto['result']) {
    this.result = this.convertResult(result);
  }

  curLine: number = -1;
  setCurLine(curLine: StartDebugResponseDto['curLine']) {
    this.curLine = curLine;
  }
  // 将result转换为一个真正的JSON
  convertResult(result: StartDebugResponseDto['result']) {
    if (typeof result !== 'object') return result;
    const isArray = isMyArray(result);
    const obj: Record<PropertyKey, any> = isArray ? [] : {};
    result.forEach(item => {
      if (item.type === 'undefined') {
        obj[item.name] = undefined;
      } else {
        if (Array.isArray(item.value)) {
          if (isMyArray(item.value)) {
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

  closeDebug() {
    this.setIsDebugging(false);
    this.setCurLine(-1);
    this.setResult([]);
  }
  constructor() {
    makeAutoObservable(this);
  }
}
const debugStore = new DebugStore();
reaction(
  () => debugStore.curLine,
  curLine => {
    if (codeStore.editorRef && codeStore.monacoRef) {
      if (curLine === -1){
        clearHighlightLine(codeStore.editorRef);
        debugStore.setIsDebugging(false)
      } 
      else setHighlightLine(codeStore.editorRef, (curLine || 0) + 1, codeStore.monacoRef);
    }
  }
);

export default debugStore;
