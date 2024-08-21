import { StepForward, RedoDot, ArrowDownToDot, ArrowUpFromDot } from 'lucide-react';
import { FC, forwardRef, ReactNode } from 'react';
import { fetchResume, fetchStepInto, fetchStepOut, fetchStepOver } from '@Request/debug';
import debugStore from '@/store/debugStore';

export const DebugOperation: FC<{ children?: ReactNode }> = forwardRef<HTMLElement, { children?: ReactNode }>(
  ({ children }, ref) => {
    const handleResume = async () => {
      const res = await fetchResume();
      debugStore.setResult(res.data.result);
      debugStore.setCurLine(res.data.curLine);
    };
    const handleStepOver = async () => {
      const res = await fetchStepOver();
      debugStore.setResult(res.data.result);
      debugStore.setCurLine(res.data.curLine);
    };
    const handleStepInto = async () => {
      const res = await fetchStepInto();
      debugStore.setResult(res.data.result);
      debugStore.setCurLine(res.data.curLine);
    };
    const handleStepOut = async () => {
      const res = await fetchStepOut();
      debugStore.setResult(res.data.result);
      debugStore.setCurLine(res.data.curLine);
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
