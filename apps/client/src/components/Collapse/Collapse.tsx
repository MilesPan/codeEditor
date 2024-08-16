import { ChevronDown, LucideProps } from 'lucide-react';
import {
  cloneElement,
  FC,
  ForwardRefExoticComponent,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';

const Collapse: FC<{
  children?: ReactNode;
  TitleIcon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>;
  titleContent: string;
  initStatus?: boolean;
}> = ({ children, TitleIcon, titleContent, initStatus = false }) => {
  const [maxHeight, setMaxHeight] = useState('0px');
  const [status, setStatus] = useState(initStatus);
  const contentRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLElement>(null);
  const clonedChild = isValidElement(children) ? cloneElement<any>(children, { ref: childrenRef }) : children;
  const handleChangeStatus = () => {
    setStatus(!status);
  };

  useEffect(() => {
    const updateMaxHeight = () => {
      if (childrenRef.current) {
        const styles = getComputedStyle(childrenRef.current, 'margin-top');
        const margin = parseInt(styles.marginTop) + parseInt(styles.marginBottom);
        setMaxHeight(`${(childrenRef.current?.scrollHeight || 0) + margin}px`);
      }
    };
    if (status) {
      updateMaxHeight();
    } else {
      setMaxHeight('0px');
    }

    const observer = new ResizeObserver(() => {
      if (status) {
        updateMaxHeight();
      }
    });
    if (childrenRef.current) {
      observer.observe(childrenRef.current, { box: 'border-box' });
    }
    return () => {
      observer.disconnect();
    };
  }, [status]);

  return (
    <>
      <section className="flex justify-between cursor-pointer" onClick={handleChangeStatus}>
        <div className="title flex items-center">
          <span className="flex gap-2 text-sm items-center">
            <TitleIcon size={16} />
            <span>{titleContent}</span>
          </span>
        </div>
        <div className="arrow">
          <ChevronDown
            className={`transition-transform ${status ? 'rotate-180' : 'rotate-0'}`}
            color="var(--light-gray-30)"
            style={{ transitionDuration: '0.5s' }}
          />
        </div>
      </section>
      <div
        ref={contentRef}
        className={`transition-[height] overflow-hidden`}
        style={{
          height: maxHeight,
          transitionDuration: '0.5s'
        }}
      >
        {clonedChild}
      </div>
    </>
  );
};
export default Collapse;
