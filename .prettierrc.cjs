module.exports = {
  // 一行最多 120 字符
  printWidth: 130,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 结尾不添加逗号
  trailingComma: 'none',
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'avoid',
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 格式化内嵌代码
  embeddedLanguageFormatting: 'auto'
};
