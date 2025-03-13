import { Navigate, useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { findRoomReq } from '@Request/room';
import { useEffect, useState } from 'react';
import { UserStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { message } from 'antd';
const ProtectedRoute = ({ children }: { children: any }) => {
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
  if (!UserStore.hasUserInfo) {
    message.destroy();
    message.error('不存在用户信息')
    return <Navigate to="/joinRoom" />;
  }
  if (!hasRoom) {
    return <Navigate to="/joinRoom" />;
  }

  return children;
};

export default observer(ProtectedRoute);
