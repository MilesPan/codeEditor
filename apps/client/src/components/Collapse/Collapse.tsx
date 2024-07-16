import { ChevronDown, LucideProps } from 'lucide-react';
import { FC, ForwardRefExoticComponent, ReactNode, RefAttributes, useEffect, useRef, useState } from 'react';

const Collapse: FC<{
  children?: ReactNode;
  TitleIcon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>;
  titleContent: string;
}> = ({ children, TitleIcon, titleContent }) => {
  const [status, setStatus] = useState(false);
  const [maxHeight, setMaxHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleChangeStatus = () => {
    setStatus(!status);
  };

  useEffect(() => {
    if (status) {
      setMaxHeight(`${contentRef.current!.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
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
        className="transition-[max-height] overflow-hidden"
        style={{
          maxHeight: maxHeight,
          transitionDuration: '0.5s'
        }}
      >
        {children}
      </div>
    </>
  );
};
export default Collapse;
