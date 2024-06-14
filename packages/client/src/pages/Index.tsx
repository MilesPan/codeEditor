import { useTheme } from '@/components/ThemeProvider';
import { FC, useEffect, useState } from 'react';
import Logo from '@Assets/logo.png';
import DarkLogo from '@Assets/logo.gif';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import cs from 'classnames';

const Index: FC = () => {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === 'light' ? Logo : DarkLogo;

  const navigate = useNavigate();
  const goJoinRoom = () => {
    navigate('/joinRoom');
  };

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = logoSrc;
    img.onload = () => setImageLoaded(true);
  });
  return (
    <>
      <div className="h-full index flex items-center justify-center flex-col gap-2">
        <img src={logoSrc} className="w-1/3 h-auto"></img>
        {imageLoaded && (
          <>
            <h1 data-aos="fade-right" data-aos-duration="1000" className={cs('text-lg font-semibold')}>
              在线代码编辑器~
            </h1>
            <Button data-aos="fade-left" data-aos-duration="1000" size="large" className="mt-3" onClick={goJoinRoom}>
              Try CodeEditor
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
