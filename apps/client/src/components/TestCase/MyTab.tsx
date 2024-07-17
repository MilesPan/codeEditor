import { CircleX, Plus } from 'lucide-react';
import { memo, useRef } from 'react';
import cs from 'classnames';
import './MyTab.css';
import { useHover } from 'ahooks';

type MyTabProps = {
  activeKey: number | string;
  tabs: MyTabItemType[];
  onChange?: (tab: MyTabItemType) => void;
  onEdit?: (targetKey: TargetKey, action: Action) => void;
};
export type Action = 'add' | 'remove';
export type TargetKey = React.MouseEvent | React.KeyboardEvent | string | number;
type MyTabPanelProps = {
  isActive: boolean;
  tabs: MyTabItemType[];
  tab: MyTabItemType;
  index: number;
  onChange?: (tab: MyTabItemType) => void;
  onEdit?: (targetKey: TargetKey, action: Action) => void;
};
const ADDTAB: MyTabItemType = {
  key: '**_ADDTAB_**',
  name: 'add'
};
const MyTab = memo(({ tabs, activeKey, onEdit, onChange }: MyTabProps) => {
  const selfTabs = tabs.concat(ADDTAB);
  console.log(JSON.stringify(activeKey), JSON.stringify(tabs))
  return (
    <>
      <div className="container flex gap-2 items-center">
        {selfTabs.map((tab, index) => {
          return (
            <MyTabPanel
              key={tab.key}
              tabs={tabs}
              tab={tab}
              index={index}
              onEdit={onEdit}
              isActive={tab.key === activeKey}
              onChange={onChange}
            ></MyTabPanel>
          );
        })}
      </div>
    </>
  );
});

const MyTabPanel = ({ tab, index, tabs, isActive, onEdit, onChange }: MyTabPanelProps) => {
  const panelRef = useRef(null);
  const isHovering = useHover(panelRef);
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
        <div onClick={() => onEdit?.(ADDTAB.key, 'add')}>
          <Plus size={14} className="cursor-pointer opacity-70 hover:opacity-40"></Plus>
        </div>
      )}
    </>
  );
};
export type MyTabItemType = {
  key: number | string;
  name: string;
};
export default MyTab;
