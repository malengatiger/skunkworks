import { Injectable } from "@nestjs/common";
import { OrganizationsRepository } from "./organizations.repository";
import { Organization } from "@prisma/client";
import logger from "@/logger";
const mm = "⚽️⚽️⚽️ OrganizationsService";

@Injectable()
export class OrganizationsService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async create(organization: Organization): Promise<Organization> {
    // Perform any necessary processing or validation here
    // ...

    const res = await this.organizationsRepository.create(organization);
    logger.info(`${mm} organization: ${res.name}`);
    return res;
  }

  async findAll(): Promise<Organization[]> {
    // Perform any necessary processing or validation here
    // ...

    return this.organizationsRepository.findAll();
  }

  async findOne(id: number): Promise<Organization | null> {
    // Perform any necessary processing or validation here
    // ...

    return this.organizationsRepository.findOne(id);
  }

  async update(id: number, data: Organization): Promise<Organization> {
    // Perform any necessary processing or validation here
    // ...

    return this.organizationsRepository.update(id, data);
  }

  async remove(id: number): Promise<Organization> {
    // Perform any necessary processing or validation here
    // ...

    return this.organizationsRepository.remove(id);
  }
}
