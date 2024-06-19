import { FC, memo, useCallback, useRef, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Popover, Tooltip } from 'antd';
import LanguageSelector, { languages } from './LanguageSelector';
import { ChevronDown, Maximize2, Menu, Minimize2, RotateCcw, Turtle } from 'lucide-react';
import useFullscreen from '@/hooks/useFullscreen';

import Editor, { BeforeMount, Monaco, OnMount } from '@monaco-editor/react';
import './Monaco.css';

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { randomRgb, randomId } from '@/utils';
import { UserStore } from '@/store';
const ydoc = new Y.Doc();
const yMap = ydoc.getMap('settings');

const CodeEditor: FC = memo(() => {
  const { resolvedTheme } = useTheme();
  const [curLanguage, setCurLanguage] = useState(languages[0].name);
  const [curCode, setCurCode] = useState(languages[0].defaultCode);
  const [showLangSelector, setShowLangSelector] = useState(false);
  // 改变语言事件
  const handleLanguageChange = useCallback((languageName: string) => {
    setCurLanguage(languageName);
    setShowLangSelector(false);
    setCurCode(languages.find(lang => lang.name === languageName)?.defaultCode || '');
    yMap.set('language', languageName);
  }, []);

  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // 语言协同
    yMap.set('language', curLanguage);
    yMap.observe(event => {
      const newLanguage = yMap.get('language') as string;
      setCurLanguage(newLanguage);
    });

    const provider = new WebsocketProvider(`ws://localhost:3000/?room=${UserStore.userInfo.roomId}`, '', ydoc);
    console.log(provider);
    const awareness = provider.awareness;

    const curUser = { name: UserStore.userInfo.userName, clientId: UserStore.userInfo.userName, color: randomRgb() };
    awareness.setLocalStateField('user', curUser);
    let decorations: any = [];
    let tooltipContainers: { [key: string]: HTMLDivElement } = {};

    awareness.on('change', (changes: any) => {
      // 清除旧的 tooltip
      Object.values(tooltipContainers).forEach(container => {
        container.remove();
      });
      tooltipContainers = {};

      editor.deltaDecorations(decorations, []);
      decorations = [];

      const states = awareness.getStates();
      states.forEach((state, clientId) => {
        if (state.cursor) {
          const user = state.user as typeof curUser;
          console.log(clientId);
          const { position } = state.cursor;
          if (user) {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-hover-message';
            tooltip.innerText = `User: ${user.name}`;
            document.body.appendChild(tooltip);

            tooltipContainers[clientId] = tooltip;

            decorations.push(
              editor.deltaDecorations(
                [],
                [
                  {
                    range: new monaco.Range(position.line, position.column, position.line, position.column + 1),
                    options: {
                      stickiness: 3,
                      className: 'remote-cursor',
                      // hoverMessage: { value: `User: ${user.name} 🖊` },
                      hoverMessage: null,
                      beforeContentClassName: 'remote-cursor-marker'
                    }
                  }
                ]
              )[0]
            );
          }

          const style = document.createElement('style');
          style.innerHTML = `
          .yRemoteSelection-${clientId} {
            background-color: ${user.color};
          }
          .yRemoteSelectionHead-${clientId} {
            position: absolute;
            border-left: ${user.color} solid 2px;
            border-top: ${user.color} solid 2px;
            border-bottom: ${user.color} solid 2px;
            height: 100%;
            box-sizing: border-box;
          }
          `;
          document.head.appendChild(style);
        }
      });
    });
    new MonacoBinding(ydoc.getText('monaco'), editor.getModel()!, new Set([editor]), awareness);
    let isShowUsers = false;
    editor.onMouseMove(event => {
      const position = event.target.position;
      if (position && event.target.element?.className.includes('yRemoteSelectionHead')) {
        if (isShowUsers) return;
        isShowUsers = true;
        let offset = 0;
        Object.values(tooltipContainers).forEach(container => {
          container.style.top = `${event.event.posy + offset}px`;
          container.style.left = `${event.event.posx}px`;
          container.style.display = 'unset';
          container.classList.add('visible');
          offset += container.offsetHeight + 2; // 间隔5px
        });
      } else {
        isShowUsers = false;
        Object.values(tooltipContainers).forEach(container => {
          if (container.classList.contains('visible')) {
            container.classList.remove('visible');
            setTimeout(() => {
              container.style.display = 'none';
            }, 400);
          }
        });
      }
    });
    editor.onDidChangeCursorPosition(event => {
      const position = event.position;
      const color = randomRgb();

      // 更新本地光标位置到awareness
      awareness.setLocalStateField('cursor', {
        position: { line: position.lineNumber, column: position.column },
        color: color
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
    const defaultCode = languages.find(lang => lang.name === curLanguage)?.defaultCode || '';
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
                  {curLanguage}
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
          language={languages.find(lang => lang.name === curLanguage)?.value || ''}
          value={curCode}
          theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
          onMount={handleEditorDidMount}
        ></Editor>
      </div>
    </>
  );
});

export default CodeEditor;
