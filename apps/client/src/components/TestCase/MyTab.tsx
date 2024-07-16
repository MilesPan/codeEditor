import { CircleX, Plus } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import './MyTab.css';
import { useHover } from 'ahooks';

type MyTabProps = {
  tabs: MyTabItemType[];
};
type MyTabPanelProps = {
  tab: MyTabItemType;
  index: number;
};
const ADDTAB: MyTabItemType = {
  id: '**_ADDTAB_**',
  name: 'add'
};
const MyTab = ({ tabs }: MyTabProps) => {
  const selfTabs = useMemo(() => {
    return tabs.concat(ADDTAB);
  }, tabs);
  return (
    <>
      <div className="container flex gap-2 items-center">
        {selfTabs.map((tab, index) => {
          return <MyTabPanel key={tab.id} tab={tab} index={index}></MyTabPanel>;
        })}
      </div>
    </>
  );
};

const MyTabPanel = ({ tab, index }: MyTabPanelProps) => {
  return (
    <>
      {tab.id !== ADDTAB.id ? (
        <div className="tabPanel relative">
          <div className="absolute top-0 right-0">{<CircleX size={12}></CircleX>}</div>
          {tab.name}
        </div>
      ) : (
        <div>
          <Plus size={14} className="cursor-pointer opacity-70 hover:opacity-40"></Plus>
        </div>
      )}
    </>
  );
};
export type MyTabItemType = {
  id: number | string;
  name: string;
};
export default MyTab;
