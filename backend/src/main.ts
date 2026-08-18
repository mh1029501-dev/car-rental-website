import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS Configuration
  app.enableCors({
    origin: [
      'https://car-rental-website-rf22.vercel.app', // Vercel Live Frontend
      'http://localhost:3000',                       // Local Next.js/React Frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Dynamic Port Allocation (Cloud hosting ke liye zaroori)
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend is running on port ${port}`);
}
bootstrap();