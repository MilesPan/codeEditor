import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AccessToken } from 'livekit-server-sdk';
import { GenerateToken } from './dto';
const envConfig = dotenv.config().parsed;

@Injectable()
export class LivekitService {
  async generateToken(query: GenerateToken): Promise<{ token: string }> {
    const roomId = query.roomId;
    const userName = query.userName;

    const at = new AccessToken(
      envConfig.PUBLIC_LIVE_API_KEY,
      envConfig.PUBLIC_LIVE_API_SECRET,
      {
        identity: userName,
        ttl: 900,
      },
    );
    at.addGrant({ roomJoin: true, room: roomId });

    return { token: at.toJwt() };
  }
}
