import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaRepository } from './media.repository';
import PrismaService from '../prisma/prisma.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, MediaRepository, PrismaService],
})
export class MediaModule {}
