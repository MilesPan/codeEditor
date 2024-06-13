import { memo, useEffect } from 'react';
import {
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  VideoConference,
  useTracks
} from '@livekit/components-react';
import './customLivekit.css';

import { useTheme } from '../ThemeProvider';
const serverUrl = process.env.PUBLIC_LIVE_WEBSOCKET_URL;
const token = process.env.PUBLIC_LIVE_TOKEN;
const Meeting = memo(() => {
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);
  return (
    <>
      <div className="meetingContainer w-full overflow-x-hidden">
        <LiveKitRoom
          video={false}
          audio={false}
          token={token}
          serverUrl={serverUrl}
          // Use the default LiveKit theme for nice styles.
          data-lk-theme="default"
          className="livekit-container"
          style={{ height: '100%' }}
        >
          

          {/* <MyVideoConference /> */}
          <VideoConference />
          {/* <RoomAudioRenderer /> */}
          {/* <ControlBar className="livekit-control-bar" /> */}
        </LiveKitRoom>
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
