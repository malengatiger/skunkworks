import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountriesRepository } from './countries.repository';
import PrismaService from '../prisma/prisma.service';
import { ExtractService } from '@/models/extract';

@Module({
  controllers: [CountriesController],
  providers: [
    PrismaService,
    CountriesService,
    CountriesRepository,
    ExtractService,
  ],
})
export class CountriesModule {}
