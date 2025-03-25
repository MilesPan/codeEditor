import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Popover, Tooltip, notification } from 'antd';
import LanguageSelector, { LanguageItemType, languages } from './LanguageSelector';
import { Language } from '@Request/index';
import { ChevronDown, Maximize2, Menu, Minimize2, RotateCcw } from 'lucide-react';

import Editor, { OnMount } from '@monaco-editor/react';
import '@/styles/Monaco.css';

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { randomRgb } from '@/utils';
import { CodeStore, UserStore } from '@/store';
import { Awareness } from 'y-protocols/awareness.js';
import { observer } from 'mobx-react-lite';
import { setUserToolTip } from './helpers/UserTooltip';
import { initBreakPoints } from './helpers/BreakPoint';
import debugStore from '@/store/debugStore';
import { useTabContext } from '@/contexts/TabContext';
import { Actions } from 'flexlayout-react';
import { TabName } from '../FlexLayout/model';
import { useToggle } from 'ahooks';
import useMessage from 'antd/es/message/useMessage';

const ydoc = new Y.Doc();
const yMap = ydoc.getMap<Language | undefined>('settings');

const initLanguage = languages[0];
const CodeEditor: FC = memo(
  observer(() => {
    const [notificationApi, NotificationHolder] = notification.useNotification();
    const { resolvedTheme } = useTheme();
    const [messageApi, ContextHolder] = useMessage();
    const [curLanguage, setCurLanguage] = useState<Language>(initLanguage.value);
    const [curCode, setCurCode] = useState<string>(initLanguage.defaultCode);
    useEffect(() => {
      CodeStore.setCodeType(curLanguage);
      setCurCode(languages.find(lang => lang.value === curLanguage)?.defaultCode || '');
      yMap.set('language', curLanguage);
    }, [curLanguage]);

    const [showLangSelector, setShowLangSelector] = useState(false);

    // 改变语言事件
    const handleLanguageChange = useCallback((language: LanguageItemType) => {
      if (language.isDisabled) return messageApi.warning('该语言暂未支持');
      setCurLanguage(language.value);
      setShowLangSelector(false);
    }, []);

    const awarenessRef = useRef<Awareness>();

    const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
    useEffect(() => {
      return () => {
        awarenessRef.current?.destroy();
      };
    }, []);

    const lastLineNumber = useRef<number>();
    const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
      CodeStore.setEditorRef(editor);
      CodeStore.setMonacoRef(monaco);
      editorRef.current = editor;

      function observer() {
        const newLanguage = yMap.get('language') as Language;
        setCurLanguage(newLanguage);
      }
      // 语言协同
      yMap.set('language', curLanguage);
      yMap.observe(observer);
      setCurLanguage(curLanguage);
      const provider = new WebsocketProvider(
        `ws://${process.env.PUBLIC_HOST}:3000/?room=${UserStore.userInfo.roomId}`,
        '',
        ydoc
      );
      const awareness = provider.awareness;
      awarenessRef.current = awareness;

      const curUser = { name: UserStore.userInfo.userName, clientId: awareness.clientID, color: randomRgb() };
      awareness.setLocalStateField('user', curUser);

      setUserToolTip(awareness);

      awareness.on('change', () => {
        setUserToolTip(awareness);
      });

      new MonacoBinding(ydoc.getText('monaco'), editor.getModel()!, new Set([editor]), awareness);
      editor.onDidChangeCursorPosition(event => {
        const position = event.position;

        // 更新本地光标位置到awareness
        awareness.setLocalStateField('cursor', {
          position: { line: position.lineNumber, column: position.column }
        });
      });

      // 断点相关
      initBreakPoints(editor, debugStore.breakPoints, lastLineNumber, monaco, notificationApi);
    }, []);
    const handleEditorChange = useCallback(() => {
      if (debugStore.isDebugging) {
        notificationApi.warning({
          message: '代码已变更，请重新调试'
        });
        setTimeout(() => {
          debugStore.closeDebug();
        }, 1000);
      }
    }, []);

    // 格式化
    const formatCode = () => {
      if (editorRef.current) {
        editorRef.current.getAction('editor.action.formatDocument')?.run();
      }
    };
    // 还原模板
    const resetCode = () => {
      setCurLanguage(initLanguage.value);
      if (editorRef.current) editorRef.current.setValue(initLanguage.defaultCode);
    };
    // 全屏
    const [maximizeStatus, { toggle: toggleMaximizeStatus }] = useToggle(false);
    const { model, findTabNode } = useTabContext();
    const toggleMaximize = () => {
      model?.doAction(
        Actions.maximizeToggle(findTabNode(model?.getRoot(), 'name', TabName.code)?.getParent()?.getId() || '')
      );
      toggleMaximizeStatus();
    };

    return (
      <>
        {ContextHolder && NotificationHolder}
        <div className="w-full h-full flex flex-col overflow-y-hidden">
          <div className="operators w-full h-8 py-1 flex items-center justify-between border-b border-b-[--tag-bg] mb-4">
            <div className="left flex items-center px-1">
              <div className="language">
                <Popover
                  content={
                    <LanguageSelector currentLanguage={curLanguage} onChange={handleLanguageChange}></LanguageSelector>
                  }
                  open={showLangSelector}
                  onOpenChange={status => setShowLangSelector(status)}
                  trigger="click"
                  placement="bottomLeft"
                  arrow={false}
                >
                  <div className="text-sm _hoverTag flex items-center gap-1  h-6 text-[--text-b1] cursor-pointer">
                    {languages.find(lang => lang.value === curLanguage)?.name}
                    <ChevronDown size={14}></ChevronDown>
                  </div>
                </Popover>
              </div>
            </div>
            <div className="right items-center flex gap-2 px-2">
              <div className="format cursor-pointer">
                <Tooltip title="代码格式化 Alt + Shift + F">
                  <Menu size={14} onClick={() => formatCode()}></Menu>
                </Tooltip>
              </div>
              <div className="reset cursor-pointer">
                <Tooltip title="还原默认模板">
                  <RotateCcw size={14} onClick={() => resetCode()}></RotateCcw>
                </Tooltip>
              </div>
              <div className="fullscreen cursor-pointer">
                <Tooltip title="全屏">
                  {maximizeStatus ? (
                    <Minimize2 size={14} onClick={toggleMaximize}></Minimize2>
                  ) : (
                    <Maximize2 size={14} onClick={toggleMaximize}></Maximize2>
                  )}
                </Tooltip>
              </div>
            </div>
          </div>
          <Editor
            width="100%"
            height="100%"
            className="flex-1"
            language={curLanguage}
            value={curCode}
            theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
            options={{ glyphMargin: true, lineNumbersMinChars: 3 }}
          ></Editor>
        </div>
      </>
    );
  })
);

export default CodeEditor;
