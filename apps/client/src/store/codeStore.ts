import { getQuestionReq, Language } from '@Request/index';
import { OnMount } from '@monaco-editor/react';
import { useRequest } from 'ahooks';
import { makeAutoObservable } from 'mobx';
import {} from 'mobx-react-lite';
import questionStore from './questionStore';
import { MyTabItemType } from '@/components/TestCase/MyTab';

type IEditor = Parameters<OnMount>[0];
export type CaseDeltaType = {
  name: string;
  value: string;
  type: string;
};

class CodeStore {
  editorRef: IEditor | null = null;
  codeType: Language | undefined = Language.cpp;
  tabs: MyTabItemType[] = [];
  activeTabKey: string | number | null = null;
  testCases: Array<CaseDeltaType[]> = [];
  setCodeType(type: Language | undefined) {
    this.codeType = type;
  }
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
  setEditorRef(ref: IEditor) {
    this.editorRef = ref;
  }
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
    console.log(this.testCases)
  }
  setActiveTabKey(key: string | number) {
    this.activeTabKey = key;
  }
  constructor() {
    makeAutoObservable(this);
  }
  get code() {
    return this.editorRef?.getValue() || '';
  }
}

export default new CodeStore();
