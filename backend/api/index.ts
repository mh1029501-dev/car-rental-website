import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import serverlessExpress from '@codegenie/serverless-express';

let server: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
}

export default async function handler(req: any, res: any) {
    server = server ?? (await bootstrap());
    return server(req, res);
}