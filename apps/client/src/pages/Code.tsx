import { DebugOperation } from '@/components/Debug/DebugWidget';
import { DragWrapper } from '@/components/DragWrapper';
import FlexLayout from '@/components/FlexLayout/FlexLayout';
import { memo } from 'react';

const Code = memo(() => {
  return (
    <>
      <main className="flex-1  pb-2 flex-grow">
        <div className="flex relative w-full h-full">
          <FlexLayout></FlexLayout>
          <DragWrapper initPosition={{ left: 600, top: 13 }}>
            <DebugOperation></DebugOperation>
          </DragWrapper>
        </div>
      </main>
    </>
  );
});

export default Code;
