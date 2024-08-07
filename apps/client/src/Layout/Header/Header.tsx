import { FC, useState } from 'react';
import LogoLight from '@SVG/logo.light.svg';
import LogoDark from '@SVG/logo.dark.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';

import { UserStore } from '@/store';
import './Header.css';
import { useTheme } from '@/components/ThemeProvider';
import ThemeToggle from './ThemeToggle';
import Avatar from './Avatar';
import Operations from './Operations';
import { CircleX, Menu } from 'lucide-react';
import { userLeaveRoomReq } from '@Request/room';
import { message } from 'antd';
import QuestionDrawer from '@/components/QuestionDrawer/QuestionDrawer';
import userStore from '@/store/userStore';
import { observer } from 'mobx-react-lite';
const Header: FC = observer(() => {
  const { resolvedTheme } = useTheme();

  const { roomId } = useParams();
  const { runAsync: runUserLeaveRoomReq } = useRequest(userLeaveRoomReq, { manual: true });
  const navigate = useNavigate();
  const leaveRoom = async () => {
    await runUserLeaveRoomReq(UserStore.userInfo.roomId, UserStore.userInfo.userName);
    message.success('退出成功');
    navigate('/joinRoom');
  };

  const [drawerStatus, setDrawerStatus] = useState(false);
  const openDrawer = () => setDrawerStatus(true);
  const closeDrawer = () => setDrawerStatus(false);
  return (
    <>
      <header className="relative flex items-center justify-between py-2 px-4 h-14">
        {roomId && (
          <section className="center absolute left-1/2 -translate-x-1/2">
            <Operations />
          </section>
        )}
        <div className="left flex items-center pl-2">
          <img src={resolvedTheme === 'dark' ? LogoDark : LogoLight} className="w-7" />
          {userStore.hasUserInfo && (
            <li className="flex h-[16px] ml-2">
              <div className="flex items-center gap-1 _hoverBtnRight" onClick={openDrawer}>
                <Menu />
                题库
              </div>
            </li>
          )}
        </div>
        <div className="right flex items-center gap-2">
          <ThemeToggle />
          {roomId && (
            <>
              <Avatar />
              <div
                className="flex items-center  gap-1 font-typo cursor-pointer text-sm bg-[--plusBgColor] text-[--plusFontColor] py-2.5 px-3 rounded-lg hover:bg-[--plusBgColor__hover]"
                onClick={leaveRoom}
              >
                <span>退出</span>
                <CircleX size={16}></CircleX>
              </div>
            </>
          )}
        </div>
      </header>
      <QuestionDrawer drawerStatus={drawerStatus} openDrawer={openDrawer} closeDrawer={closeDrawer} />
    </>
  );
});

export default Header;
