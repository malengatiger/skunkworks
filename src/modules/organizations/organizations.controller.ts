import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import { Organization } from "@prisma/client";

@Controller("organizations")
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Post()
  async create(@Body() data: Organization): Promise<Organization> {
    return this.organizationsService.create(data);
  }

  @Get()
  async findAll(): Promise<Organization[]> {
    return this.organizationsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Organization | null> {
    return this.organizationsService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() data: Organization
  ): Promise<Organization> {
    return this.organizationsService.update(id, data);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<Organization> {
    return this.organizationsService.remove(id);
  }
}
