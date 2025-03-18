import { Language } from '@Request/index';
import { Monaco, OnMount } from '@monaco-editor/react';
import { makeAutoObservable } from 'mobx';
import {} from 'mobx-react-lite';
import { MyTabItemType } from '@/components/TestCase/MyTab';
import { CaseDeltaType, ParsedTestResponse } from '@Types/leetcode';

type IEditor = Parameters<OnMount>[0];

class CodeStore {
  editorRef: IEditor | null = null;
  setEditorRef(ref: IEditor) {
    this.editorRef = ref;
  }
  monacoRef: Monaco | null = null;
  setMonacoRef(ref: Monaco) {
    this.monacoRef = ref;
  }

  codeType: Language | undefined = Language.cpp;
  setCodeType(type: Language | undefined) {
    this.codeType = type;
  }

  tabs: MyTabItemType[] = [];
  setTabs(tabs: MyTabItemType[]) {
    this.tabs = tabs;
  }
  addTab(tab: MyTabItemType) {
    this.tabs.push(tab);
  }
  deleteTab(key: string | number) {
    const idx = this.tabs.findIndex(tab => tab.key === key);
    this.tabs.splice(idx, 1);
    this.tabs.forEach((tab, index) => (tab.name = `Case ${index + 1}`));
    this.testCases.splice(idx, 1);
    console.log(this.tabs);
  }

  activeTabKey: string | number | null = null;
  setActiveTabKey(key: string | number) {
    this.activeTabKey = key;
  }

  testCases: Array<CaseDeltaType[]> = [];
  updateTestCases = function (
    this: CodeStore,
    delta: CaseDeltaType[],
    deltaName: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const value = event.target.value;
    delta.find(testCase => testCase.name === deltaName)!.value = value;
  }.bind(this);
  setTestCases(cases: Array<CaseDeltaType[]>) {
    this.testCases = cases;
  }
  addTestCases(targetCase: CaseDeltaType[]) {
    this.testCases.push(targetCase);
  }

  functionName: string = 'main';
  setFunctionName(name: string) {
    this.functionName = name;
  }

  testResponse: ParsedTestResponse[] | null = null;
  setTestResponse(response: ParsedTestResponse[]) {
    this.testResponse = response;
  }
  constructor() {
    makeAutoObservable(this);
  }
  get code() {
    return this.editorRef?.getValue() || '';
  }
}

export default new CodeStore();
