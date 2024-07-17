import { FC, useState } from 'react';
import MyTab, { Action, MyTabItemType, TargetKey } from './MyTab';

const initTabs: MyTabItemType[] = [
  { key: 1, name: 'Case1' },
  { key: 2, name: 'Case2' }
];

const TestCase: FC = () => {
  const [tabs, setTabs] = useState<MyTabItemType[]>(initTabs);
  const [activeKey, setActiveKey] = useState(initTabs[0].key);

  const onEdit = (targetKey: TargetKey, action: Action) => {
    switch (action) {
      case 'add':
        break;

      case 'remove':
        let newActiveKey = activeKey;
        let lastIndex = -1;
        tabs.forEach((tab, i) => {
          if (tab.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const newTabs = tabs.filter(tab => tab.key !== targetKey);
        if (newTabs.length && newActiveKey === targetKey) {
          if (lastIndex >= 0) {
            newActiveKey = newTabs[lastIndex].key;
          } else {
            newActiveKey = newTabs[0].key;
          }
        }
        setActiveKey(newActiveKey)
        setTabs(newTabs);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="px-4 py-3">
        <MyTab tabs={tabs} onEdit={onEdit} activeKey={activeKey} onChange={tab => setActiveKey(tab.key)}></MyTab>
      </div>
    </>
  );
};

export default TestCase;
