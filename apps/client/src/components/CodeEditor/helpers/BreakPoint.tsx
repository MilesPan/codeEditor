import debugStore from '@/store/debugStore';
import { type OnMount, Monaco } from '@monaco-editor/react';
import { NotificationInstance } from 'antd/es/notification/interface';
import { MutableRefObject } from 'react';
type MyEditor = Parameters<OnMount>[0];

const tempBreakPointIds = new Set<string>(); // hover时创建的断点 的id集合
const breakPointIds = new Set<string>(); // 点击后创建的断点 的id集合
export function initBreakPoints(
  editor: MyEditor,
  breakPoints: Set<number>,
  lastLineNumber: MutableRefObject<number | undefined>,
  monaco: Monaco,
  notificationApi: NotificationInstance
) {
  // 点击效果
  editor.onMouseDown(event => {
    if (event.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
      const lineNumber = event.target.position.lineNumber;
      if (breakPoints.has(lineNumber)) {
        breakPoints.delete(lineNumber);
        removeBreakPointDecorations(lineNumber, editor, breakPointIds);
      } else {
        breakPoints.add(lineNumber);
        const breakPointDecorations = editor.createDecorationsCollection([
          {
            range: {
              startLineNumber: lineNumber,
              startColumn: 0,
              endLineNumber: lineNumber,
              endColumn: 0
            },
            options: {
              hoverMessage: { value: '添加断点' },
              glyphMarginClassName: 'breakpoint-glyph'
            }
          }
        ]);
        addDecorationsToSet(editor, breakPointIds, breakPointDecorations);
      }
      if (debugStore.isDebugging) {
        notificationApi.warning({
          message: '断点已变更，请重新调试'
        });
        setTimeout(() => {
          debugStore.closeDebug();
        }, 1000);
      }
    }
  });
  // 悬浮效果
  editor.onMouseMove(event => {
    const lineNumber = event.target.position?.lineNumber;
    if (!lineNumber) return;
    if (!breakPoints.has(lineNumber) && event.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
      if (lastLineNumber.current && lastLineNumber.current !== lineNumber && !breakPoints.has(lastLineNumber.current)) {
        removeBreakPointDecorations(lastLineNumber.current!, editor, tempBreakPointIds);
      }
      lastLineNumber.current = lineNumber;
      const tempBreakPointDecorations = editor.createDecorationsCollection([
        {
          range: {
            startLineNumber: lineNumber!,
            startColumn: 0,
            endLineNumber: lineNumber!,
            endColumn: 0
          },
          options: {
            hoverMessage: { value: '添加断点' },
            glyphMarginClassName: 'breakpoint-glyph'
          }
        }
      ]);
      addDecorationsToSet(editor, tempBreakPointIds, tempBreakPointDecorations);
    } else {
      if (!breakPoints.has(lineNumber)) removeBreakPointDecorations(lineNumber!, editor, tempBreakPointIds);
      if (!breakPoints.has(lastLineNumber.current ?? Infinity))
        removeBreakPointDecorations(lastLineNumber.current!, editor, tempBreakPointIds);
    }
  });
}

function addDecorationsToSet(
  editor: MyEditor,
  targetSet: Set<string>,
  decorations: ReturnType<MyEditor['createDecorationsCollection']>
) {
  (decorations as unknown as { _decorationIds: string[] })._decorationIds.map(id => targetSet.add(id));
}
function removeBreakPointDecorations(lineNumber: number, editor: MyEditor, pointSet: Set<string>) {
  const decorations = editor.getLineDecorations(lineNumber!);
  const existedIds = decorations?.filter(d => pointSet.has(d.id)).map(d => d.id);
  existedIds?.forEach(id => pointSet.delete(id));
  editor.removeDecorations(existedIds || []);
}

// 存高亮行DecorationIds
const HighlightLineSet = new Set<string>();
export function setHighlightLine(editor: MyEditor, lineNumber: number, monaco: Monaco) {
  clearHighlightLine(editor);
  const decorations = editor.createDecorationsCollection([
    {
      range: new monaco.Range(lineNumber, 0, lineNumber, 0),
      options: {
        className: 'myLineHighlight',
        marginClassName: 'myLineHighlight',
        isWholeLine: true
      }
    }
  ]);
  const range = decorations.getRange(0)!;
  const decoration = editor.getDecorationsInRange(range);
  // 获取第一个
  decoration?.forEach(d => HighlightLineSet.add(d.id));
  // console.log(editor.getContentHeight(), editor.getTopForLineNumber(lineNumber), editor.getScrollTop());
  return decorations;
}
export function clearHighlightLine(editor: MyEditor) {
  editor.removeDecorations(Array.from(HighlightLineSet));
  HighlightLineSet.clear();
}
