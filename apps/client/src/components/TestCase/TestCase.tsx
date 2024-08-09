import { ChangeEventHandler, FC, useRef } from 'react';
import MyTab, { Action, TargetKey } from './MyTab';
import { Input, Skeleton } from 'antd';
import './TestCase.css';
import { generateUUID } from '@Utils/index';
import { observer } from 'mobx-react-lite';
import codeStore from '@/store/codeStore';
import { CaseDeltaType } from '@Types/leetcode';
import { useFunctionName } from '@/hooks/useInput';

const { TextArea } = Input;
export const CaseDetail = observer(
  ({
    delta,
    setDeltaValue
  }: {
    delta: CaseDeltaType[];
    setDeltaValue: (delta: CaseDeltaType[], deltaName: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }) => {
    return (
      <div className="case text-left flex flex-col gap-2">
        {delta?.map(deltaType => {
          return (
            <div className="param flex flex-col gap-2" key={deltaType.name}>
              <div className="paramName font-menlo">{deltaType.name} = </div>
              <TextArea
                className="paramValue font-menlo"
                autoSize
                value={deltaType.value}
                onChange={event => setDeltaValue(delta, deltaType.name, event)}
              ></TextArea>
            </div>
          );
        })}
      </div>
    );
  }
);

const FunctionName = () => {
  const [functionName, setFunctionName] = useFunctionName('');
  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setFunctionName(event.target.value);
    codeStore.setFunctionName(event.target.value);
  };
  return (
    <div className="functionName flex items-center gap-2 min-w-48">
      <div className="font-menlo text-nowrap">入口函数名</div>
      <Input className="font-menlo" value={functionName} maxLength={20} onChange={handleChange}></Input>
    </div>
  );
};

const TestCase: FC = observer(() => {
  console.log('render');
  let newAddActiveKey = useRef(generateUUID());
  const onEdit = (targetKey: TargetKey, action: Action) => {
    switch (action) {
      case 'add':
        newAddActiveKey.current = generateUUID();
        const newTestCaseDelta = structuredClone(codeStore.testCases[codeStore.testCases.length - 1]);
        codeStore.addTestCases(newTestCaseDelta);
        codeStore.addTab({
          key: newAddActiveKey.current,
          name: `Case ${codeStore.testCases.length}`,
          children: (
            <CaseDetail
              delta={codeStore.testCases[codeStore.testCases.length - 1]}
              setDeltaValue={codeStore.updateTestCases}
            ></CaseDetail>
          )
        });
        codeStore.setActiveTabKey(newAddActiveKey.current);
        break;
      case 'remove':
        let newActiveKey = codeStore.activeTabKey;
        let lastIndex = -1;
        codeStore.tabs?.forEach((tab, i) => {
          if (tab.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const newTabs = codeStore.tabs?.filter(tab => tab.key !== targetKey) || [];
        if (newTabs.length && newActiveKey === targetKey) {
          if (lastIndex >= 0) {
            newActiveKey = newTabs[lastIndex].key;
          } else {
            newActiveKey = newTabs[0].key;
          }
        }
        codeStore.setActiveTabKey(newActiveKey || '');
        codeStore.deleteTab(targetKey);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="px-4 py-3">
        {!codeStore.tabs?.length || !codeStore.testCases?.length ? (
          <Skeleton active></Skeleton>
        ) : (
          <MyTab
            needAdd={true}
            needDelete={true}
            tabs={codeStore.tabs}
            onEdit={onEdit}
            activeKey={codeStore.activeTabKey}
            maxTabCount={8}
            onChange={tab => codeStore.setActiveTabKey(tab.key)}
            pannelRight={<FunctionName />}
          ></MyTab>
        )}
      </div>
    </>
  );
});

export default TestCase;
