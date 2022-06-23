import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'


import { AppModule } from './app.module'

async function bootstrap() {
    // await EnvCheckerTools.check()

    const app = await NestFactory.create(AppModule, { cors: true })
    app.setGlobalPrefix('v1')
    const options = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('MarchHealth')
        .setDescription('The MarchHealth API description')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('docs', app, document)
    app.useGlobalPipes(new ValidationPipe())
    await app
        .listen(Number(process.env.SERVICE_PORT), process.env.SERVICE_HOST)
        .then(() =>
            console.info(
                `Server is running on http://${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}\n`,
                `Swagger is running on http://${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}/docs`
            )
        )
}
bootstrap()
