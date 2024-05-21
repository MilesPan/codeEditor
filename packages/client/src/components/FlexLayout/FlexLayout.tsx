import { Layout,  Model, Action, Actions, IJsonTabNode } from 'flexlayout-react';
import {  useState } from 'react';
import Layout_Model from './model';

import './FlexLayout.css'
import { contentFactory, titleFactory } from './factory';
const FlexLayout = () => {
  const [model, setModel] = useState(Model.fromJson(Layout_Model));
  
  const onAction = (action: Action) => {
    console.log('onAction', action);
    if (action.type === 'FlexLayout_DeleteTab') {
      let borders = [...model.toJson().borders!];
      borders[0]?.children.push(model.getNodeById(action.data.node)?.toJson() as IJsonTabNode);
      console.log(model.getNodeById(action.data.node)?.toJson());
      model.doAction(Actions.deleteTab(action.data.node));
      var newmodel = { ...model.toJson(), borders };
      console.log('model', newmodel);
      setModel(Model?.fromJson(newmodel));
    } else {
      return action;
    }
  };

  return (
    <>
      <Layout
        model={model}
        titleFactory={titleFactory.bind(this)}
        factory={contentFactory.bind(this)}
        onAction={onAction.bind(this)}
        realtimeResize={true}
      ></Layout>
    </>
  );
};

export default FlexLayout;
