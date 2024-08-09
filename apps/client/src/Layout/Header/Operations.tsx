import { Bug, Play, Send } from 'lucide-react';
import { CSSTransition } from 'react-transition-group';
import { useCodeContext } from '@/contexts/CodeContext';
import { useTabContext } from '@/contexts/TabContext';
import { TabName } from '@/components/FlexLayout/model';
import { CodeStore } from '@/store';
import { runCode, convertLanguageToCodeType } from '@Request/code';
import { parseConsoleOutput } from '@Utils/code';
import { useRequest } from 'ahooks';
import { observer } from 'mobx-react-lite';
import codeStore from '@/store/codeStore';
const Operations = observer(() => {
  const { isRunning, setIsRunning, setExecedCode } = useCodeContext();

  const { activateTab, findTabNodeByName, model } = useTabContext();
  const { run } = useRequest(runCode, {
    manual: true,
    onBefore() {
      setIsRunning(true);
      setExecedCode(true);
      const testResponseNode = findTabNodeByName(model?.getRoot(), TabName.testResponse);
      activateTab(testResponseNode?.getId() || '');
    },
    onSuccess(res) {
      const parsedResponse = res.data.logs.map(log => {
        return {
          consoleLogs: log.consoleLogs.map(consoleLog => parseConsoleOutput(consoleLog)),
          results: log.results.map(result => parseConsoleOutput(result)),
          execTime: res.data.execTime
        };
      });
      codeStore.setTestResponse(parsedResponse);
    },
    onFinally() {
      setIsRunning(false);
    }
  });
  function handleRun() {
    run({
      code: CodeStore.code,
      testCases: CodeStore.testCases,
      functionName: CodeStore.functionName,
      type: convertLanguageToCodeType(CodeStore.codeType)
    });
  }
  ``;
  return (
    <>
      <CSSTransition in={!isRunning} timeout={500} classNames="button-transition" unmountOnExit>
        <div className="operations flex items-center gap-1">
          <div className="h-9 px-3 bug flex items-center bg-[--fill-quaternary_hover] rounded-l-lg cursor-not-allowed">
            <Bug size={18} color="#a4a4a4"></Bug>
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

      <CSSTransition in={isRunning} timeout={500} classNames="button-transition" unmountOnExit>
        <div className="isRunning-container flex justify-center">
          <div className="h-9 px-3 rounded-lg flex items-center gap-2 bg-[--fill-quaternary]">
            <div className="loader"></div>
            判题中...
          </div>
        </div>
      </CSSTransition>
    </>
  );
});

export default Operations;
