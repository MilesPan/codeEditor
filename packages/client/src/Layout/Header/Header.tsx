import { FC } from 'react';
import LogoLight from '@SVG/logo.light.svg';
import LogoDark from '@SVG/logo.dark.svg';
import './Header.css';
import { useTheme } from '../../components/ThemeProvider';
import ThemeToggle from './ThemeToggle';
import Avatar from './Avatar';
import Operations from './Operations';
import { useParams } from 'react-router-dom';
const Header: FC = () => {
  const { resolvedTheme } = useTheme();

  const { roomId } = useParams()
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
              <div className="font-typo cursor-pointer text-sm bg-[--plusBgColor] text-[--plusFontColor] py-2.5 px-3 rounded-lg hover:bg-[--plusBgColor__hover]">
                Plus 会员
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
