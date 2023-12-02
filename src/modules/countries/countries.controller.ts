import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from '@prisma/client';
import { ExtractService } from '@/models/extract';

@Controller()
export class CountriesController {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly extractService: ExtractService,
  ) {}

  @Post('createCountry')
  create(@Body() createCountryDto: Country) {
    console.log(`🌀🌀🌀🌀 CountriesController: createCountry started ...`);
    return this.countriesService.create(createCountryDto);
  }

  @Get('getCountries')
  async findAll() {
    const list = await this.countriesService.findAll();
    console.log(
      `🌀🌀🌀🌀 CountriesController: getCountries found: 🌀 ${list.length} ...`,
    );
    return list;
  }
  @Get('extractCountries')
  async extractCountries() {
    const list = await this.extractService.extractCountries();
    console.log(
      `🌀🌀🌀🌀 CountriesController: extractCountries found: 🌀 ${list.length} ...`,
    );
    return list;
  }
  @Get('deleteCountries')
  async deleteCountries() {
    const count = await this.countriesService.deleteCountries();
    console.log(
      `🌀🌀🌀🌀 CountriesController: deleteCountries done! 🌀 ${count} removed!`,
    );
    return `Countries deleted successfully: ${count}`;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.countriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCountryDto: Country) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.countriesService.remove(id);
  }
}
