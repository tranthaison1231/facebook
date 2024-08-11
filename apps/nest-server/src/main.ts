import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import validationOptions from './configs/validation-options';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  app.enableCors({
    credentials: true,
    origin: true,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Facebook API')
    .setDescription('Facebook API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);

  await app.listen(3000);
}

bootstrap();
