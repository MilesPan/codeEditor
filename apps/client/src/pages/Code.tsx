import { DebugOperation } from '@/components/Debug/DebugWidget';
import { DragWrapper } from '@/components/DragWrapper';
import FlexLayout from '@/components/FlexLayout/FlexLayout';
import debugStore from '@/store/debugStore';
import { observer } from 'mobx-react-lite';
const Code = observer(() => {
  return (
    <>
      <main className="flex-1  pb-2 flex-grow">
        <div className="flex relative w-full h-full">
          <FlexLayout></FlexLayout>
          {debugStore.isDebugging && (
            <DragWrapper initPosition={{ left: 400, top: 13 }}>
              <DebugOperation></DebugOperation>
            </DragWrapper>
          )}
        </div>
      </main>
    </>
  );
});

export default Code;
