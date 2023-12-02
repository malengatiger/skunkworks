import { Injectable } from '@nestjs/common';
import { CountriesRepository } from './countries.repository';
import { Country } from '@prisma/client';

@Injectable()
export class CountriesService {
  constructor(private repository: CountriesRepository) {}

  async create(createCountryDto: Country): Promise<Country> {
    return await this.repository.createCountry({
      data: createCountryDto,
    });
  }

  async findAll(): Promise<Country[]> {
    return await this.repository.getCountries({});
  }

  async findOne(id: number): Promise<Country> {
    return await this.repository.getCountryById(id);
  }

  async update(id: number, updateCountryDto: Country): Promise<Country> {
    return await this.repository.updateCountry(id, updateCountryDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.deleteCountry(id);
  }
  async deleteCountries(): Promise<any> {
    return await this.repository.deleteAllCountries();
  }
}
