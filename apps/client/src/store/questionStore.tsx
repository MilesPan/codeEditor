import { CaseDetail } from '@/components/TestCase/TestCase';
import { MyTabItemType } from '@/components/TestCase/MyTab';
import { ProblemItemType } from '@Types/leetcode';
import { makeAutoObservable } from 'mobx';
import codeStore from './codeStore';
import { generateUUID } from '@Utils/index';

class QuestionStore {
  questions: ProblemItemType[] = [];

  curQuestion: ProblemItemType | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  setQuestions(ques: ProblemItemType[]) {
    this.questions = ques;
  }
  setCurQuestion(que: ProblemItemType) {
    this.curQuestion = que;

    const testCase = que.testCase;
    const values = testCase.exampleTestCases.map(values => values.split('\n'));
    const initDeltas = values.map(value => {
      return value.map((v: string, index: number) => {
        return {
          name: testCase.metaData.params[index].name,
          value: v,
          type: testCase.metaData.params[index].type
        };
      });
    });
    const initTabs: MyTabItemType[] = values.map((_, index) => ({
      key: generateUUID(),
      name: `Case ${index + 1}`,
      children: <CaseDetail delta={initDeltas[index]} setDeltaValue={codeStore.updateTestCases}></CaseDetail>
    }));
    codeStore.setTestCases(initDeltas);
    codeStore.setTabs(initTabs);
    codeStore.setActiveTabKey(initTabs[0].key);
  }

  get curTags() {
    return this.curQuestion?.tags;
  }
  get curInterviewed() {
    return this.curQuestion?.interviewed;
  }
}

export default new QuestionStore();
