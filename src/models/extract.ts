import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { CountriesRepository } from '@/modules/countries/countries.repository';
import PrismaService from '@/modules/prisma/prisma.service';
import { City, Country, State } from './models';

const mm = '🔵🔵🔵🔵 ExtractService';

@Injectable()
export class ExtractService {
  constructor(
    private readonly repository: CountriesRepository,
    private readonly prisma: PrismaService,
  ) {}

  async deleteAllCountries() {
    console.log(`${mm} delete all countries ...`);

    try {
      const res = await this.repository.deleteAllCountries();
      console.log(
        `${mm} All countries deleted successfully ......... ${JSON.stringify(
          res,
        )}`,
      );
    } catch (error) {
      console.error('Error dropping tables:', error);
    }
  }
  async extractCountries(): Promise<any[]> {
    // Read the JSON file
    const jsonData = fs.readFileSync('files/countries.json', 'utf8');
    console.log(`${mm} jsonData: ${jsonData.length} bytes`);

    // Parse the JSON data into an array of objects
    const countriesData: any[] = JSON.parse(jsonData);
    console.log(
      `${mm} countriesData JSON: ${countriesData.length} countries in list`,
    );

    // Convert the array of country data to an array of objects
    const countries: any[] = countriesData.map((countryData) => {
      const lat =
        typeof countryData.latitude === 'number'
          ? String(countryData.latitude)
          : countryData.latitude !== null &&
            !isNaN(parseFloat(countryData.latitude))
          ? String(parseFloat(countryData.latitude))
          : null;
      const lng =
        typeof countryData.longitude === 'number'
          ? String(countryData.longitude)
          : countryData.longitude !== null &&
            !isNaN(parseFloat(countryData.longitude))
          ? String(parseFloat(countryData.longitude))
          : null;
      const country = {
        name: countryData.name,
        iso3: countryData.iso3,
        iso2: countryData.iso2,
        numeric_code: countryData.numeric_code,
        phone_code: countryData.phone_code,
        capital: countryData.capital,
        currency: countryData.currency,
        currency_name: countryData.currency_name,
        currency_symbol: countryData.currency_symbol,
        tld: countryData.tld,
        native: countryData.native,
        region: countryData.region,
        subregion: countryData.subregion,
        timezones: countryData.timezones.map((timezoneData) => {
          return {
            zoneName: timezoneData.zoneName,
            gmtOffset: timezoneData.gmtOffset,
            gmtOffsetName: timezoneData.gmtOffsetName,
            abbreviation: timezoneData.abbreviation,
            tzName: timezoneData.tzName,
          };
        }),
        latitude: lat,
        longitude: lng,
        position: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        emoji: countryData.emoji,
        emojiU: countryData.emojiU,
        flag: false,
        states: countryData.states.map((stateData) => {
          const lat =
            typeof stateData.latitude === 'number'
              ? String(stateData.latitude)
              : stateData.latitude !== null &&
                !isNaN(parseFloat(stateData.latitude))
              ? String(parseFloat(stateData.latitude))
              : null;
          const lng =
            typeof stateData.longitude === 'number'
              ? String(stateData.longitude)
              : stateData.longitude !== null &&
                !isNaN(parseFloat(stateData.longitude))
              ? String(parseFloat(stateData.longitude))
              : null;

          return {
            name: stateData.name,
            state_code: stateData.state_code,
            latitude: lat,
            longitude: lng,
            type: stateData.type,
            position: {
              type: 'Point',
              coordinates: [lng, lat],
            },
            cities: stateData.cities.map((cityData) => {
              const lat =
                typeof cityData.latitude === 'number'
                  ? String(cityData.latitude)
                  : cityData.latitude !== null &&
                    !isNaN(parseFloat(cityData.latitude))
                  ? String(parseFloat(cityData.latitude))
                  : null;
              const lng =
                typeof cityData.longitude === 'number'
                  ? String(cityData.longitude)
                  : cityData.longitude !== null &&
                    !isNaN(parseFloat(cityData.longitude))
                  ? String(parseFloat(cityData.longitude))
                  : null;

              return {
                name: cityData.name,
                latitude: lat,
                longitude: lng,
                position: {
                  type: 'Point',
                  coordinates: [cityData.longitude, cityData.latitude],
                },
              };
            }),
          };
        }),
      };
      return country;
    });

    console.log(
      `${mm} countriesData number of countries extracted from file: ✅ ✅ ${countries.length} `,
    );
    this.writeCountriesToDatabase(countries);
    return countries;
  }
  async writeCountriesToDatabase(countries: Country[]): Promise<void> {
    await this.deleteAllCountries();
    console.log(
      `${mm} writeCountriesToDatabase! : 🍎🍎🍎 ${countries.length} countries`,
    );

    for (const country of countries) {
      try {
        const createdCountry = await this.writeCountry(country);
        console.log(`${mm} Created country! : 🍎 ${createdCountry.name}`);

        for (const state of country.states) {
          const createdState = await this.writeState(state, createdCountry);

          for (const city of state.cities) {
            await this.writeCity(city, createdState, createdCountry);
          }
        }
      } catch (error) {
        console.error(
          `🔴🔴🔴 Error creating country: 🔴🔴🔴 ${country.name}`,
          error,
        );
      }
    }
  }

