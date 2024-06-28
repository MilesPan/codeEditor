// ProtectedRoute.js
import { Navigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRequest } from 'ahooks';
import { findRoomReq } from '@Request/room';
import {  useEffect, useState } from 'react';

const ProtectedRoute = ({ children }: { children: any }) => {
  const { roomId } = useParams();

  const { loading, run } = useRequest(findRoomReq, {
    manual: true,
    onError: () => {
      setHasRoom(false);
    },
    onSuccess: () => {
      setHasRoom(true);
    }
  });
  useEffect(() => {
    roomId && run(roomId)
  }, [])
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
