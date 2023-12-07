import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { Project, Audio, Video, Photo } from "@prisma/client";

@Controller("projects")
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async create(@Body() data: any): Promise<Project> {
    return this.projectsService.create(data);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Project | null> {
    return this.projectsService.findOne(id);
  }

  @Put(":id")
  async update(@Param("id") id: number, @Body() data: any): Promise<Project> {
    return this.projectsService.update(id, data);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<Project> {
    return this.projectsService.remove(id);
  }

  @Post(":id/audios")
  async addAudios(
    @Param("id") id: number,
    @Body() audios: Audio[]
  ): Promise<Project> {
    return this.projectsService.addAudios(id, audios);
  }

  @Post(":id/videos")
  async addVideos(
    @Param("id") id: number,
    @Body() videos: Video[]
  ): Promise<Project> {
    return this.projectsService.addVideos(id, videos);
  }

  @Post(":id/photos")
  async addPhotos(
    @Param("id") id: number,
    @Body() photos: Photo[]
  ): Promise<Project> {
    return this.projectsService.addPhotos(id, photos);
  }
}
