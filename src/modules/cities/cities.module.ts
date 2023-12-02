import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import PrismaService from '../prisma/prisma.service';
import { SACityService } from '@/models/extract.sa';
import { USCityService } from '@/models/extract.us';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService, PrismaService, SACityService, USCityService],
})
export class CitiesModule {}
