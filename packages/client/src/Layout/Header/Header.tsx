import { FC } from 'react';
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
import { CircleX } from 'lucide-react';
import { userLeaveRoomReq } from '@Request/room';
import { message } from 'antd';
const Header: FC = () => {
  const { resolvedTheme } = useTheme();

  const { roomId } = useParams();
  console.log(UserStore.userInfo.roomId, UserStore.userInfo.userName);
  const { runAsync: runUserLeaveRoomReq } = useRequest(userLeaveRoomReq, { manual: true });
  const navigate = useNavigate();
  const leaveRoom = async () => {
    await runUserLeaveRoomReq(UserStore.userInfo.roomId, UserStore.userInfo.userName);
    message.success('退出成功');
    navigate('/joinRoom');
  };
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
          <li className="h-[16px] w-[1px] bg-[--logo-bg] ml-2"></li>
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
    </>
  );
};

export default Header;