  private async writeCity(city: City, createdState, createdCountry) {
    const cc = await this.prisma.city.create({
      data: {
        name: city.name,
        position: city.position,
        latitude:
          typeof city.latitude === 'string' && !isNaN(parseFloat(city.latitude))
            ? parseFloat(city.latitude)
            : null,
        longitude:
          typeof city.longitude === 'string' &&
          !isNaN(parseFloat(city.longitude))
            ? parseFloat(city.longitude)
            : null,
        state: {
          connect: {
            id: createdState.id,
          },
        },
        country: {
          connect: {
            id: createdCountry.id,
          },
        },
      },
    });
    console.log(`${mm} city created, countryId: 🔵 ${cc.countryId} ${cc.name}`);
  }

  private async writeState(state: State, createdCountry) {
    const createdState = await this.prisma.state.create({
      data: {
        name: state.name,
        state_code: state.state_code,
        position: state.position,
        latitude:
          typeof state.latitude === 'string' &&
          !isNaN(parseFloat(state.latitude))
            ? parseFloat(state.latitude)
            : null,
        longitude:
          typeof state.longitude === 'string' &&
          !isNaN(parseFloat(state.longitude))
            ? parseFloat(state.longitude)
            : null,
        country: {
          connect: {
            id: createdCountry.id,
          },
        },
      },
    });

    console.log(`${mm} Created state: 😎😎 ${createdState.name}`);
    return createdState;
  }

  private async writeCountry(country: Country) {
    return await this.prisma.country.create({
      data: {
        name: country.name,
        iso3: country.iso3,
        iso2: country.iso2,
        position: country.position,
        numeric_code: country.numeric_code,
        phone_code: country.phone_code,
        capital: country.capital,
        currency: country.currency,
        currency_name: country.currency_name,
        currency_symbol: country.currency_symbol,
        tld: country.tld,
        native: country.native,
        region: country.region,
        subregion: country.subregion,
        latitude:
          typeof country.latitude === 'string' &&
          !isNaN(parseFloat(country.latitude))
            ? parseFloat(country.latitude)
            : null,
        longitude:
          typeof country.longitude === 'string' &&
          !isNaN(parseFloat(country.longitude))
            ? parseFloat(country.longitude)
            : null,
        emoji: country.emoji,
        emojiU: country.emojiU,
        timezones: {
          create: country.timezones.map((timezone) => ({
            zoneName: timezone.zoneName,
            gmtOffset: timezone.gmtOffset,
            gmtOffsetName: timezone.gmtOffsetName,
            abbreviation: timezone.abbreviation,
            tzName: timezone.tzName,
          })),
        },
      },
    });
  }
}
