import { Bug, Play, Send } from 'lucide-react';
import { CSSTransition } from 'react-transition-group';
import { useContext, useState } from 'react';
import { useCodeContext } from '@/contexts/CodeContext';
import { useTabContext } from '@/contexts/TabContext';
import { TabName } from '@/components/FlexLayout/model';
const Operations = () => {
  const { isRunning, setIsRunning, setExecedCode } = useCodeContext();

  const { activateTab, findTabNodeByName, model } = useTabContext();
  function handleRun() {
    setIsRunning(true);
    setExecedCode(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 3000);

    const testResponseNode = findTabNodeByName(model?.getRoot(), TabName.testResponse);
    activateTab(testResponseNode?.getId() || '');
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
};

export default Operations;
