import { useTheme } from '@/components/ThemeProvider';
import { FC } from 'react';
import Logo from '@Assets/logo.png'
import DarkLogo from '@Assets/dark-logo.png'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';


const Index: FC = () => {
  const { resolvedTheme } = useTheme()
  const logoSrc = resolvedTheme === 'light' ? Logo : DarkLogo

  const navigate = useNavigate()
  const goJoinRoom = () => {
    navigate('/joinRoom')
  }
  return (
    <>
      <div className='h-full index flex items-center justify-center flex-col gap-2'>
        <img src={logoSrc} className='w-1/3'></img>
        <h1 className='text-lg font-semibold'>在线代码编辑器~</h1>
        <Button size='large' className='mt-3' onClick={goJoinRoom}>Try CodeEditor</Button>
      </div>
    </>
  );
};

export default Index;
