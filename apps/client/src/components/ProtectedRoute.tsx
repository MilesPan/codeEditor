// ProtectedRoute.js
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRequest } from 'ahooks';
import { findRoomReq } from '@Request/room';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }: { children: any }) => {
  const { roomId } = useParams();

  const { loading, runAsync } = useRequest(findRoomReq, { manual: true });

  const [hasRoom, setHasRoom] = useState(true);
  useEffect(() => {
    runAsync(roomId || '')
      .then(() => {
        setHasRoom(true);
      })
      .catch(() => {
        setHasRoom(false);
      });
  }, [runAsync]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }
  if (!hasRoom) {
    return <Navigate to="/joinRoom" />;
  }

  return children;
};

export default observer(ProtectedRoute);
