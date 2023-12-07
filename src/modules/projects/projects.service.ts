import { Injectable } from "@nestjs/common";
import { ProjectsRepository } from "./projects.repository";
import { Project, Audio, Video, Photo } from "@prisma/client";

@Injectable()
export class ProjectsService {
  constructor(private projectsRepository: ProjectsRepository) {}

  async create(data: any): Promise<Project> {
    // Perform any necessary processing or validation here
    // ...

    return this.projectsRepository.create(data);
  }

  async findAll(): Promise<Project[]> {
    // Perform any necessary processing or validation here
    // ...

    return this.projectsRepository.findAll();
  }

  async findOne(id: number): Promise<Project | null> {
    // Perform any necessary processing or validation here
    // ...

    return this.projectsRepository.findOne(id);
  }

  async update(id: number, data: any): Promise<Project> {
    // Perform any necessary processing or validation here
    // ...

    return this.projectsRepository.update(id, data);
  }

  async remove(id: number): Promise<Project> {
    // Perform any necessary processing or validation here
    // ...

    return this.projectsRepository.remove(id);
  }

  async addAudios(projectId: number, audios: Audio[]): Promise<Project> {
    // Perform any necessary processing or validation here
    // ...

    return this.projectsRepository.addAudios(projectId, audios);
  }

  async addVideos(projectId: number, videos: Video[]): Promise<Project> {
    // Perform any necessary processing or validation here
    // ...

    return this.projectsRepository.addVideos(projectId, videos);
  }

  async addPhotos(projectId: number, photos: Photo[]): Promise<Project> {
    // Perform any necessary processing or validation here
    // ...

    return this.projectsRepository.addPhotos(projectId, photos);
  }
}
