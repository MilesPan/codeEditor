import { ProblemItemType } from '@Types/leetcode/index';
import request from './request';

// 获取问题
export function getQuestionReq(params: { page: string }) {
  return request.fetchGet<ProblemItemType[]>('/leetcode/questions', params);
}
