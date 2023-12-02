import { Injectable } from "@nestjs/common";
import fs from "fs";
import { createReadStream } from "fs";

// import csvParser from "csv-parser";
import { Prisma, Country } from "@prisma/client";
import PrismaService from "@/modules/prisma/prisma.service";
import logger from "@/logger";
const csvParser = require("csv-parser");
const mm = "🌀 🌀 🌀 USCityService  🌀 🌀";

@Injectable()
export class USCityService {
  constructor(private readonly prisma: PrismaService) {}

  async extractUSACities(): Promise<Country> {
    const usa = await this.prisma.country.findFirst({
      where: { name: "United States" },
    });

    if (usa) {
      logger.info(
        `${mm} 🍎🍎🍎🍎  ..... USA already exists: ${JSON.stringify(
          usa
        )}`
      );
      const res = await this.importCitiesFromCSV(usa.id);
      logger.info(`\n\n${mm} 🍎🍎🍎🍎  USA cities created: ${res}`);
      return usa;
    }

    const createdCountry = await this.createCountry();
    const res = await this.importCitiesFromCSV(createdCountry.id);
    logger.info(`\n\n${mm} 🍎🍎🍎🍎 USA cities created for new usa: ${res}`);
    return createdCountry;
  }

  private async createCountry() {
    const countryData: Prisma.CountryCreateInput = {
      name: "United States",
      iso3: "USA",
      iso2: "US",
      phone_code: "1",
      capital: "Washington, DC",
      currency: "$",
      currency_name: "Dollar",
      currency_symbol: "$",
      tld: "",
      region: "",
      subregion: "",
      latitude: 36.966428,
      longitude: -95.844032,
      emoji: "🇺🇸",
      emojiU: "",
      numeric_code: "1",
      native: "",
    };

    const createdCountry = await this.prisma.country.create({
      data: countryData,
    });

    logger.info(
      `${mm} 🍎🍎🍎🍎  ... USA created: ${JSON.stringify(
        createdCountry
      )}`
    );
    const res = await this.importCitiesFromCSV(createdCountry.id);
    logger.info(
      `\n\n${mm} 🍎🍎🍎🍎  ...... USA cities created: ${res}`
    );
    return createdCountry;
  }

  private async importCitiesFromCSV(countryId: number): Promise<number> {
    logger.info(
      `${mm} 🍎🍎🍎🍎  ... importCitiesFromCSV: countryId: ${countryId}`
    );
    const filePath = "files/uscities.csv";
    logger.info(
      `${mm} 🍎🍎🍎🍎  ..... importCitiesFromCSV: file: ${filePath}`
    );

    let count = 0;
    try {
      const cities: CityInterface[] = [];

      const readStream = createReadStream(filePath);
      const csvStream = readStream.pipe(csvParser());

      for await (const data of csvStream) {
        const city: CityInterface = {
          state_id: data.state_id,
          state_name: data.state_name,
          city: data.city,
          city_ascii: data.city_ascii,
          lat: data.lat,
          lng: data.lng,
          country: data.country,
          iso2: data.iso2,
          iso3: data.iso2,
          admin_name: data.admin_name,
          capital: "",
          population: "",
          id: "",
          county_fips: "",
          county_name: "",
          density: "",
          source: "",
          military: "",
          incorporated: "",
          timezone: data.timezone,
          ranking: "",
          zips: "",
        };
        cities.push(city);
      }

      count = await this.writeCitiesToDatabase(countryId, cities);
    } catch (error) {
      logger.error(`${mm} 🔴🔴🔴 Error importing data: ${error}`);
    }

    logger.info(
      `${mm} 🍎🍎🍎🍎  ... importCitiesFromCSV: cities: ${count}`
    );
    return count;
  }

  private async writeCitiesToDatabase(
    countryId: number,
    cities: CityInterface[]
  ): Promise<number> {
    let count = 0;
    logger.info(
      `${mm} 🍎🍎🍎🍎  writeCitiesToDatabase: ... cities to be created: ${cities.length}`
    );

    for (const cityData of cities) {
      try {
        const state = await this.prisma.state.findFirst({
          where: {
            state_code: cityData.state_id,
            countryId: countryId,
          },
        });

        if (state) {
          const mCity = await this.prisma.city.create({
            data: {
              name: cityData.city,
              latitude: parseFloat(cityData.lat),
              longitude: parseFloat(cityData.lng),
              state: {
                connect: { id: state.id },
              },
              country: {
                connect: { id: countryId },
              },
              position: {
                type: "Point",
                coordinates: [
                  parseFloat(cityData.lat),
                  parseFloat(cityData.lat),
                ],
              },
            },
          });

          if (mCity) {
            count++;
            logger.info(
              `\n${mm} 🍀🍀🍀🍀🍀🍀 city created: #${count} 🍀 ${mCity.name} 🍀🍀🍀🍀🍀\n`
            );
          }
        } else {
          logger.error(
            `${mm} 🔴🔴🔴  ..... State not found for city: ${cityData.city}`
          );
        }
      } catch (error) {
        logger.error(
          `${mm} 🔴🔴🔴 Error writing city to database, state: ${cityData.state_id} city: ${cityData.city}  ${error}`
        );
      }
    }

    logger.info(
      `\n\n${mm} 🍎🍎🍎🍎  ... USA Cities imported successfully: ${count} cities 🍎`
    );
    return count;
  }
}
