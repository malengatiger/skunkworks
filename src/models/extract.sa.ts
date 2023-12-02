import PrismaService from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Country, State } from '@prisma/client';
import * as fs from 'fs';
const mm = '🧡 💛 💚  SACityService';
let states: State[];
@Injectable()
export class SACityService {
  constructor(private readonly prisma: PrismaService) {}

  getState(name: string): State {
    let mState: State;
    states.forEach((state) => {
      if (state.name === name) {
        state = state;
      }
    });
    return mState;
  }

  async extractSACities(): Promise<number> {
    let count = 0;

    try {
      //get country from database
      const country: Country = await this.prisma.country.findUnique({
        where: {
          id: 204,
        },
      });
      if (!country) {
        throw new Error('South Africa not found');
      }
      console.log(
        `${mm} ... processing cities from Country:  🍎 ${country.name}`,
      );
      states = await this.prisma.state.findMany({
        where: {
          countryId: 204,
        },
      });

      const jsonContent = fs.readFileSync('files/cities.json', 'utf-8');
      const cities = JSON.parse(jsonContent);
      console.log(`${mm} jsonContent: ${jsonContent.length} bytes`);
      console.log(`${mm} cities: ${cities.length} found in cities file`);
      cities.sort((a, b) => {
        const provinceA = a.ProvinceName.toUpperCase();
        const provinceB = b.ProvinceName.toUpperCase();

        if (provinceA < provinceB) {
          return -1;
        }
        if (provinceA > provinceB) {
          return 1;
        }
        return 0;
      });
      console.log(
        `${mm} ... processing provinces from ${country.name}:  🍎 ${states.length}`,
      );
      for (const state of states) {
        console.log(`\nn${mm} ... processing state: ${state.name}\n`);
        let stateCount = 0;
        for (const city of cities) {
          const { AccentCity, ProvinceName, Latitude, Longitude } = city;
          let pName = '';
          // Find the state with matching ProvinceName
          if (ProvinceName.includes('KwaZulu')) {
            pName = 'KwaZulu-Natal';
          } else {
            pName = ProvinceName;
          }
          if (state.name === pName) {
            try {
              const cc = await this.prisma.city.create({
                data: {
                  name: AccentCity,
                  latitude: Latitude,
                  longitude: Longitude,
                  state: {
                    connect: {
                      id: state.id,
                    },
                  },
                  country: {
                    connect: {
                      id: state.countryId,
                    },
                  },
                  position: {
                    type: 'Point',
                    coordinates: [Longitude, Latitude],
                  },
                },
              });
              count++;
              stateCount++;
              console.log(
                `${mm} ... city added to DB: 🍎 #${count} 🔵 ${state.name} 🔵 ${cc.name}`,
              );
            } catch (err) {
              console.log(
                `${mm} 🔴 🔴 🔴 Error : failed to create SA city in ${
                  state.name
                } : ${JSON.stringify(city)})})}`,
              );
              console.error(err);
            }
          }
        }
        console.log(
          `\n\n${mm} state ${state.name} completed successfully: 🔵 🔵 🔵 🔵 cities added to DB:  🍎 ${stateCount} 🍎 🔵\n\n`,
        );
      }

      console.log(
        `\n\n${mm} Data imported successfully! 🔵 🔵 🔵 SA cities found:  🍎 ${count} 🍎`,
      );
    } catch (error) {
      console.error('🔴🔴🔴 Error importing data:', error);
    }
    return count;
  }
}
