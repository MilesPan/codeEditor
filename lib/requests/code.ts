import request from './request';

export enum CodeType {
  cpp = 'cpp',
  nodejs = 'nodejs',
  go = 'go',
  python3 = 'python3',
  python2 = 'python2',
  java = 'java',
  php = 'php',
  rust = 'rust',
  c = 'c',
  dotnet = 'dotnet',
  ts = 'typescript'
}
export interface RunCodeParams {
  type: CodeType;
  code: string;
  testCases: any;
}
export function runCode(params: RunCodeParams) {
  return request.fetchPost('/run', params);
}
