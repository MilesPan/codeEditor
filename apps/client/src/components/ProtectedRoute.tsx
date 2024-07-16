import { Navigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRequest } from 'ahooks';
import { findRoomReq } from '@Request/room';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }: { children: any }) => {
  console.log('protected render');
  const { roomId } = useParams();

  const [loading, setLoading] = useState(true);
  // useRequest的loading默认是false，会造成不必要的重复渲染
  const { run } = useRequest(findRoomReq, {
    manual: true,
    onError: () => {
      setHasRoom(false);
    },
    onSuccess: () => {
      setHasRoom(true);
    },
    onFinally: () => {
      setLoading(false);
    }
  });
  useEffect(() => {
    roomId && run(roomId);
    setLoading(true);
  }, []);
  const [hasRoom, setHasRoom] = useState(!!roomId);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }
  if (!hasRoom) {
    return <Navigate to="/joinRoom" />;
  }

  return children;
};

export default observer(ProtectedRoute);
