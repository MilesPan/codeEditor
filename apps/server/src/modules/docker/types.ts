/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum CodeEnv {
  cpp = 'cpp:11',
  nodejs = 'node:lts',
  go = 'go:latest',
  python3 = 'python:3',
  java = 'java:latest',
  php = 'php:8',
  rust = 'rust:latest',
  c = 'cpp:11',
  dotnet = 'mono:lts',
  ts = 'node:lts-alpine',
}

export enum FileSuffix {
  cpp = 'cpp',
  nodejs = 'js',
  go = 'go',
  python3 = 'py',
  java = 'java',
  php = 'php',
  rust = 'rs',
  c = 'c',
  dotnet = 'cs',
  ts = 'ts',
}

export interface CodeDockerOption {
  env: CodeEnv;
  shell: string;
  fileSuffix: FileSuffix;
  prefix?: string;
}
