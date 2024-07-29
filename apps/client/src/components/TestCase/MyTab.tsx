import { CircleX, Plus } from 'lucide-react';
import {
  Fragment,
  ReactNode,
  useCallback,
  useRef} from 'react';
import cs from 'classnames';
import './MyTab.css';
import { useHover } from 'ahooks';
import { observer } from 'mobx-react-lite';

type MyTabProps = {
  activeKey: number | string | null;
  tabs: MyTabItemType[];
  maxTabCount?: number;
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
const MyTab = observer(({ tabs, activeKey, maxTabCount, onEdit, onChange }: MyTabProps) => {
  const selfTabs = tabs.concat(ADDTAB);
  return (
    <>
      <div className="container flex gap-2  flex-col">
        <div className="panels flex gap-2 items-center">
          {selfTabs.map((tab, index) => {
            return (
              <Fragment key={tab.key}>
                <MyTabPanel
                  tabs={tabs}
                  tab={tab}
                  maxTabCount={maxTabCount}
                  index={index}
                  onEdit={onEdit}
                  isActive={tab.key === activeKey}
                  onChange={onChange}
                ></MyTabPanel>
              </Fragment>
            );
          })}
        </div>
        <div className="children">{tabs.find(tab => tab.key === activeKey)?.children}</div>
      </div>
    </>
  );
});

const MyTabPanel = ({ tab, index, tabs, isActive, maxTabCount, onEdit, onChange }: MyTabPanelProps) => {
  const panelRef = useRef(null);
  const isHovering = useHover(panelRef);
  const onAdd = useCallback(() => {
    if (maxTabCount && tabs.length >= maxTabCount) return;
    onEdit?.(ADDTAB.key, 'add');
  }, [maxTabCount]);
  return (
    <>
      {tab.key !== ADDTAB.key ? (
        <div className={cs('tabPanel relative', { isActive })} ref={panelRef} onClick={() => onChange?.(tab)}>
          <div className="absolute -top-1 -right-1" onClickCapture={() => onEdit?.(tab.key, 'remove')}>
            {isHovering && tabs.length >= 2 && <CircleX size={12} className="_hoverBtn"></CircleX>}
          </div>
          {tab.name}
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
export type MyTabItemType = {
  key: number | string;
  name: string;
  children: ReactNode;
};

export default MyTab;
