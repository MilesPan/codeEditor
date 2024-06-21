// ProtectedRoute.js
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRequest } from 'ahooks';
import { findRoomReq } from '@Request/room';
import { useEffect, useMemo, useState } from 'react';

const ProtectedRoute = ({ children }: { children: any }) => {
  const { roomId } = useParams();

  const { loading, run } = useRequest(findRoomReq, {
    onBefore(params) {
      params[0] = roomId!;
    },
    onError: () => {
      setHasRoom(false);
    },
    onSuccess: () => {
      setHasRoom(true);
    }
  });
  const [hasRoom, setHasRoom] = useState(true);
  const hasRoomMemo = useMemo(() => hasRoom, [hasRoom]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }
  if (!hasRoomMemo) {
    return <Navigate to="/joinRoom" />;
  }

  return children;
};

export default observer(ProtectedRoute);
