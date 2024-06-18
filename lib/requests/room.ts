import { fetchPost } from './request';

interface UserModel {
  id: string;
  name: string;
  roomId: string;
}

export function findRoomReq(roomId: string) {
  return fetchPost<{ id: string }>('/room/getRoom', { id: roomId });
}

export function findOrCreateRoomReq(roomId: string) {
  return fetchPost<{ id: string; message: string }>('/room', { id: roomId });
}

export function userJoinRoomReq(roomId: string, userName: string) {
  return fetchPost<UserModel>('/room/addUser', { roomId, userName });
}

export function userLeaveRoomReq(roomId: string, userName: string) {
  return fetchPost<UserModel>('/room/deleteUser', { roomId, userName });
}
