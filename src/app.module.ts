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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CountriesModule,
    CitiesModule,
  ],
  providers: [
    {
      provide: 'REDIS_CONFIG',
      useFactory: (configService: ConfigService) => redisConfig(configService),
      inject: [ConfigService],
    },
    CountriesService,
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

/*
   import { Module } from '@nestjs/common';
   import { ConfigModule, ConfigService } from '@nestjs/config';
   import { redisConfig } from './redis.config';
import { CountryModule } from './country/country.module';
import { CitiesModule } from './cities/cities.module';
import { CountriesModule } from './countries/countries.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { CountryService } from './modules/country.service';
import { CountryModule } from './modules/country/country.module';
import { CountryModule } from './modules/country/country.module';
import { CountryModule } from './country/country.module';

   @Module({
     imports: [
       ConfigModule.forRoot(),
     ],
     providers: [
       {
         provide: 'REDIS_CONFIG',
         useFactory: (configService: ConfigService) => redisConfig(configService),
         inject: [ConfigService],
       },
     ],
     exports: ['REDIS_CONFIG'],
   })
   export class AppModule {}
   
*/
