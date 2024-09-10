import { Injectable } from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';
import { GenerateToken } from './dto';
import 'dotenv/config';
@Injectable()
export class LivekitService {
  async generateToken(query: GenerateToken): Promise<{ token: string }> {
    const roomId = query.roomId;
    const userName = query.userName;

    const at = new AccessToken(
      process.env.PUBLIC_LIVE_API_KEY,
      process.env.PUBLIC_LIVE_API_SECRET,
      {
        identity: userName,
        ttl: 900,
      },
    );
    at.addGrant({ roomJoin: true, room: roomId });

    return { token: at.toJwt() };
  }
}
