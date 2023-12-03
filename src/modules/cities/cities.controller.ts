import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { City } from '@prisma/client';
import { SACityService } from '@/models/extract.sa';
import { USCityService } from '@/models/extract.us';
import { WorldPopulationService } from '@/models/worldpop';

const mm = '🅿️ 🅿️ 🅿️ 🅿️  CityController';

@Controller("cities")
export class CitiesController {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly saCitiesService: SACityService,
    private readonly usCityService: USCityService,
    private readonly worldPopulationService: WorldPopulationService
  ) {}

  @Post("createCity")
  create(@Body() city: City) {
    console.log(
      `${mm} createCity: ... name: 😡 ${city.name} 😡 city location: 🍎 lat: ${city.latitude} lng: ${city.longitude}`
    );
    return this.citiesService.createCity(city);
  }

  @Get("getCityById")
  async getCityById(@Query("id") id: string): Promise<City> {
    console.log(`${mm} getCityById: 🍎 ${id} 🍎`);
    const parsedCityId = parseInt(id, 10);

    console.log(typeof id);
    return await this.citiesService.getCityById(parsedCityId);
  }
  @Get("findCountryCities")
  async findCountryCities(
    @Query("countryId") countryId: string
  ): Promise<City[]> {
    console.log(`${mm} findCountryCities: 🍎 ${countryId} 🍎`);
    const parsedCityId = parseInt(countryId, 10);

    console.log(typeof countryId);
    const list = await this.citiesService.findCountryCities(parsedCityId);
    console.log(`${mm} findCountryCities: 🍎 ${list.length} 🍎 cities found`);
    return list;
  }

  @Get("importWorldPopulationFromCSV")
  async importWorldPopulationFromCSV(): Promise<any[]> {

    const list = await this.worldPopulationService.importWorldPopulationFromCSV();

    return list;
  }
  @Get("findCitiesByPosition")
  async findCitiesByPosition(
    @Query("latitude") latitude: number,
    @Query("longitude") longitude: number,
    @Query("distance") distance: number
  ): Promise<City[]> {
    console.log(
      `${mm} ...... findCitiesByPosition: lat: ${latitude} lng: ${longitude} distance: ${distance} km`
    );
    const list = await this.citiesService.findCitiesByPosition(
      latitude,
      longitude,
      distance
    );
    console.log(`${mm} cities found by coord location: 🍎 ${list.length}`);
    return list;
  }

  @Get("calculateDistanceFromLocation")
  async calculateDistanceFromLocation(
    @Query("latitude") latitude: number,
    @Query("longitude") longitude: number,
    @Query("withinKM") withinKM: number,
    @Query("countryId") countryId: number
  ): Promise<any[]> {
    console.log(
      `${mm} calculateDistanceFromLocation: ... distances to calculate within  😡 ${withinKM} km 😡 of location: 🍎 ${latitude} ${longitude}`
    );
    const list = await this.citiesService.calculateDistanceFromLocation(
      latitude,
      longitude,
      withinKM,
      countryId
    );
    console.log(
      `${mm}  calculateDistanceFromLocation: 🍀 ${list.length} 🍀 distances calculated within ${withinKM} km of location: 🍎 ${latitude} ${longitude} 🍀 🍀`
    );
    return list;
  }
  @Get("extractSACities")
  async extractSACities(): Promise<string> {
    const res = await this.saCitiesService.extractSACities();
    console.log(`${mm} ... extractSACities found ${res} cities and places`);
    return `${mm} extractSACities: result: ${res} cities and places created successfully`;
  }
  @Get("extractUSACities")
  async extractUSACities(): Promise<any> {
    console.log(`${mm} ... extractUSACities starting ...`);

    return this.usCityService.extractUSACities();
  }
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.citiesService.deleteCity(id);
  }
}
