import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { MediaService } from "./media.service";
import { Photo, Video, Audio } from "@prisma/client";

@Controller("media")
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post("createPhoto")
  async createPhoto(@Body() data: any): Promise<Photo> {
    return this.mediaService.createPhoto(data);
  }

  @Post("createVideo")
  async createVideo(@Body() data: any): Promise<Video> {
    return this.mediaService.createVideo(data);
  }

  @Post("createAudio")
  async createAudio(@Body() data: any): Promise<Audio> {
    return this.mediaService.createAudio(data);
  }

  @Get("getPhotos")
  async findAllPhotos(): Promise<Photo[]> {
    return this.mediaService.findAllPhotos();
  }

  @Get("getVideos")
  async findAllVideos(): Promise<Video[]> {
    return this.mediaService.findAllVideos();
  }

  @Get("getAudios")
  async findAllAudios(): Promise<Audio[]> {
    return this.mediaService.findAllAudios();
  }

  @Get("photos/:id")
  async findPhotoById(@Param("id") id: number): Promise<Photo | null> {
    return this.mediaService.findPhotoById(id);
  }

  @Get("findVideoById")
  async findVideoById(@Param("id") id: number): Promise<Video | null> {
    return this.mediaService.findVideoById(id);
  }

  @Get("findAudioById")
  async findAudioById(@Param("id") id: number): Promise<Audio | null> {
    return this.mediaService.findAudioById(id);
  }

  @Put("photos/:id")
  async updatePhoto(
    @Param("id") id: number,
    @Body() data: any
  ): Promise<Photo> {
    return this.mediaService.updatePhoto(id, data);
  }

  @Delete("photos/:id")
  async deletePhoto(@Param("id") id: number): Promise<Photo> {
    return this.mediaService.deletePhoto(id);
  }

  @Delete("videos/:id")
  async deleteVideo(@Param("id") id: number): Promise<Video> {
    return this.mediaService.deleteVideo(id);
  }

  @Delete("audios/:id")
  async deleteAudio(@Param("id") id: number): Promise<Audio> {
    return this.mediaService.deleteAudio(id);
  }
 
  @Get('photos/last/:minutes/organization/:organizationId')
  async findPhotosWithinLastMinutesByOrganization(
    @Param('minutes') minutes: number,
    @Param('organizationId') organizationId: number,
  ): Promise<Photo[]> {
    return this.mediaService.findPhotosWithinLastMinutesByOrganization(minutes, organizationId);
  }

  @Get('videos/last/:minutes/organization/:organizationId')
  async findVideosWithinLastMinutesByOrganization(
    @Param('minutes') minutes: number,
    @Param('organizationId') organizationId: number,
  ): Promise<Video[]> {
    return this.mediaService.findVideosWithinLastMinutesByOrganization(minutes, organizationId);
  }

  @Get('audios/last/:minutes/organization/:organizationId')
  async findAudiosWithinLastMinutesByOrganization(
    @Param('minutes') minutes: number,
    @Param('organizationId') organizationId: number,
  ): Promise<Audio[]> {
    return this.mediaService.findAudiosWithinLastMinutesByOrganization(minutes, organizationId);
  }

  @Get('photos/last/:minutes/project/:projectId')
  async findPhotosWithinLastMinutesByProject(
    @Param('minutes') minutes: number,
    @Param('projectId') projectId: number,
  ): Promise<Photo[]> {
    return this.mediaService.findPhotosWithinLastMinutesByProject(minutes, projectId);
  }

  @Get('videos/last/:minutes/project/:projectId')
  async findVideosWithinLastMinutesByProject(
    @Param('minutes') minutes: number,
    @Param('projectId') projectId: number,
  ): Promise<Video[]> {
    return this.mediaService.findVideosWithinLastMinutesByProject(minutes, projectId);
  }

  @Get('audios/last/:minutes/project/:projectId')
  async findAudiosWithinLastMinutesByProject(
    @Param('minutes') minutes: number,
    @Param('projectId') projectId: number,
  ): Promise<Audio[]> {
    return this.mediaService.findAudiosWithinLastMinutesByProject(minutes, projectId);
  }
}
