
// ===== 调试环境初始化 =====
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
  process.emit('debugger:end');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
  process.emit('debugger:end');
});

// 监听调试结束事件
process.on('debugger:end', () => {
  console.log('调试会话结束');
  process.exit(0);
});

// 调试辅助函数
global.__debugPrint = function(value) {
  console.log(JSON.stringify(value, null, 2));
};


// ========== 用户代码开始 ==========
(function() {
  // 提供一些调试辅助变量
  const __debug = {
    log: function(...args) { console.log('[DEBUG]', ...args); },
    error: function(...args) { console.error('[DEBUG ERROR]', ...args); },
    inspect: function(obj) { console.log(require('util').inspect(obj, { depth: null, colors: true })); }
  };

   function main(){
  console.log(1)
  let a = 1;
  var b = 2;
  const c = 3;
  let d = 4;
  const e = 6
}

  // 如果提供了函数名，直接调用该函数
  if (typeof main === 'function') {
    console.log('调用入口函数: main');
    const result = main();
    console.log('入口函数返回结果:', result);
    // 标记调试结束
  }
  process.emit('debugger:end');

})();
// ========== 用户代码结束 ==========

