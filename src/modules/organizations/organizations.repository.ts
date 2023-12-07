import { Injectable } from "@nestjs/common";
import { Organization, Prisma } from "@prisma/client";
import PrismaService from "../prisma/prisma.service";
import logger from "@/logger";
//⚽️ 🏀 🏈
const mm = "⚽️⚽️⚽️ OrganizationsRepository";
@Injectable()
export class OrganizationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const res = await this.prisma.organization.create({ data });
    logger.info(`${mm} Organization created: ${res.name}`);
    return res;
  }

  async findAll(): Promise<Organization[]> {
    const res = await this.prisma.organization.findMany();
    logger.info(`${mm} Organizations found: ${res.length}`);
    return res;
  }

  async findOne(id: number): Promise<Organization | null> {
    return this.prisma.organization.findUnique({
      where: { organizationId: id },
    });
  }

  async update(
    id: number,
    data: Prisma.OrganizationUpdateInput
  ): Promise<Organization> {
    return this.prisma.organization.update({
      where: { organizationId: id },
      data,
    });
  }

  async remove(id: number): Promise<Organization> {
    return this.prisma.organization.delete({ where: { organizationId: id } });
  }
}
