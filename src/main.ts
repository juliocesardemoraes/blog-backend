import { MongooseErrorFilter } from './filters/mongooseErrorHandling';
import { MongoExceptionFilter } from './filters/mongoErrorHandling';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new MongooseErrorFilter(), new MongoExceptionFilter());

  await app.listen(3000);
}
bootstrap();
