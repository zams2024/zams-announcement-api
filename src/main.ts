import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Ensure the main.ts file has the correct binding
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
