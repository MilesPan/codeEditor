import { LC } from './Response';

export * from './Response';
// codeTop返回的数据类型
export type FetchCTProblemsListRes = {
  finished: number[];
  count: number;
  list: CTProblemItemType[];
};

//题目等级
export enum Level {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}
export const LevelTextMap: Record<Level, string> = {
  [Level.Easy]: '简单',
  [Level.Medium]: '中等',
  [Level.Hard]: '困难'
};
export const LevelCssMap: Record<Level, string> = {
  [Level.Easy]: 'easy',
  [Level.Medium]: 'medium',
  [Level.Hard]: 'hard'
};
export type CTProblemItemType = {
  id: number;
  leetcode?: {
    id: number;
    frontend_question_id: string;
    question_id: number;
    title: string;
    interviewed: LC.Interviewed;
    content: string;
    level: Level;
    slug_title: string;
    expand: boolean;
    tags: LC.TopicTag[];
  };
  comment_count: number;
};
export type ProblemItemType = {
  title: string;
  content: string;
  frontend_question_id: string;
  testCase: {
    metaData: {
      name: string;
      params: { name: string; type: string }[];
      return: { type: string };
    };
    exampleTestCases: any[];
  };
  tags: LC.TopicTag[];
  level: Level;
};

export type FetchProblemListRes = ProblemItemType[];

// 测试用例
export type CaseDeltaType = {
  name: string;
  value: string;
  type: string;
};
export interface LogData {
  consoleLogs: string[];
  results: string[];
}
export type TestResponseType = {
  logs: LogData[];
  execTime: string;
};
export type ParsedTestResponse = {
  consoleLogs: string[][];
  results: string[][];
  execTime: string;
}
