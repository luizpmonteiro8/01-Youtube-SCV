import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from './error/errors.interceptor';
import { HttpExceptionFilter } from './error/http-exception.filter';

require('../patch.js');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ErrorsInterceptor());
  await app.listen(3002);
}
bootstrap();
