import { Injectable } from "@nestjs/common";
import { Project, Prisma, Audio, Video, Photo } from "@prisma/client";
import PrismaService from "../prisma/prisma.service";

@Injectable()
export class ProjectsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findOne(id: number): Promise<Project | null> {
    return this.prisma.project.findUnique({ where: { projectId: id } });
  }

  async update(id: number, data: Prisma.ProjectUpdateInput): Promise<Project> {
    return this.prisma.project.update({ where: { projectId: id }, data });
  }

  async remove(id: number): Promise<Project> {
    return this.prisma.project.delete({ where: { projectId: id } });
  }

  async addAudios(projectId: number, audios: Audio[]): Promise<Project> {
    return this.prisma.project.update({
      where: { projectId: projectId },
      data: {
        audios: {
          create: audios,
        },
      },
    });
  }

  async addVideos(projectId: number, videos: Video[]): Promise<Project> {
    return this.prisma.project.update({
      where: { projectId: projectId },
      data: {
        videos: {
          create: videos,
        },
      },
    });
  }

  async addPhotos(projectId: number, photos: Photo[]): Promise<Project> {
    return this.prisma.project.update({
      where: { projectId: projectId },
      data: {
        photos: {
          create: photos,
        },
      },
    });
  }
}
