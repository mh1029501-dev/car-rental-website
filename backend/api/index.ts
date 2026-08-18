import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import configureServerlessExpress from '@codegenie/serverless-express';

let server: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return configureServerlessExpress({ app: expressApp });
}

export default async function handler(req: any, res: any) {
    if (!server) {
        server = await bootstrap();
    }
    return server(req, res);
}