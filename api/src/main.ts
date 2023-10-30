// LIB IMPORTS - START
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// LIB IMPORTS - END

// INTERNAL IMPORTS - START
import { AppModule } from './app.module';
// INTERNAL IMPORTS - END

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.enableCors();

  app.setGlobalPrefix('/api');

  // APP SETUP - START
  const config = new DocumentBuilder()
    .setTitle('ActionReward API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // APP SETUP - END

  await app.listen(3000);
}
bootstrap();
