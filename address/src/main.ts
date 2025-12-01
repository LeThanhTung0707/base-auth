import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/logger/logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'address',
      protoPath: join(__dirname, '../../../proto/address.proto'),
      url: '0.0.0.0:50051',
    },
  });

  await app.startAllMicroservices();
  console.log('🟢 gRPC Microservice listening on port 50051');

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🟢 HTTP Server listening on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
