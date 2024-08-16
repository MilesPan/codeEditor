import { useCodeContext } from '@/contexts/CodeContext';
import { Skeleton } from 'antd';
import {
  cloneElement,
  FC,
  Fragment,
  isValidElement,
  memo,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import MyTab, { MyTabItemType } from '../TestCase/MyTab';
import { observer } from 'mobx-react-lite';
import { Copy, CopyCheck, Smile } from 'lucide-react';
import codeStore from '@/store/codeStore';
import styles from './TestResponse.module.css';
import { ParsedTestResponse } from '@Types/leetcode';
import { useHover } from 'ahooks';
import cs from 'classnames';
import { useCopy } from '@/hooks/useCopy';
const HoverWrapper: FC<{ children: ReactNode; text: string }> = ({ children, text }) => {
  const contentRef = useRef(null);
  const isHovering = useHover(contentRef);
  const [, copyText] = useCopy();
  const [copied, setCopied] = useState(false);
  return (
    <>
      <div className={cs('relative', styles.content)} ref={contentRef}>
        {children}
        {copied ? (
          <CopyCheck
            size={18}
            color="var(--logo_bg-green)"
            className={cs(`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer _hoverBtnLeft`)}
          />
        ) : (
          <Copy
            size={18}
            className={cs(
              `absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-0  _hoverBtnRight`,
              isHovering && 'opacity-100'
            )}
            onClick={() => {
              copyText(text);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1000);
            }}
          ></Copy>
        )}
      </div>
    </>
  );
};

const TestResponseDetail: FC<{ testResponse: ParsedTestResponse; index: number }> = ({ testResponse, index }) => {
  return (
    <div className="flex flex-col">
      <div className={styles.box}>
        <div className={styles.title}>输入</div>
        {/* testCases每一项参数应该都是一样的 这里直接取第一个即可 */}
        {codeStore.testCases[index].map(params => {
          return (
            <HoverWrapper key={params.name} text={params.value}>
              <div className="text-xs text-[--paramName-label-color]">{params.name}=</div>
              <div>{params.value}</div>
            </HoverWrapper>
          );
        })}
      </div>
      {Boolean(testResponse.consoleLogs?.length) && (
        <div className={styles.box}>
          <div className={styles.title}>标准输出</div>
          <HoverWrapper text={testResponse.consoleLogs.join('\n')}>{testResponse.consoleLogs.join('\n')}</HoverWrapper>
        </div>
      )}
      {Boolean(testResponse.results?.length) && (
        <div className={styles.box}>
          <div className={styles.title}>输出</div>
          <HoverWrapper text={testResponse.results.join('\n')}>{testResponse.results.join('\n')}</HoverWrapper>
        </div>
      )}
    </div>
  );
};

const TestResponse: FC = observer(() => {
  const { isRunning, execedCode } = useCodeContext();
  const [tabs, setTabs] = useState<MyTabItemType[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<string | number>();
  useEffect(() => {
    setTabs(
      () =>
        codeStore.testResponse?.map((testResponse, index) => {
          return {
            key: index,
            name: `Case ${index}`,
            pannel: (
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-[--bg-green-s]"></div>
                <span>Case {index + 1}</span>
              </div>
            ),
            children: <TestResponseDetail testResponse={testResponse} index={index}></TestResponseDetail>
          };
        }) || []
    );
  }, [codeStore.testResponse]);
  return (
    <>
      {
        <>
          {execedCode ? (
            <>
              <div className="p-5 h-full overflow-y-auto">
                <Skeleton active loading={isRunning}>
                  <div className="flex gap-3 items-center mb-4">
                    <Smile color="var(--logo_bg-green)" size={22}></Smile>
                    <span className="text-sm text-[--paramName-label-color]">
                      执行用时: {codeStore.testResponse?.[0].execTime}
                    </span>
                  </div>
                  <MyTab
                    tabs={tabs}
                    activeKey={activeTabKey || 0}
                    maxTabCount={8}
                    onChange={e => {
                      setActiveTabKey(e.key);
                    }}
                  ></MyTab>
                </Skeleton>
              </div>
            </>
          ) : (
            <div className="text-sm opacity-40 w-full h-full flex items-center justify-center">请先执行代码</div>
          )}
        </>
      }
    </>
  );
});
export default TestResponse;
