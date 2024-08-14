import { type OnMount, Monaco } from '@monaco-editor/react';
import { MutableRefObject } from 'react';
type MyEditor = Parameters<OnMount>[0];
export function initBreakPoints(
  editor: MyEditor,
  breakPoints: Set<number>,
  lastLineNumber: MutableRefObject<number | undefined>,
  monaco: Monaco
) {
  // 点击效果
  editor.onMouseDown(event => {
    if (event.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
      const lineNumber = event.target.position.lineNumber;
      if (breakPoints.has(lineNumber)) {
        breakPoints.delete(lineNumber);
        const decorations = editor.getLineDecorations(lineNumber);
        editor.removeDecorations(decorations?.map(d => d.id) || []);
      } else {
        breakPoints.add(lineNumber);
        editor.createDecorationsCollection([
          {
            range: {
              startLineNumber: lineNumber,
              startColumn: 1,
              endLineNumber: lineNumber,
              endColumn: 1
            },
            options: {
              hoverMessage: { value: '添加断点' },
              glyphMarginClassName: 'breakpoint-glyph'
            }
          }
        ]);
      }
    }
  });
  // 悬浮效果
  editor.onMouseMove(event => {
    const lineNumber = event.target.position?.lineNumber;
    if (!lineNumber) return;
    if (!breakPoints.has(lineNumber) && event.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
      if (lastLineNumber.current && lastLineNumber.current !== lineNumber && !breakPoints.has(lastLineNumber.current)) {
        editor.removeDecorations(editor.getLineDecorations(lastLineNumber.current!)?.map(d => d.id) || []);
      }
      lastLineNumber.current = lineNumber;
      editor.createDecorationsCollection([
        {
          range: {
            startLineNumber: lineNumber!,
            startColumn: 1,
            endLineNumber: lineNumber!,
            endColumn: 1
          },
          options: {
            hoverMessage: { value: '添加断点' },
            glyphMarginClassName: 'breakpoint-glyph'
          }
        }
      ]);
    } else {
      if (!breakPoints.has(lineNumber))
        editor.removeDecorations(editor.getLineDecorations(lineNumber!)?.map(d => d.id) || []);
      if (!breakPoints.has(lastLineNumber.current ?? Infinity))
        editor.removeDecorations(editor.getLineDecorations(lastLineNumber.current!)?.map(d => d.id) || []);
    }
  });
}
