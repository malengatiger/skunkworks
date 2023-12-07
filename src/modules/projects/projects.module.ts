import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsRepository } from './projects.repository';
import PrismaService from '../prisma/prisma.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository, PrismaService],
})
export class ProjectsModule {}
