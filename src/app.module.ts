import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import PrismaModule from '@/modules/prisma/prisma.module';
import { redisConfig } from './redis.config';
import { CountriesModule } from './modules/countries/countries.module';
import { CountriesService } from './modules/countries/countries.service';
import { CountriesRepository } from './modules/countries/countries.repository';
import { ExtractService } from './models/extract';
import { CitiesModule } from './modules/cities/cities.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogElapsedTimeInterceptor } from './elapsed/elapsed.filter';
import { USCityService } from './models/extract.us';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { MediaModule } from './modules/media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CountriesModule,
    CitiesModule,
    OrganizationsModule,
    ProjectsModule,
    MediaModule,
  ],
  providers: [
    {
      provide: 'REDIS_CONFIG',
      useFactory: (configService: ConfigService) => redisConfig(configService),
      inject: [ConfigService],
    },
    // CountriesService,
    ExtractService,
    CountriesRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogElapsedTimeInterceptor,
    },
  ],
  exports: ['REDIS_CONFIG'],
})
export default class AppModule {}


