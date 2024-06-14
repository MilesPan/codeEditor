import { Controller, Get } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('api')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('getToken')
  async getToken(): Promise<string> {
    return await this.tokenService.createToken();
  }
}
