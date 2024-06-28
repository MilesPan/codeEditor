import request from './request';

export function getQuestionReq() {
  return request.fetchGet<any>('/leetcode');
}
