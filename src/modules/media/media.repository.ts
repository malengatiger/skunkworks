import { Injectable } from "@nestjs/common";
import { Prisma, Photo, Video, Audio } from "@prisma/client";
import PrismaService from "../prisma/prisma.service";

@Injectable()
export class MediaRepository {
  constructor(private prisma: PrismaService) {}
  // Existing methods...

  async findPhotosWithinLastMinutesByOrganization(minutes: number, organizationId: number): Promise<Photo[]> {
    const now = new Date();
    const pastTime = new Date(now.getTime() - minutes * 60000); // Convert minutes to milliseconds

    return this.prisma.photo.findMany({
      where: {
        date: {
          gte: pastTime.toISOString(),
          lte: now.toISOString(),
        },
        orgUser: {
          organizationId,
        },
      },
    });
  }

  async findVideosWithinLastMinutesByOrganization(minutes: number, organizationId: number): Promise<Video[]> {
    const now = new Date();
    const pastTime = new Date(now.getTime() - minutes * 60000); // Convert minutes to milliseconds

    return this.prisma.video.findMany({
      where: {
        date: {
          gte: pastTime.toISOString(),
          lte: now.toISOString(),
        },
        orgUser: {
          organizationId,
        },
      },
    });
  }

  async findAudiosWithinLastMinutesByOrganization(minutes: number, organizationId: number): Promise<Audio[]> {
    const now = new Date();
    const pastTime = new Date(now.getTime() - minutes * 60000); // Convert minutes to milliseconds

    return this.prisma.audio.findMany({
      where: {
        date: {
          gte: pastTime.toISOString(),
          lte: now.toISOString(),
        },
        orgUser: {
          organizationId,
        },
      },
    });
  }

  async findPhotosWithinLastMinutesByProject(minutes: number, projectId: number): Promise<Photo[]> {
    const now = new Date();
    const pastTime = new Date(now.getTime() - minutes * 60000); // Convert minutes to milliseconds

    return this.prisma.photo.findMany({
      where: {
        date: {
          gte: pastTime.toISOString(),
          lte: now.toISOString(),
        },
        project: {
          projectId,
        },
      },
    });
  }

  async findVideosWithinLastMinutesByProject(minutes: number, projectId: number): Promise<Video[]> {
    const now = new Date();
    const pastTime = new Date(now.getTime() - minutes * 60000); // Convert minutes to milliseconds

    return this.prisma.video.findMany({
      where: {
        date: {
          gte: pastTime.toISOString(),
          lte: now.toISOString(),
        },
        project: {
          projectId,
        },
      },
    });
  }

  async findAudiosWithinLastMinutesByProject(minutes: number, projectId: number): Promise<Audio[]> {
    const now = new Date();
    const pastTime = new Date(now.getTime() - minutes * 60000); // Convert minutes to milliseconds

    return this.prisma.audio.findMany({
      where: {
        date: {
          gte: pastTime.toISOString(),
          lte: now.toISOString(),
        },
        project: {
          projectId,
        },
      },
    });
  }

  async createPhoto(data: Prisma.PhotoCreateInput): Promise<Photo> {
    return this.prisma.photo.create({ data });
  }

  async createVideo(data: Prisma.VideoCreateInput): Promise<Video> {
    return this.prisma.video.create({ data });
  }

  async createAudio(data: Prisma.AudioCreateInput): Promise<Audio> {
    return this.prisma.audio.create({ data });
  }

  async findAllPhotos(): Promise<Photo[]> {
    return this.prisma.photo.findMany();
  }

  async findAllVideos(): Promise<Video[]> {
    return this.prisma.video.findMany();
  }

  async findAllAudios(): Promise<Audio[]> {
    return this.prisma.audio.findMany();
  }

  async findPhotoById(id: number): Promise<Photo | null> {
    return this.prisma.photo.findUnique({ where: { photoId: id } });
  }

  async findVideoById(id: number): Promise<Video | null> {
    return this.prisma.video.findUnique({ where: { videoId: id } });
  }

  async findAudioById(id: number): Promise<Audio | null> {
    return this.prisma.audio.findUnique({ where: { audioId: id } });
  }

  async updatePhoto(id: number, data: Prisma.PhotoUpdateInput): Promise<Photo> {
    return this.prisma.photo.update({ where: { photoId: id }, data });
  }

  async updateVideo(id: number, data: Prisma.VideoUpdateInput): Promise<Video> {
    return this.prisma.video.update({ where: { videoId: id }, data });
  }

  async updateAudio(id: number, data: Prisma.AudioUpdateInput): Promise<Audio> {
    return this.prisma.audio.update({ where: { audioId: id }, data });
  }

  async deletePhoto(id: number): Promise<Photo> {
    return this.prisma.photo.delete({ where: { photoId: id } });
  }

  async deleteVideo(id: number): Promise<Video> {
    return this.prisma.video.delete({ where: { videoId: id } });
  }

  async deleteAudio(id: number): Promise<Audio> {
    return this.prisma.audio.delete({ where: { audioId: id } });
  }
}
