import { Module, Global, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST', 'localhost');
        const port = configService.get<number>('REDIS_PORT', 6379);
        
        const client = new Redis({
          host,
          port,
          lazyConnect: true,
        });

        client.on('connect', () => {
          console.log(`🚀 (Address) Redis connected to ${host}:${port}`);
        });

        client.on('error', (err) => {
          console.error('❌ (Address) Redis connection error:', err);
        });

        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule implements OnModuleInit, OnModuleDestroy {
    constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

    async onModuleInit() {
        try {
            await this.redis.connect();
        } catch (e) {
            console.error("Failed to connect to Redis on startup");
        }
    }

    async onModuleDestroy() {
        await this.redis.quit();
    }
}
