import { FC, useEffect, useMemo } from 'react';
// import '@/components/Meeting/customLivekit.css';
import './joinRoom.css'
import { PreJoin } from '@livekit/components-react';
import { useTheme } from '@/components/ThemeProvider';
const JoinRoom: FC = () => {
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);
  const preJoinDefaults = useMemo(() => {
    return {
      username: '',
      videoEnabled: true,
      audioEnabled: true
    };
  }, []);
  return (
    <>
      <div className="joinRoom flex items-center h-full" data-lk-theme="default">
        <PreJoin defaults={preJoinDefaults}></PreJoin>
      </div>
    </>
  );
};

export default JoinRoom;
