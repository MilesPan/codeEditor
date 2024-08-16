import { StartDebugDto, StartDebugResponseDto } from '@Dtos/debug';
import request from './request';

export function fetchStartDebug(params: StartDebugDto) {
  return request.fetchPost<StartDebugResponseDto>('/debug/startDebug', params);
}
export function fetchResume() {
  return request.fetchPost<StartDebugResponseDto>('/debug/resume');
}
export function fetchStepInto() {
  return request.fetchPost<StartDebugResponseDto>('/debug/stepInto');
}
export function fetchStepOver() {
  return request.fetchPost<StartDebugResponseDto>('/debug/stepOver');
}
export function fetchStepOut() {
  return request.fetchPost<StartDebugResponseDto>('/debug/stepOut');
}
