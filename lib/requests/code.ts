import request from './request';

export enum Language {
  Cpp = 'cpp',
  Java = 'java',
  Python2 = 'python2',
  Python3 = 'python3',
  C = 'c',
  Csharp = 'csharp',
  Javascript = 'javascript',
  Typescript = 'typescript',
  Php = 'php',
  Swift = 'swift',
  Kotlin = 'kotlin',
  Dart = 'dart',
  Go = 'go',
  Ruby = 'ruby',
  Rust = 'rust'
}

export interface RunCodeParams {
  type: Language;
  code: string;
  testCases: any;
}
export function runCode(params: RunCodeParams) {
  return request.fetchPost('/run', params);
}
