import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { S3Service } from './s3.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [S3Service],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const backendUrl = process.env.BACKEND_SERVICE_URL || 'http://backend:4000';
    const bookingUrl = process.env.BOOKING_SERVICE_URL || 'http://booking:4001';
    const addressUrl = process.env.ADDRESS_SERVICE_URL || 'http://address:4002';

    const removeCorsHeaders = (proxyRes) => {
      delete proxyRes.headers['access-control-allow-origin'];
      delete proxyRes.headers['access-control-allow-methods'];
      delete proxyRes.headers['access-control-allow-headers'];
      delete proxyRes.headers['access-control-allow-credentials'];
    };

    consumer
      .apply(
        createProxyMiddleware({
          target: backendUrl,
          changeOrigin: true,
          onProxyRes: removeCorsHeaders,
        }),
      )
      .forRoutes('/auth', '/users');

    consumer
      .apply(
        createProxyMiddleware({
          target: bookingUrl,
          changeOrigin: true,
          onProxyRes: removeCorsHeaders,
        }),
      )
      .forRoutes('/rooms', '/bookings');

    consumer
      .apply(
        createProxyMiddleware({
          target: addressUrl,
          changeOrigin: true,
          onProxyRes: removeCorsHeaders,
        }),
      )
      .forRoutes('/address');
  }
}
