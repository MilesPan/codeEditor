import { Language } from '@Request/index';
import { OnMount } from '@monaco-editor/react';
import { makeAutoObservable } from 'mobx';

type IEditor = Parameters<OnMount>[0];

class CodeStore {
  editorRef: IEditor | null = null;
  codeType: Language | undefined = Language.cpp;
  testCases: any;
  setCodeType(type: Language | undefined) {
    this.codeType = type;
  }
  setTestCases(cases: any) {
    this.testCases = cases;
  }
  setEditorRef(ref: IEditor) {
    this.editorRef = ref;
  }
  constructor() {
    makeAutoObservable(this);
  }
  get code() {
    return this.editorRef?.getValue() || '';
  }
}

export default new CodeStore();
