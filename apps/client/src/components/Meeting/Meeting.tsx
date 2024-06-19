import { memo, useEffect, useMemo, useState } from 'react';
import { generateTokenReq } from '@Request/livekit';
import { GridLayout, LiveKitRoom, ParticipantTile, VideoConference, useTracks } from '@livekit/components-react';
import '@/styles/livekit.css';

import { useTheme } from '../ThemeProvider';
import { useRequest } from 'ahooks';
import { UserStore } from '@/store';
import { Room, RoomOptions } from 'livekit-client';
const serverUrl = process.env.PUBLIC_LIVE_WEBSOCKET_URL;

const Meeting = memo(() => {
  const { runAsync: runGenerateTokenReq } = useRequest(generateTokenReq, { manual: true });
  const [token, setToken] = useState<string>();

  useEffect(() => {
    runGenerateTokenReq(UserStore.userInfo).then(res => {
      setToken(res.data.token);
    });
  }, []);

  const { resolvedTheme } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  const roomOptions = useMemo((): RoomOptions => {
    return {
      videoCaptureDefaults: {
        deviceId: UserStore.userChoice.videoDeviceId
      },
      audioCaptureDefaults: {
        deviceId: UserStore.userChoice.audioDeviceId
      }
    };
  }, []);
  const room = useMemo(() => new Room(roomOptions), []);
  return (
    <>
      <div className="meetingContainer h-full w-full overflow-x-hidden pb-2">
        {token && (
          <LiveKitRoom
            room={room}
            video={UserStore.userChoice.videoEnabled}
            audio={UserStore.userChoice.audioEnabled}
            token={token}
            serverUrl={serverUrl}
            data-lk-theme="default"
            className="livekit-container"
          >
            <VideoConference />
          </LiveKitRoom>
        )}
      </div>
    </>
  );
});
export default Meeting;

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: 'screen_share' as any, withPlaceholder: false },
      { source: 'camera' as any, withPlaceholder: true }
    ],
    { onlySubscribed: false }
  );
  const handleClick = (v: any) => {
    console.log(1, v);
  };
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(40% - var(--lk-control-bar-height))' }}>
      <ParticipantTile onParticipantClick={handleClick} />
    </GridLayout>
  );
}
