import { ResumeDto, StartDebugDto, StartDebugResponseDto, StepIntoDto, StepOutDto, StepOverDto } from '@Dtos/debug';
import request from './request';

export function fetchStartDebug(params: StartDebugDto) {
  return request.fetchPost<StartDebugResponseDto>('/debug/startDebug', params);
}
export function fetchResume(params: ResumeDto) {
  return request.fetchPost<StartDebugResponseDto>('/debug/resume', params);
}
export function fetchStepInto(params: StepIntoDto) {
  return request.fetchPost<StartDebugResponseDto>('/debug/stepInto', params);
}
export function fetchStepOver(params: StepOverDto) {
  return request.fetchPost<StartDebugResponseDto>('/debug/stepOver', params);
}
export function fetchStepOut(params: StepOutDto) {
  return request.fetchPost<StartDebugResponseDto>('/debug/stepOut', params);
}
