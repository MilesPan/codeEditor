import { type OnMount, Monaco } from '@monaco-editor/react';
import { MutableRefObject } from 'react';
type MyEditor = Parameters<OnMount>[0];
export function initBreakPoints(
  editor: MyEditor,
  breakPoints: MutableRefObject<Set<number | undefined>>,
  lastLineNumber: MutableRefObject<number | undefined>,
  monaco: Monaco
) {
  // 点击效果
  editor.onMouseDown(event => {
    if (event.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
      const lineNumber = event.target.position.lineNumber;
      if (breakPoints.current.has(lineNumber)) {
        breakPoints.current.delete(lineNumber);
        const decorations = editor.getLineDecorations(lineNumber);
        editor.removeDecorations(decorations?.map(d => d.id) || []);
      } else {
        breakPoints.current.add(lineNumber);
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
    if (
      !breakPoints.current.has(lineNumber) &&
      event.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN
    ) {
      if (lastLineNumber.current !== lineNumber && !breakPoints.current.has(lastLineNumber.current)) {
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
      if (!breakPoints.current.has(lineNumber))
        editor.removeDecorations(editor.getLineDecorations(lineNumber!)?.map(d => d.id) || []);
      if (!breakPoints.current.has(lastLineNumber.current))
        editor.removeDecorations(editor.getLineDecorations(lastLineNumber.current!)?.map(d => d.id) || []);
    }
  });
}
