import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsRepository } from './organizations.repository';
import PrismaService from '../prisma/prisma.service';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationsRepository, PrismaService],
})
export class OrganizationsModule {}
