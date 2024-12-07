import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  // Enable CORS for all origins
  app.enableCors({
    origin: 'http://localhost:4200',  // Allow requests from Angular frontend
    methods: 'GET, POST, PUT, DELETE',  // Allow common HTTP methods
    allowedHeaders: 'Content-Type, Authorization',  // Allow specific headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
