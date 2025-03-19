import { ResumeDto, StartDebugDto, StartDebugResponseVo, StepIntoDto, StepOutDto, StepOverDto } from '@Dtos/debug';
import request from './request';

export function fetchStartDebug(params: StartDebugDto) {
  return request.fetchPost<StartDebugResponseVo>('/debug/startDebug', params);
}
export function fetchResume(params: ResumeDto) {
  return request.fetchPost<StartDebugResponseVo>('/debug/resume', params);
}
export function fetchStepInto(params: StepIntoDto) {
  return request.fetchPost<StartDebugResponseVo>('/debug/stepInto', params);
}
export function fetchStepOver(params: StepOverDto) {
  return request.fetchPost<StartDebugResponseVo>('/debug/stepOver', params);
}
export function fetchStepOut(params: StepOutDto) {
  return request.fetchPost<StartDebugResponseVo>('/debug/stepOut', params);
}
