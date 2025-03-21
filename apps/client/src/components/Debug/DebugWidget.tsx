import { StepForward, RedoDot, ArrowDownToDot, ArrowUpFromDot } from 'lucide-react';
import { FC, forwardRef, ReactNode, useCallback } from 'react';
import { fetchResume, fetchStepInto, fetchStepOut, fetchStepOver } from '@Request/debug';
import debugStore from '@/store/debugStore';
import { ResponseResult } from '@Request/request';
import { StartDebugResponseDto } from '@Dtos/debug';
import { useTabContext } from '@/contexts/TabContext';
import { Actions } from 'flexlayout-react';
import { TabName } from '../FlexLayout/model';

export const DebugOperation: FC<{ children?: ReactNode }> = forwardRef<HTMLElement, { children?: ReactNode }>(
  ({ children }, ref) => {
    const helper = useCallback((res: ResponseResult<StartDebugResponseDto, any>) => {
      if (res.data.status === 'debugging') {
        debugStore.setResult(res.data.result);
        debugStore.setCurLine(res.data.curLine);
      } else if (res.data.status === 'end') {
        debugStore.setCurLine(-1);
      }
    }, []);

    const { model, findTabNode, activateTab } = useTabContext();
    const handleResume = async () => {
      try {
        const res = await fetchResume({ sessionId: debugStore.sessionId });
        helper(res);
      } catch (error) {
        debugStore.closeDebug();
        model?.doAction(Actions.deleteTab(TabName.debugger));
        activateTab(findTabNode(model?.getRoot(), 'name', TabName.desc)?.getId() || '');
      }
    };
    const handleStepOver = async () => {
      try {
        const res = await fetchStepOver({ sessionId: debugStore.sessionId });
        helper(res);
      } catch (error) {
        debugStore.closeDebug();
        model?.doAction(Actions.deleteTab(TabName.debugger));
        activateTab(findTabNode(model?.getRoot(), 'name', TabName.desc)?.getId() || '');
      }
    };
    const handleStepInto = async () => {
      try {
        const res = await fetchStepInto({ sessionId: debugStore.sessionId });
        helper(res);
      } catch (error) {
        debugStore.closeDebug();
        model?.doAction(Actions.deleteTab(TabName.debugger));
        activateTab(findTabNode(model?.getRoot(), 'name', TabName.desc)?.getId() || '');
      }
    };
    const handleStepOut = async () => {
      try {
        const res = await fetchStepOut({ sessionId: debugStore.sessionId });
        helper(res);
      } catch (error) {
        debugStore.closeDebug();
        model?.doAction(Actions.deleteTab(TabName.debugger));
        activateTab(findTabNode(model?.getRoot(), 'name', TabName.desc)?.getId() || '');
      }
    };

    return (
      <>
        <section ref={ref}>
          <div className="flex gap-2 dark:bg-[#606060] bg-[#0000000d] rounded-lg px-2 hover:pl-5 py-1.5 transition-all ">
            {children}
            <StepForward
              className="cursor-pointer"
              size={18}
              color="var(--logo_bg-green)"
              fill="var(--logo_bg-green)"
              onClick={handleResume}
            ></StepForward>
            <RedoDot className="cursor-pointer" size={18} onClick={handleStepOver}></RedoDot>
            <ArrowDownToDot className="cursor-pointer" size={18} onClick={handleStepInto}></ArrowDownToDot>
            <ArrowUpFromDot className="cursor-pointer" size={18} onClick={handleStepOut}></ArrowUpFromDot>
          </div>
        </section>
      </>
    );
  }
);
