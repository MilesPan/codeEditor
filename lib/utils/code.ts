export enum OutputType {
  plain,
  terminal
}

/**
 *  解析docker中返回的输出
 * 如果是输出1 2这种数字， docker会输出转码后的字符
 * 所以需要解析一下
 */
export function parseConsoleOutput(output: string, type: OutputType = OutputType.plain) {
  if (!output) return [];
  // 换行解析
  let splitAsEnter = output.split(/\n|\n\n/).map(str => {
    if (type === OutputType.plain) {
      str = encodeURI(str);
      str = str.replace(/%1B%5B.*?m.*?%1B%5BK|%1B%5B.*?m|%0D/g, '');
    }

    return decodeURI(str);
  });

  return splitAsEnter;
}
