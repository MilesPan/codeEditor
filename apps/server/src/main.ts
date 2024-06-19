import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from './adapter';
import { setupInterceptors } from './interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors();
  app.useGlobalInterceptors(...setupInterceptors());
  await app.listen(3000);
}
bootstrap();
