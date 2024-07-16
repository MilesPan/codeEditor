import { ProblemItemType } from '@Types/leetcode';
import { makeAutoObservable } from 'mobx';

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
  }

  get curTags() {
    return this.curQuestion?.tags;
  }
  get curInterviewed() {
    return this.curQuestion?.interviewed;
  }
}

export default new QuestionStore();
