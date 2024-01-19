import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './shared/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prefix = 'api';
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = app.get(ConfigService);
  const port = config.get('port');

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`Api server started on ${await app.getUrl()}/${prefix}`);
}
bootstrap();
