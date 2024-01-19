import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prefix = 'api';
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService);
  const port = config.get('port');

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`Api server started on ${await app.getUrl()}/${prefix}`);
}
bootstrap();
