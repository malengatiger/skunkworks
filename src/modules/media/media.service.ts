import { Injectable } from "@nestjs/common";
import { MediaRepository } from "./media.repository";
import { Photo, Video, Audio } from "@prisma/client";

@Injectable()
export class MediaService {
  constructor(private mediaRepository: MediaRepository) {}

  async createPhoto(data: any): Promise<Photo> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.createPhoto(data);
  }

  async createVideo(data: any): Promise<Video> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.createVideo(data);
  }

  async createAudio(data: any): Promise<Audio> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.createAudio(data);
  }

  async findAllPhotos(): Promise<Photo[]> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.findAllPhotos();
  }

  async findAllVideos(): Promise<Video[]> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.findAllVideos();
  }

  async findAllAudios(): Promise<Audio[]> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.findAllAudios();
  }

  async findPhotoById(id: number): Promise<Photo | null> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.findPhotoById(id);
  }

  async findVideoById(id: number): Promise<Video | null> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.findVideoById(id);
  }

  async findAudioById(id: number): Promise<Audio | null> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.findAudioById(id);
  }

  async updatePhoto(id: number, data: any): Promise<Photo> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.updatePhoto(id, data);
  }

  async updateVideo(id: number, data: any): Promise<Video> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.updateVideo(id, data);
  }

  async updateAudio(id: number, data: any): Promise<Audio> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.updateAudio(id, data);
  }

  async deletePhoto(id: number): Promise<Photo> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.deletePhoto(id);
  }

  async deleteVideo(id: number): Promise<Video> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.deleteVideo(id);
  }

  async deleteAudio(id: number): Promise<Audio> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.deleteAudio(id);
  }
  async findPhotosWithinLastMinutesByOrganization(
    minutes: number,
    organizationId: number
  ): Promise<Photo[]> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.findPhotosWithinLastMinutesByOrganization(
      minutes,
      organizationId
    );
  }

  async findVideosWithinLastMinutesByOrganization(
    minutes: number,
    organizationId: number
  ): Promise<Video[]> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.findVideosWithinLastMinutesByOrganization(
      minutes,
      organizationId
    );
  }

  async findAudiosWithinLastMinutesByOrganization(
    minutes: number,
    organizationId: number
  ): Promise<Audio[]> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.findAudiosWithinLastMinutesByOrganization(
      minutes,
      organizationId
    );
  }

  async findPhotosWithinLastMinutesByProject(
    minutes: number,
    projectId: number
  ): Promise<Photo[]> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.findPhotosWithinLastMinutesByProject(
      minutes,
      projectId
    );
  }

  async findVideosWithinLastMinutesByProject(
    minutes: number,
    projectId: number
  ): Promise<Video[]> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.findVideosWithinLastMinutesByProject(
      minutes,
      projectId
    );
  }

  async findAudiosWithinLastMinutesByProject(
    minutes: number,
    projectId: number
  ): Promise<Audio[]> {
    // Perform any necessary processing or validation here
    // ...

    return this.mediaRepository.findAudiosWithinLastMinutesByProject(
      minutes,
      projectId
    );
  }
}
