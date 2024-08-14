import { StartDebugDto } from '@Dtos/debug';
import request from './request';


export function fetchStartDebug(params: StartDebugDto) {
  return request.fetchPost('/debug/startDebug', params);
}
export function fetchResume() {
  return request.fetchPost('/debug/resume');
}
export function fetchStepInto() {
  return request.fetchPost('/debug/stepInto');
}
export function fetchStepOver() {
  return request.fetchPost('/debug/stepOver');
}
export function fetchStepOut() {
  return request.fetchPost('/debug/stepOut');
}
