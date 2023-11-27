import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true
  });

  const config = new DocumentBuilder()
    .setTitle('example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cors({
    origin: 'http://localhost:4000', // Разрешенный источник (origin)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Разрешение передачи куки и заголовков аутентификации
  }));
  await app.listen(3000);
}
bootstrap();
