import FlexLayout from '@/components/FlexLayout/FlexLayout';
import { memo } from 'react';

const Code = memo(() => {
  return (
    <>
      <main className="flex-1  pb-2 flex-grow">
        <div className="flex relative w-full h-full">
          <FlexLayout></FlexLayout>
        </div>
      </main>
    </>
  );
});

export default Code;
