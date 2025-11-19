import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'address',
        protoPath: join(__dirname, '../../../proto/address.proto'),
        url: '0.0.0.0:50051',
      },
    },
  );

  await grpcApp.listen();
  console.log('🟢 gRPC Microservice listening on port 50051');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
