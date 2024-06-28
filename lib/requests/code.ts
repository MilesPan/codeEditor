import request from './request';

// Docker的env
export enum CodeType {
  cpp = 'cpp',
  nodejs = 'nodejs',
  go = 'go',
  python3 = 'python3',
  java = 'java',
  php = 'php',
  rust = 'rust',
  c = 'c',
  dotnet = 'dotnet',
  ts = 'typescript'
}
// Monaco编辑器绑定的language
export enum Language {
  cpp = 'cpp',
  nodejs = 'javascript',
  go = 'go',
  python3 = 'python',
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
