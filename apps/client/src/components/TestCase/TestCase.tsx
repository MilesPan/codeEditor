import { FC } from 'react';
import MyTab, { MyTabItemType } from './MyTab';

const TestCase: FC = () => {
  const tabs: MyTabItemType[] = [
    { id: 1, name: 'Case1' },
    { id: 2, name: 'Case2' }
  ];
  return (
    <>
      <div className="px-4 py-3">
        <MyTab tabs={tabs}></MyTab>
      </div>
    </>
  );
};

export default TestCase;
