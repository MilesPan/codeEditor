import { FC, createContext, useContext, useState } from 'react';

interface CodeContextProps {
  execedCode: boolean;
  setExecedCode: React.Dispatch<React.SetStateAction<boolean>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CodeContext = createContext<CodeContextProps | null>(null);

const CodeProvider: FC<{ children: any }> = ({ children }: { children: any }) => {
  const [execedCode, setExecedCode] = useState(false);

  const [isRunning, setIsRunning] = useState(false);

  const value = { execedCode, setExecedCode, isRunning, setIsRunning };
  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};

const useCodeContext = () => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};

export { CodeProvider, useCodeContext };
