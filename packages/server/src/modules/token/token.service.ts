import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AccessToken } from 'livekit-server-sdk';
const envConfig = dotenv.config().parsed;

@Injectable()
export class TokenService {
  async createToken(): Promise<string> {
    const roomName = 'quickstart-room';
    const participantName = 'quickstart-username';

    const at = new AccessToken(
      envConfig.PUBLIC_LIVE_API_KEY,
      envConfig.PUBLIC_LIVE_API_SECRET,
      {
        identity: participantName,
        ttl: 600, // Token to expire after 10 minutes
      },
    );
    at.addGrant({ roomJoin: true, room: roomName });

    return at.toJwt();
  }
}
