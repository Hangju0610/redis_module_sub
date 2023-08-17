import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
const configService = new ConfigService();

export const redisProvider = [
  {
    provide: 'REDIS_CLIENT',
    useFactory: async () => {
      const redis = new Redis({
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        password: configService.get<string>('REDIS_PASSWORD'),
      });
      const connect = await redis.ping();
      if (connect === 'PONG') console.log('REDIS Connect!');
      return redis;
    },
  },
];
