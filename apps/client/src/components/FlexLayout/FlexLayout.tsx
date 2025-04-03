import { Layout, Model, Action, Actions, IJsonTabNode } from 'flexlayout-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import Layout_Model from './model';

import './FlexLayout.css';
import { contentFactory, titleFactory } from './factory';
import { useTabContext } from '@/contexts/TabContext';
const FlexLayout = memo(() => {
  const [model, setModel] = useState(Model.fromJson(Layout_Model));
  const layoutRef = useRef<any>(null);
  const { setActivateTab, setModel: setContextModel } = useTabContext();
  const handleActiveTab = (tabId: string) => {
    const action = Actions.selectTab(tabId);
    layoutRef.current!.doAction(action);
  };
  useEffect(() => {
    setActivateTab(() => handleActiveTab);
    setContextModel(model);
  }, []);
  const onAction = useCallback((action: Action) => {
    // console.log('onAction', action);
    if (action.type === 'FlexLayout_DeleteTab') {
      const borders = [...model.toJson().borders!];
      borders[0]?.children.push(model.getNodeById(action.data.node)?.toJson() as IJsonTabNode);
      model.doAction(Actions.deleteTab(action.data.node));
      const newmodel = { ...model.toJson(), borders };
      setModel(Model?.fromJson(newmodel));
    } else {
      return action;
    }
  }, []);

  return (
    <>
      <Layout
        ref={layoutRef}
        model={model}
        titleFactory={titleFactory.bind(this)}
        factory={useCallback(contentFactory.bind(this), [])}
        onAction={onAction.bind(this)}
        realtimeResize={true}
      ></Layout>
    </>
  );
});

export default FlexLayout;
