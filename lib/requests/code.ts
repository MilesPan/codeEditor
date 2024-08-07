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
const languageToCodeTypeMap: { [key in Language]: CodeType } = {
  [Language.cpp]: CodeType.cpp,
  [Language.nodejs]: CodeType.nodejs,
  [Language.go]: CodeType.go,
  [Language.python3]: CodeType.python3,
  [Language.java]: CodeType.java,
  [Language.php]: CodeType.php,
  [Language.rust]: CodeType.rust,
  [Language.c]: CodeType.c,
  [Language.dotnet]: CodeType.dotnet,
  [Language.ts]: CodeType.ts,
};

export function convertLanguageToCodeType(language: Language | undefined): CodeType {
  return languageToCodeTypeMap[language];
}
export interface RunCodeParams {
  type: CodeType;
  code: string;
  testCases: any;
}
export function runCode(params: RunCodeParams) {
  return request.fetchPost<string>('/run', params);
}
