import { CircleX, Plus } from 'lucide-react';
import { Fragment, ReactNode, useCallback, useRef } from 'react';
import cs from 'classnames';
import './MyTab.css';
import { useHover } from 'ahooks';
import { observer } from 'mobx-react-lite';

export type MyTabItemType = {
  key: number | string;
  name: string;
  pannel?: ReactNode;
  children: ReactNode;
};
type MyTabProps = {
  activeKey: number | string | null;
  tabs: MyTabItemType[];
  needDelete?: boolean;
  needAdd?: boolean;
  maxTabCount?: number;
  pannelRight?: ReactNode;
  onChange?: (tab: MyTabItemType) => void;
  onEdit?: (targetKey: TargetKey, action: Action) => void;
};
export type Action = 'add' | 'remove';
export type TargetKey = string | number;
type MyTabPanelProps = {
  isActive: boolean;
  tabs: MyTabItemType[];
  tab: MyTabItemType;
  index: number;
  tabPannel?: ReactNode;
  needDelete?: boolean;
  maxTabCount?: number;
  onChange?: (tab: MyTabItemType) => void;
  onEdit?: (targetKey: TargetKey, action: Action) => void;
};
``;
const ADDTAB: MyTabItemType = {
  key: '**_ADDTAB_**',
  name: 'add',
  children: <></>
};
const MyTab = observer(
  ({ tabs, activeKey, maxTabCount, needAdd, needDelete, pannelRight, onEdit, onChange }: MyTabProps) => {
    const selfTabs = needAdd ? tabs.concat(ADDTAB) : tabs;
    return (
      <>
        <div className="container flex gap-2  flex-col">
          <div className="panels flex gap-2 justify-between">
            <div className="pannelLeft flex gap-2 items-center">
              {selfTabs.map((tab, index) => {
                return (
                  <Fragment key={tab.key}>
                    <MyTabPannel
                      tabs={tabs}
                      tab={tab}
                      needDelete={needDelete}
                      maxTabCount={maxTabCount}
                      index={index}
                      tabPannel={tab.pannel}
                      onEdit={onEdit}
                      isActive={tab.key === activeKey}
                      onChange={onChange}
                    ></MyTabPannel>
                  </Fragment>
                );
              })}
            </div>
            <div className="pannelRight justify-self-end">{pannelRight}</div>
          </div>
          <div className="children">{tabs.find(tab => tab.key === activeKey)?.children}</div>
        </div>
      </>
    );
  }
);

const MyTabPannel = ({
  tab,
  index,
  tabs,
  isActive,
  maxTabCount,
  tabPannel,
  needDelete,
  onEdit,
  onChange
}: MyTabPanelProps) => {
  const pannelRef = useRef(null);
  const isHovering = useHover(pannelRef);
  const onAdd = useCallback(() => {
    if (maxTabCount && tabs.length >= maxTabCount) return;
    onEdit?.(ADDTAB.key, 'add');
  }, [maxTabCount]);
  return (
    <>
      {tab.key !== ADDTAB.key ? (
        <div
          className={cs('tabPanel relative text-nowrap', { isActive })}
          ref={pannelRef}
          onClick={() => onChange?.(tab)}
        >
          <div className="absolute -top-1 -right-1" onClickCapture={() => onEdit?.(tab.key, 'remove')}>
            {needDelete && isHovering && tabs.length >= 2 && <CircleX size={12} className="_hoverBtn"></CircleX>}
          </div>
          {tabPannel ? tabPannel : tab.name}
        </div>
      ) : (
        (!maxTabCount || tabs.length < maxTabCount) && (
          <div onClick={onAdd}>
            <Plus size={14} className="cursor-pointer opacity-70 hover:opacity-40"></Plus>
          </div>
        )
      )}
    </>
  );
};

export default MyTab;
