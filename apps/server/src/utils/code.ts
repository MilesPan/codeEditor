export async function validateFunction(
  code: string,
  functionName: string,
): Promise<void> {
  const ivm = await import('isolated-vm');
  // 创建一个新的隔离实例
  const isolate = new ivm.Isolate({ memoryLimit: 128 });

  try {
    // 创建一个新的上下文
    const context = await isolate.createContext();

    // 创建一个新的脚本
    const script = await isolate.compileScript(`
        ${code}
        if (typeof ${functionName} !== 'function') {
          throw new Error('函数未定义');
        }
      `);

    // 在隔离的上下文中运行脚本
    await script.run(context);
  } catch (error) {
    if (error.message.includes('函数未定义')) {
      throw new Error(`函数 "${functionName}" 在提供的代码中未定义`);
    }
    // 如果是语法错误
    if (error instanceof SyntaxError) {
      throw new Error(`代码存在语法错误: ${error.message}`);
    }
    throw new Error(`代码验证失败: ${error.message}`);
  } finally {
    // 释放资源
    isolate.dispose();
  }
}
