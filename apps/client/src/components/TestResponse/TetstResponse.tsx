import {  useCodeContext } from '@/contexts/CodeContext';
import { Skeleton } from 'antd';
import { FC, memo } from 'react';

const TestResponse: FC = memo(() => {
  console.log('testResponse render')
  const { isRunning, execedCode } = useCodeContext();
  return (
    <>
      {
        <>
          {execedCode ? (
            <>
              <div className="p-5 h-full">
                <Skeleton  active loading={isRunning}>123</Skeleton>
              </div>
            </>
          ) : (
            <div className="text-sm opacity-40 w-full h-full flex items-center justify-center">请先执行代码</div>
          )}
        </>
      }
    </>
  );
});
export default TestResponse;
