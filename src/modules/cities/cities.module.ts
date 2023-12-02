import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import PrismaService from '../prisma/prisma.service';
import { SACityService } from '@/models/extract.sa';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService, PrismaService, SACityService],
})
export class CitiesModule {}
