import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import { Prisma, Country } from '@prisma/client';

@Injectable()
export class CountriesRepository {
  constructor(private prisma: PrismaService) {}

  async createCountry(params: {
    data: Prisma.CountryCreateInput;
  }): Promise<Country> {
    const { data } = params;
    return this.prisma.country.create({ data });
  }

  async getCountries(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CountryWhereUniqueInput;
    where?: Prisma.CountryWhereInput;
    orderBy?: Prisma.CountryOrderByWithRelationInput;
  }): Promise<Country[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.country.findMany({ skip, take, cursor, where, orderBy });
  }

  async getCountryById(id: number): Promise<Country> {
    return this.prisma.country.findUnique({ where: { id: id } });
  }

  async updateCountry(
    id: number,
    data: Prisma.CountryUpdateInput,
  ): Promise<Country> {
    return this.prisma.country.update({ where: { id: id }, data });
  }

  async deleteCountry(id: number): Promise<void> {
    await this.prisma.country.delete({ where: { id: id } });
  }
  async deleteCountries(): Promise<number> {
    const { count } = await this.prisma.country.deleteMany();
    return count;
  }
  async deleteAllCountries(): Promise<any> {
    const countries = await this.prisma.country.deleteMany();
    const states = await this.prisma.state.deleteMany();
    const cities = await this.prisma.city.deleteMany();
    console.log(
      `🆗🆗🆗 deleteAllCountries: countries deleted: ${
        countries.count
      } 🎈 states: ${(await states).count} 🎈 cities: ${(await cities).count}`,
    );
    return {
      countries: countries.count,
      states: states.count,
      cities: cities.count,
    };
  }
}
