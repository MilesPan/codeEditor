import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Popover, Tooltip } from 'antd';
import LanguageSelector, { languages } from './LanguageSelector';
import { Language } from '@Request/index';
import { ChevronDown, Maximize2, Menu, Minimize2, RotateCcw } from 'lucide-react';
import useFullscreen from '@/hooks/useFullscreen';

import Editor, { OnMount } from '@monaco-editor/react';
import './Monaco.css';

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { randomRgb } from '@/utils';
import { CodeStore, UserStore } from '@/store';
import { Awareness } from 'y-protocols/awareness.js';
import { observer } from 'mobx-react-lite';
import { throttle } from 'lodash-es';

const ydoc = new Y.Doc();
const yMap = ydoc.getMap<Language>('settings');

const CodeEditor: FC = memo(
  observer(() => {
    const { resolvedTheme } = useTheme();
    const [curLanguage, setCurLanguage] = useState<Language>(languages[0].value);
    const [curCode, setCurCode] = useState(languages[0].defaultCode);

    const [showLangSelector, setShowLangSelector] = useState(false);
    // 改变语言事件
    const handleLanguageChange = useCallback((languageType: Language) => {
      setCurLanguage(languageType);
      setShowLangSelector(false);
      CodeStore.setCodeType(languageType);

      setCurCode(languages.find(lang => lang.value === languageType)?.defaultCode || '');
      yMap.set('language', languageType);
    }, []);

    const awarenessRef = useRef<Awareness>();
    const providerRef = useRef<WebsocketProvider>();

    const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
    useEffect(() => {
      return () => {
        awarenessRef.current?.destroy();
      };
    }, []);

    function setUsers(states: Map<any, any>) {
      UserStore.setUsers(Array.from(states.values()).map(state => state.user));
    }

    const handleEditorDidMount: OnMount = (editor, monaco) => {
      CodeStore.setEditorRef(editor);
      editorRef.current = editor;
      const provider = new WebsocketProvider(`ws://localhost:3000/?room=${UserStore.userInfo.roomId}`, '', ydoc);
      const awareness = provider.awareness;
      awarenessRef.current = awareness;

      // 语言协同
      yMap.set('language', curLanguage);
      yMap.observe(event => {
        const newLanguage = yMap.get('language') as Language;
        setCurLanguage(newLanguage);
      });

      const curUser = { name: UserStore.userInfo.userName, clientId: awareness.clientID, color: randomRgb() };
      awareness.setLocalStateField('user', curUser);
      const states = awareness.getStates();
      setUsers(states);
      const throttledAddTooltip = throttle(addUserNameToCursors, 400);
      throttledAddTooltip(states);
      awareness.on('change', (changes: any, ...args: any[]) => {
        const states = awareness.getStates();
        setUsers(states);
        throttledAddTooltip(states);
      });
      function addUserNameToCursors(states: Map<number, any>) {
        const cursorElements = document.querySelectorAll('.yRemoteSelectionHead');

        cursorElements.forEach(cursorElement => {
          const elementUserId = cursorElement.className.split('-').pop();
          const state = states.get(Number(elementUserId));
          if (state && state.user) {
            const user = state.user;
            const username = user.name;
            genUserTooltip(cursorElement, username);
          }
        });
      }

      new MonacoBinding(ydoc.getText('monaco'), editor.getModel()!, new Set([editor]), awareness);
      editor.onDidChangeCursorPosition(event => {
        const position = event.position;

        // 更新本地光标位置到awareness
        awareness.setLocalStateField('cursor', {
          position: { line: position.lineNumber, column: position.column }
        });
      });
      editor.onDidChangeCursorSelection((event: any) => {});
    };

    // 格式化
    const formatCode = () => {
      if (editorRef.current) {
        editorRef.current.getAction('editor.action.formatDocument')?.run();
      }
    };
    // 还原模板
    const resetCode = () => {
      const defaultCode = languages.find(lang => lang.value === curLanguage)?.defaultCode || '';
      setCurCode(defaultCode);
      if (editorRef.current) editorRef.current.setValue(defaultCode);
    };
    // 全屏
    const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen();
    return (
      <>
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
                  {isFullscreen ? (
                    <Minimize2 size={14} onClick={() => exitFullscreen()}></Minimize2>
                  ) : (
                    <Maximize2 size={14} onClick={() => requestFullscreen(document.documentElement)}></Maximize2>
                  )}
                </Tooltip>
              </div>
            </div>
          </div>
          <Editor
            width="100%"
            height="100%"
            className="flex-1"
            language={curLanguage || ''}
            value={curCode}
            theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
            onMount={handleEditorDidMount}
          ></Editor>
        </div>
      </>
    );
  })
);

export default CodeEditor;
