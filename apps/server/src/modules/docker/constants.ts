import { CodeType } from '@Request/code';
import { CodeDockerOption, CodeEnv, FileSuffix } from './types';
export const ImageMap: Record<CodeType, CodeDockerOption> = {
  cpp: {
    env: CodeEnv.cpp,
    shell: 'g++ code.cpp -o code.out && ./code.out',
    // shellWithStdin: 'g++ code.cpp -o code.out && ./code.out < input.txt',
    fileSuffix: FileSuffix.cpp,
  },
  nodejs: {
    env: CodeEnv.nodejs,
    shell: 'node code.js',
    // shellWithStdin: 'node code.js < input.txt',
    fileSuffix: FileSuffix.nodejs,
  },
  go: {
    env: CodeEnv.go,
    shell: 'go run code.go',
    // shellWithStdin: 'go run code.go < input.txt',
    fileSuffix: FileSuffix.go,
  },
  python3: {
    env: CodeEnv.python3,
    shell: 'python3 code.py',
    // shellWithStdin: 'python3 code.py input.txt',
    fileSuffix: FileSuffix.python3,
    prefix: `def expand_arg_files():
      import sys
      args = []
      if len(sys.argv) < 2:
          return
      with open(file=sys.argv[1], mode="r", encoding="utf-8") as f:
          line = f.readline()
          while line:
              args.append(line.strip())
              line = f.readline()
      sys.argv[1:] = args
  
  
  expand_arg_files()
  `,
  },
  java: {
    env: CodeEnv.java,
    shell: 'javac Code.java && java Code',
    // shellWithStdin: 'javac Code.java && java Code < input.txt',
    fileSuffix: FileSuffix.java,
  },
  php: {
    env: CodeEnv.php,
    shell: 'php code.php',
    // shellWithStdin: 'php code.php < input.txt',
    fileSuffix: FileSuffix.php,
  },
  rust: {
    env: CodeEnv.rust,
    shell: 'rustc code.rs && ./code',
    // shellWithStdin: 'rustc code.rs && ./code < input.txt',
    fileSuffix: FileSuffix.rust,
  },
  c: {
    env: CodeEnv.c,
    shell: 'g++ code.c -o code.out && ./code.out',
    // shellWithStdin: 'g++ code.c -o code.out && ./code.out < input.txt',
    fileSuffix: FileSuffix.c,
  },
  dotnet: {
    env: CodeEnv.dotnet,
    shell: 'mcs -out:code.exe code.cs && mono code.exe',
    // shellWithStdin: 'mcs -out:code.exe code.cs && mono code.exe < input.txt',
    fileSuffix: FileSuffix.dotnet,
  },
  typescript: {
    env: CodeEnv.ts,
    shell: './node_modules/typescript/bin/tsc code.ts && node code.js',
    // shellWithStdin:
    //   './node_modules/typescript/bin/tsc code.ts && node code.js < input.txt',
    fileSuffix: FileSuffix.ts,
  },
};
