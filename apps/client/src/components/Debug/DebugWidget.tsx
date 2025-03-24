import { StepForward, RedoDot, ArrowDownToDot, ArrowUpFromDot } from 'lucide-react';
import { FC, forwardRef, ReactNode, useCallback } from 'react';
import debugStore from '@/store/debugStore';

export const DebugOperation: FC<{ children?: ReactNode }> = forwardRef<HTMLElement, { children?: ReactNode }>(
  ({ children }, ref) => {
    const fireCommand = useCallback((command: 'stepNext' | 'stepIn' | 'stepOut' | 'resume') => {
      try {
        debugStore[command]();
      } catch (error) {
        debugStore.closeDebug();
      }
    }, []);
    const handleResume = async () => {
      fireCommand('resume');
    };
    const handleStepNext = () => {
      fireCommand('stepNext');
    };
    const handleStepIn = () => {
      fireCommand('stepIn');
    };
    const handleStepOut = async () => {
      fireCommand('stepOut');
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
            <RedoDot className="cursor-pointer" size={18} onClick={handleStepNext}></RedoDot>
            <ArrowDownToDot className="cursor-pointer" size={18} onClick={handleStepIn}></ArrowDownToDot>
            <ArrowUpFromDot className="cursor-pointer" size={18} onClick={handleStepOut}></ArrowUpFromDot>
          </div>
        </section>
      </>
    );
  }
);
