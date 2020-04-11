import dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

let clientUrl: string;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  if (process.env.NODE_ENV === 'dev') {
    // クライアント開発環境
    clientUrl = process.env.CLIENT_DEVELOPMENT_URL;
  } else {
    // クライアント本番環境
    clientUrl = process.env.CLIENT_PRODUCTION_URL;
  }

  app.enableCors({
    origin: clientUrl,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
  console.log('http://localhost:4000/graphql');
}
bootstrap();
