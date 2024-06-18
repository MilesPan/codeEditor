import { fetchGet } from './request';

export function generateTokenReq(params: { roomId: string; userName: string }) {
  return fetchGet<{ token: string }>('/livekit/generateToken', params);
}
