import { useHover } from 'ahooks';
import cs from 'classnames';
import { GripVertical } from 'lucide-react';
import {
  cloneElement,
  FC,
  isValidElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

export const DragWrapper: FC<{
  children: ReactNode | ReactElement;
  initPosition?: { left: number; top: number };
}> = ({ children, initPosition }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ left: initPosition?.left ?? 0, top: initPosition?.top ?? 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [microRect, setMicroRect] = useState({ width: 0, height: 0 });
  const childrenRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperHover = useHover(wrapperRef);
  const onMouseDown: MouseEventHandler<SVGSVGElement> = e => {
    e.preventDefault();
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.left,
      y: e.clientY - position.top
    });
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        let newX = e.clientX - startPos.x;
        let newY = e.clientY - startPos.y;
        // 获取屏幕宽度和高度
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // 计算内容区域宽度（不包括滚动条）
        const contentWidth = document.documentElement.clientWidth;

        // 计算滚动条宽度
        const scrollbarWidth = screenWidth - contentWidth;
        // 获取Micro组件的宽度和高度（这里是固定值，如果是动态的，需要相应调整）

        // 防止Micro组件左边界超出屏幕
        newX = Math.max(newX, 0);

        // 防止Micro组件上边界超出屏幕
        newY = Math.max(newY, 0);

        // 防止Micro组件右边界超出屏幕
        newX = Math.min(newX, screenWidth - microRect.width - scrollbarWidth);

        // 防止Micro组件下边界超出屏幕
        newY = Math.min(newY, screenHeight - microRect.height - scrollbarWidth);

        setPosition({
          left: newX,
          top: newY
        });
      }
    },
    [isDragging, position]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, [isDragging, position]);

  useEffect(() => {
    if (childrenRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          setMicroRect({ width, height });
        }
      });

      resizeObserver.observe(childrenRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [children]);
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  const clonedChild = isValidElement(children)
    ? cloneElement<any>(
        children,
        { ref: childrenRef },
        <GripVertical
          onMouseDown={onMouseDown}
          className={cs(
            'cursor-move absolute left-1 top-1/2 -translate-y-1/2',
            isDragging || wrapperHover ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-200'
          )}
          size={16}
        />
      )
    : children;
  return (
    <>
      <div
        ref={wrapperRef}
        className="dragWrapper  w-fit h-fit fixed"
        style={{ left: `${position.left}px`, top: `${position.top}px` }}
      >
        {clonedChild}
      </div>
    </>
  );
};
