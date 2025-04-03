// TabContext.tsx
import { TABNAME } from '@/components/FlexLayout/model';
import { Actions, Model, Node, TabNode, TabSetNode } from 'flexlayout-react';
import React, { createContext, useContext, useState } from 'react';

interface TabContextProps {
  model: Model | null;
  setModel: React.Dispatch<React.SetStateAction<Model | null>>;
  activateTab: (tabId: string) => void;
  setActivateTab: React.Dispatch<React.SetStateAction<(tabId: string) => void>>;
  findTabNode: (node: Node | null | undefined, type: 'name' | 'id', name: TABNAME) => TabNode | TabSetNode | null;
  activeTab: (tabName: TABNAME) => void;
  deleteTab: (tabName: TABNAME) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

const TabProvider: any = ({ children }: { children: any }) => {
  const [activateTab, setActivateTab] = useState<(tabId: string) => void>(() => () => {});
  const [model, setModel] = useState<Model | null>(null);

  const findTabNode = (
    node: Node | null | undefined,
    type: 'name' | 'id',
    target: string
  ): TabNode | TabSetNode | null => {
    const isTabNode = node instanceof TabNode || node instanceof TabSetNode;
    if (isTabNode && (type === 'name' ? node.getName() === target : node.getId() === target)) {
      return node;
    }
    if (node?.getChildren()?.length) {
      for (const child of node.getChildren()) {
        const result = findTabNode(child, type, target);
        if (result) return result;
      }
    }
    return null;
  };

  const activeTab = (tabName: TABNAME) => {
    const tabNode = findTabNode(model?.getRoot(), 'name', tabName);
    if (tabNode) {
      activateTab(tabNode.getId());
    }
  };

  const deleteTab = (tabName: TABNAME) => {
    const tabNode = findTabNode(model?.getRoot(), 'name', tabName);
    if (tabNode) {
      model?.doAction(Actions.deleteTab(tabNode.getId()));
    }
  };

  const value = { activateTab, setActivateTab, model, setModel, findTabNode, activeTab, deleteTab };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};

export { TabProvider, useTabContext };
