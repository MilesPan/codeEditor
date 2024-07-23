import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MyTab, { Action, MyTabItemType, TargetKey } from './MyTab';
import './TestCase.css';
import { generateUUID } from '@Utils/index';
import { useDeepCompareEffect, useUpdate, useUpdateEffect } from 'ahooks';

type CaseDeltaType = {
  name: string;
  value: string;
  type: string;
};
const Case = ({
  delta,
  setDeltaValue
}: {
  delta: { name: string; value: string; type: string }[];
  setDeltaValue: (deltaName: string, event: React.FormEvent<HTMLDivElement>) => void;
}) => {
  useEffect(() => {
    console.log('case', delta);
  }, [delta]);
  return (
    <div className="case text-left flex flex-col gap-2">
      {delta.map(deltaType => {
        return (
          <div className="param flex flex-col gap-2" key={deltaType.name}>
            <div className="paramName font-menlo">{deltaType.name} = </div>
            <div
              className="paramValue font-menlo p-3 text-sm"
              suppressContentEditableWarning
              contentEditable
              onInput={event => setDeltaValue(deltaType.name, event)}
            >
              {deltaType.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};
const initDeltas: Array<CaseDeltaType[]> = [
  [
    {
      name: 'nums',
      value: '[2,7,11,15]',
      type: 'array'
    },
    {
      name: 'target',
      value: '9',
      type: 'number'
    }
  ],
  [
    {
      name: 'nums',
      value: '[1,2,3,4]',
      type: 'array'
    },
    {
      name: 'target',
      value: '10',
      type: 'number'
    }
  ]
];
const initTabs: MyTabItemType[] = [
  { key: 1, name: 'Case 1', children: <Case delta={initDeltas[0]}></Case> },
  { key: 2, name: 'Case 2', children: <Case delta={initDeltas[1]}></Case> }
];

// TODO: setDeltaValue
const TestCase: FC = memo(() => {
  console.log('render');
  const [tabs, setTabs] = useState<MyTabItemType[]>(initTabs);
  const [deltas, setDeltas] = useState(initDeltas);
  const [activeKey, setActiveKey] = useState(initTabs[0].key);
  let newAddActiveKey = useRef(generateUUID());

  function setDeltaValue(index: number, deltaName: string, event: React.FormEvent<HTMLDivElement>) {
    const value = (event.target as HTMLDivElement).innerText;
  }

  useUpdateEffect(() => {
    newAddActiveKey.current = generateUUID();
    setTabs(prevTab => [
      ...prevTab,
      {
        key: newAddActiveKey.current,
        name: `Case ${prevTab.length + 1 ?? 1}`,
        children: <Case delta={deltas[deltas.length - 1]}></Case>
      }
    ]);
  }, [deltas]);
  useUpdateEffect(() => {
    setActiveKey(newAddActiveKey.current);
  }, [tabs.length]);
  useUpdateEffect(() => {
    console.info(deltas[deltas.length - 1], deltas[deltas.length - 2]);
  }, [activeKey]);
  const onEdit = useCallback(
    (targetKey: TargetKey, action: Action) => {
      switch (action) {
        case 'add':
          setDeltas(prevDeltas => [...prevDeltas, structuredClone(prevDeltas[prevDeltas.length - 1])]);
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
          setActiveKey(newActiveKey);
          setTabs(newTabs.map((tab, index) => ({ ...tab, name: `Case ${index + 1}` })));
          break;
        default:
          break;
      }
    },
    [tabs, activeKey]
  );
  return (
    <>
      <div className="px-4 py-3">
        <MyTab
          tabs={tabs}
          onEdit={onEdit}
          activeKey={activeKey}
          maxTabCount={8}
          onChange={tab => setActiveKey(tab.key)}
        ></MyTab>
      </div>
    </>
  );
});

export default TestCase;
