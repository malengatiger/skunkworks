import { Injectable } from "@nestjs/common";

import { City, Prisma } from "@prisma/client";
import PrismaService from "../prisma/prisma.service";
import { CityDistance } from "@/models/models";
import fs from "fs";
import csvParser from "csv-parser";
const mm = "🅿️ 🈳 🈂️ 🛂 🛃 CityService 🍎🍎";

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCity(city: City): Promise<any> {
    const mCity = await this.prisma.city.create({
      data: {
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        stateId: city.stateId,
        countryId: city.countryId,
        position: {
          type: "Point",
          coordinates: [city.longitude, city.latitude],
        },
      },
    });
    console.log(`${mm} city created: 🍎 ${JSON.stringify(mCity)} 🍎`);
    return mCity;
  }

  async getAllCities(): Promise<any[]> {
    return this.prisma.city.findMany();
  }

  async getCityById(cityId: number): Promise<City> {
    const city = await this.prisma.city.findUnique({ where: { id: cityId } });
    console.log(`${mm} city found: ${JSON.stringify(city)}`);
    return city;
  }
  async findCountryCities(countryId: number): Promise<City[]> {
    const res = await this.prisma.city.findMany({
      where: { countryId: countryId },
    });
    return res;
  }

  async updateCity(
    cityId: number,
    cityData: Prisma.CityUpdateInput
  ): Promise<any> {
    return this.prisma.city.update({ where: { id: cityId }, data: cityData });
  }

  async deleteCity(cityId: number): Promise<any> {
    return this.prisma.city.delete({ where: { id: cityId } });
  }

  //
  //Distance in degrees = 100 kilometers * (360 degrees / 40,075 kilometers)
  async findCitiesByPosition(
    latitude: number,
    longitude: number,
    distance: number
  ): Promise<any[]> {
    console.log(
      `${mm} findCitiesByPosition: - lat: ${latitude} - lng: ${longitude} distanceInKm: ${distance}`
    );
    try {
      const distanceInDegrees = distance * (360 / 40075);
      console.log(
        `${mm} findCitiesByPosition: - lat: ${latitude} - lng: ${longitude} distanceInDegrees: ${distanceInDegrees}`
      );
      const cities = await this.prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT "City"."id", "State"."name" as mState, "City"."name" as mCity, "City"."position",
          CAST(ST_DistanceSphere(
            ST_MakePoint(CAST(("City"."position"->>'coordinates')::json->>0 AS float), 
                          CAST(("City"."position"->>'coordinates')::json->>1 AS float)),
            ST_MakePoint(${longitude}::float, ${latitude}::float)
          ) / 1000 AS numeric(10, 2)) AS distance_in_km
          FROM "City", "State"
          WHERE ST_DWithin(
            ST_MakePoint(CAST(("City"."position"->>'coordinates')::json->>0 AS float), 
                  CAST(("City"."position"->>'coordinates')::json->>1 AS float)),
            ST_MakePoint(${longitude}::float, ${latitude}::float),
            ${distanceInDegrees}::float
          )
          AND "City"."stateId" = "State"."id" 
          AND "City"."countryId" = "State"."countryId" 
          ORDER BY distance_in_km;
  `);
      console.log(
        `${mm} findCitiesByPosition: ${cities.length} cities found within distance: ${distance} km`
      );
      cities.forEach((c) => {
        console.log(
          `${mm} city found, distance from location: ${c.distance_in_km} - state: ${c.mstate}  \t🍎 city: 🛃 🛃 ${c.mcity}`
        );
      });
      return cities;
    } catch (error) {
      console.log(`${mm} findCitiesByPosition: ERROR ${error.message}`);
      console.error(error);
    }
  }

  async calculateDistanceFromLocation(
    latitude: number,
    longitude: number,
    withinKM: number,
    countryId: number
  ): Promise<CityDistance[]> {
    console.log(
      `${mm} calculateDistanceFromLocation: latitude: ${latitude} longitude: ${longitude} within  😡 ${withinKM} km  😡`
    );
    try {
      const cities = await this.prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT
          "City"."id",
          "City"."name" as cityname,
          "State"."name" as statename,
          "City"."position",
          CAST(
            ST_DistanceSphere(
              ST_MakePoint(${longitude}::float, ${latitude}::float),
              ST_MakePoint(
                CAST(("City"."position"->>'coordinates')::json->>0 AS float),
                CAST(("City"."position"->>'coordinates')::json->>1 AS float)
              )
            ) / 1000 AS numeric(10, 2)
          ) AS calculateddistance
        FROM "City", "State"
        WHERE "City"."countryId" = CAST(${countryId} AS integer) 
          AND "City"."stateId" = "State"."id"
          AND ST_DistanceSphere(
            ST_MakePoint(${longitude}::float, ${latitude}::float),
            ST_MakePoint(
              CAST(("City"."position"->>'coordinates')::json->>0 AS float),
              CAST(("City"."position"->>'coordinates')::json->>1 AS float)
            )
          ) <= ${withinKM * 1000} 

          ORDER BY calculateddistance ASC;
      `);
      // Convert each JSON object to CityDistance
      const cityDistances: CityDistance[] = cities.map((json) => {
        // console.log(JSON.stringify(json));
        const cityDistance = new CityDistance();
        cityDistance.id = json.id;
        cityDistance.distanceInKM = json.calculateddistance;
        cityDistance.stateName = json.statename;
        cityDistance.cityName = json.cityname;
        cityDistance.position = json.position;
        return cityDistance;
      });

      cityDistances.forEach((city) => {
        // console.log(city);
        console.log(
          `${mm} city found within distance of location: 🌎 ${city.distanceInKM} KM 🍎 ${city.stateName} 🥬 ${city.cityName} `
        );
      });

      console.log(
        `${mm} cities found within distance of location: 🍎 🍎 🍎 ${cities.length} places, towns and cities 🍎`
      );

      return cityDistances;
    } catch (error) {
      console.error("Error calculating distance:", error);
      throw error;
    }
  }


}
