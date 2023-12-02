import { ConfigService } from '@nestjs/config';

export const redisConfig = (configService: ConfigService) => ({
  host: configService.get('REDIS_HOST'),
  port: configService.get('REDIS_PORT'),
  password: configService.get('REDIS_PASSWORD'),
});
