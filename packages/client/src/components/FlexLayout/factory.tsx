import TabOne from '@/components/TabOne';
import TabTwo from '@/components/TabTwo';
import { TabNode, TitleFactory } from 'flexlayout-react';
import { ClipboardPen, Code, FlaskRound, History, SquareActivity, Terminal } from 'lucide-react';
import { ReactNode } from 'react';
import { TABNAME, TabName } from './model';
import ProblemDescription from '../ProblemDescription/ProblemDescription';
export const contentFactory = (node: TabNode): ReactNode => {
  const TabStrategy = {
    [TabName.desc]: <ProblemDescription></ProblemDescription>,
    [TabName.solution]: <TabTwo></TabTwo>,
    [TabName.record]: <TabTwo></TabTwo>,
    [TabName.code]: <TabTwo></TabTwo>,
    [TabName.testCase]: <TabTwo></TabTwo>,
    [TabName.testResponse]: <TabTwo></TabTwo>
  }
  return TabStrategy[node.getComponent() as TABNAME];
};

export const titleFactory: TitleFactory = (node: TabNode) => {
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
          <Terminal size={18} color="var(--logo_bg-green)"></Terminal>
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
