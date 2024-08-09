import { TabNode, TitleFactory } from 'flexlayout-react';
import { ClipboardPen, Code, FlaskRound, History, LoaderCircle, SquareActivity, Terminal } from 'lucide-react';
import { ReactNode } from 'react';
import { TABNAME, TabName } from './model';
import CodeEditor from '../CodeEditor/CodeEditor';
import ProblemDescription from '../ProblemDescription/ProblemDescription';
import TestResponse from '../TestResponse/TestResponse';
import Meeting from '../Meeting/Meeting';
import TestCase from '../TestCase/TestCase';

import { useCodeContext } from '@/contexts/CodeContext';
import './factory.css';

export const contentFactory = (node: TabNode): ReactNode => {
  const TabStrategy = {
    [TabName.desc]: <ProblemDescription></ProblemDescription>,
    [TabName.solution]: <TestResponse></TestResponse>,
    [TabName.record]: <TestResponse></TestResponse>,
    [TabName.code]: <CodeEditor></CodeEditor>,
    [TabName.testCase]: <TestCase></TestCase>,
    [TabName.testResponse]: <TestResponse></TestResponse>,
    [TabName.meeting]: <Meeting></Meeting>
  };
  return TabStrategy[node.getComponent() as TABNAME];
};

export const titleFactory: TitleFactory = (node: TabNode) => {
  const { isRunning } = useCodeContext();

  const TitleStrategy = {
    [TabName.desc]: (
      <>
        <div className="flex items-center">
          <ClipboardPen size={18} color="var(--logo_bg-blue)"></ClipboardPen>
          <span className="ml-1 text-sm">{TabName.desc}</span>
        </div>
      </>
    ),
    [TabName.solution]: (
      <>
        <div className="flex items-center">
          <FlaskRound size={18} color="var(--logo_bg-blue)"></FlaskRound>
          <span className="ml-1 text-sm">{TabName.solution}</span>
        </div>
      </>
    ),
    [TabName.record]: (
      <>
        <div className="flex items-center">
          <History size={18} color="var(--logo_bg-blue)"></History>
          <span className="ml-1 text-sm">{TabName.record}</span>
        </div>
      </>
    ),
    [TabName.testCase]: (
      <>
        <div className="flex items-center">
          <SquareActivity size={18} color="var(--logo_bg-green)"></SquareActivity>
          <span className="ml-1 text-sm">{TabName.testCase}</span>
        </div>
      </>
    ),
    [TabName.testResponse]: (
      <>
        <div className="flex items-center">
          {isRunning ? (
            <LoaderCircle size={18} className="animate-spin opacity-40"></LoaderCircle>
          ) : (
            <Terminal size={18} color="var(--logo_bg-green)"></Terminal>
          )}
          <span className="ml-1 text-sm">{TabName.testResponse}</span>
        </div>
      </>
    ),
    [TabName.code]: (
      <>
        <div className="flex items-center">
          <Code size={18} color="var(--logo_bg-green)"></Code>
          <span className="ml-1 text-sm">{TabName.code}</span>
        </div>
      </>
    )
  };
  return TitleStrategy[node.getName() as TABNAME];
};
