// TabContext.tsx
import { Model, Node, TabNode } from 'flexlayout-react';
import React, { createContext, useContext, useState } from 'react';

interface TabContextProps {
  model: Model | null;
  setModel: React.Dispatch<React.SetStateAction<Model | null>>;
  activateTab: (tabId: string) => void;
  setActivateTab: React.Dispatch<React.SetStateAction<(tabId: string) => void>>;
  findTabNodeByName: (node: Node | null | undefined, name: string) => TabNode | null;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

const TabProvider: any = ({ children }: { children: any }) => {
  const [activateTab, setActivateTab] = useState<(tabId: string) => void>(() => () => {});
  const [model, setModel] = useState<Model | null>(null);

  const findTabNodeByName = (node: Node | null | undefined, name: string): TabNode | null => {
    if (node instanceof TabNode && node.getName() === name) {
      return node;
    }
    if (node?.getChildren()?.length) {
      for (let child of node.getChildren()) {
        const result = findTabNodeByName(child, name);
        if (result) return result;
      }
    }
    return null;
  };

  const value = { activateTab, setActivateTab, model, setModel, findTabNodeByName };

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
