import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import configureServerlessExpress from '@codegenie/serverless-express';

let cachedServer: any;

async function bootstrap() {
    if (!cachedServer) {
        const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });
        app.enableCors({
            origin: '*',
            credentials: true,
        });
        await app.init();

        const expressApp = app.getHttpAdapter().getInstance();
        cachedServer = configureServerlessExpress({ app: expressApp });
    }
    return cachedServer;
}

export default async function handler(req: any, res: any) {
    const server = await bootstrap();
    return server(req, res);
}