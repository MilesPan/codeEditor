import { fetchPost } from './request';
import { useRequest } from 'ahooks';
export function findOrCreateRoomReq(roomId: string) {
  return fetchPost('/room', { id: roomId });
}
