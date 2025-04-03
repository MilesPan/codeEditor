import { Bug, Play, Send } from 'lucide-react';
import { CSSTransition } from 'react-transition-group';
import { useCodeContext } from '@/contexts/CodeContext';
import { useTabContext } from '@/contexts/TabContext';
import { DebuggerTab, TabName } from '@/components/FlexLayout/model';
import { CodeStore, UserStore } from '@/store';
import { runCode, convertLanguageToCodeType, Language } from '@Request/code';
import { parseConsoleOutput } from '@Utils/code';
import { useRequest, useToggle, useUpdateEffect } from 'ahooks';
import { observer } from 'mobx-react-lite';
import codeStore from '@/store/codeStore';
import { message } from 'antd';
import debugStore from '@/store/debugStore';
import { fetchStartDebug } from '@Request/debug';
import { useEffect, useMemo, useRef } from 'react';
import { Actions, DockLocation } from 'flexlayout-react';

const Operations = observer(() => {
  const { isRunning, setIsRunning, setExecedCode } = useCodeContext();
  const [messageApi, ContextHolder] = message.useMessage();
  const { activeTab, model, deleteTab } = useTabContext();
  const { run } = useRequest(runCode, {
    manual: true,
    onBefore() {
      if (!CodeStore.code.trim()) {
        messageApi.warning('请输入代码');
        throw new Error('请输入代码');
      }
      setIsRunning(true);
      setExecedCode(true);
      activeTab(TabName.testResponse);
    },
    onSuccess(res) {
      const parsedResponse = res.data.logs.map(log => {
        return {
          consoleLogs: log.consoleLogs.map(consoleLog => parseConsoleOutput(consoleLog)),
          results: log.results.map(result => parseConsoleOutput(result)),
          error: log.error,
          execTime: res.data.execTime
        };
      });
      codeStore.setTestResponse(parsedResponse);
    },
    onError() {
      activeTab(TabName.testCase);
      setExecedCode(false);
    },
    onFinally() {
      setIsRunning(false);
    }
  });
  const { run: runWithDebug } = useRequest(fetchStartDebug, {
    manual: true,
    onBefore() {
      if (!debugStore.breakPoints.size) {
        messageApi.warning('请设置断点');
        throw new Error('请设置断点');
      }
      setIsRunning(true);
      setExecedCode(true);
      deleteTab(TabName.debugger);
      model?.doAction(Actions.addNode(DebuggerTab, TabName.leftTabset, DockLocation.CENTER, -1, true));
    },
    onSuccess(res) {
      debugStore.setupDapWebSocket(codeStore.editorRef);
      debugStore.startDebug();
      debugStore.onTerminate(() => {
        messageApi.warning('调试结束');
        activeTab(TabName.desc);
      });
      debugStore.setIsDebugging(true);
      // debugStore.setResult(res.data.result);
      debugStore.setFileName(res.data.fileName);
    },
    onError() {
      model?.doAction(Actions.deleteTab(TabName.debugger));
      activeTab(TabName.desc);
    },
    onFinally() {
      setIsRunning(false);
    }
  });
  const enableDebug = useMemo(() => {
    return codeStore.codeType === Language.nodejs;
  }, [codeStore.codeType]);
  const [debugActive, { toggle: toggleDebugActive, set: setDebugActive }] = useToggle(false, true);
  useEffect(() => {
    if (!enableDebug) setDebugActive(false);
  }, [enableDebug]);
  const enhanceToggle = () => {
    if (!enableDebug) return messageApi.warning('当前语言不支持调试');
    toggleDebugActive();
  };
  useUpdateEffect(() => {
    messageApi.success(debugActive ? '调试功能已开启' : '调试功能已关闭');
    debugStore.setDebugActive(debugActive);
  }, [debugActive]);
  function handleRun() {
    debugActive
      ? runWithDebug({
          code: CodeStore.code,
          // breakPoints: Array.from(debugStore.breakPoints).map(i => i - 1),
          functionName: CodeStore.functionName,
          roomId: UserStore.userInfo.roomId,
          userName: UserStore.userInfo.userName,
          curTestCase: CodeStore.curTestCase
        })
      : run({
          code: CodeStore.code,
          testCases: CodeStore.testCases,
          functionName: CodeStore.functionName,
          type: convertLanguageToCodeType(CodeStore.codeType)
        });
  }
  ``;

  const showOps = useMemo(() => {
    return !(isRunning || debugStore.isDebugging);
  }, [isRunning, debugStore.isDebugging]);

  const nodeRef = useRef(null);
  return (
    <>
      {ContextHolder}
      <CSSTransition nodeRef={nodeRef} in={showOps} timeout={500} classNames="button-transition" unmountOnExit>
        <div className="operations flex items-center gap-1">
          <div
            onClick={enhanceToggle}
            className={`${!enableDebug && 'cursor-not-allowed'} h-9 px-3 bug flex items-center bg-[--fill-quaternary_hover] rounded-l-lg cursor-pointer hover:opacity-80`}
          >
            <Bug size={18} color={debugActive ? 'var(--star_color)' : '#a4a4a4'}></Bug>
          </div>
          <div
            className="h-9 px-3 run flex items-center bg-[--fill-quaternary] hover:bg-[--fill-quaternary_hover] cursor-pointer"
            onClick={handleRun}
          >
            <Play size={18} color="#686868" fill="#686868"></Play>
            <span className="ml-2 text-sm">运行</span>
          </div>
          <div
            className="h-9 px-3 submit flex items-center bg-[--fill-quaternary] rounded-r-lg hover:bg-[--fill-quaternary_hover] cursor-pointer"
            onClick={handleRun}
          >
            <Send size={18} color="var(--logo_bg-green)"></Send>
            <span className="ml-2 text-sm">提交</span>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition nodeRef={nodeRef} in={!showOps} timeout={500} classNames="button-transition" unmountOnExit>
        <div className="isRunning-container flex justify-center">
          <div className="h-9 px-3 rounded-lg flex items-center gap-2 bg-[--fill-quaternary]">
            <div className="loader"></div>
            {debugStore.debugActive ? '调试中...' : '判题中...'}
          </div>
        </div>
      </CSSTransition>
    </>
  );
});

export default Operations;
