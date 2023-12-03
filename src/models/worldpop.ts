import { Injectable } from "@nestjs/common";
import fs from "fs";
// import csvParser from "csv-parser";
const csvParser = require("csv-parser");

import PrismaService from "@/modules/prisma/prisma.service";
import logger from "@/logger";
import { WorldPopulation } from "@prisma/client";
import { createReadStream } from "fs";

const mm = "😎😎😎😎 WorldPopulationService: 😎";
interface CsvData {
  "Country Name": string;
  "Country Code": string;
  "Indicator Name": string;
  "Indicator Code": string;
  [year: string]: number | string | undefined;
}

@Injectable()
export class WorldPopulationService {
  constructor(private readonly prisma: PrismaService) {}

  async importWorldPopulationFromCSV(): Promise<WorldPopulation[]> {
    logger.info(`${mm} world population starting ...`);
    const populations: CsvData[] = [];
    let pops: WorldPopulation[] = [];
    const filePath = "files/worldpop2.csv";
    let isFirstRow = true;

    createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data: CsvData) => {
        // if (isFirstRow) {
        //   isFirstRow = false;
        //   return; // Skip the first row
        // }

        populations.push(data);
      })
      .on("end", async () => {
        await this.savePopulations(populations);
      });
    return pops;
  }

  private async savePopulations(
    populations: CsvData[]
  ): Promise<WorldPopulation[]> {
    logger.info(
      `${mm} savePopulations: starting ... records: ${populations.length}`
    );

    try {
      const { count } = await this.prisma.worldPopulation.deleteMany({});
      logger.info(
        `${mm} savePopulations: ... old records deleted from the WorldPopulation table: 🍎 ${count} rows 🍎`
      );
    } catch (err) {
      logger.error(err.message);
    }
    const createPromises = populations.map(async (population) => {
      const countryName = population["Country Name"];
      const countryCode = population["Country Code"];

      //logger.info(`${mm} ..... countryCode: ${countryCode} 🍎 ${countryName}`);
      const existingCountry = await this.prisma.country.findFirst({
        where: { name: countryName },
      });

      const countryId: number = existingCountry ? existingCountry.id : 0;
      if (existingCountry) {
        logger.info(
          `${mm} .... existing country: 🍎 ${existingCountry.capital}, ${existingCountry.name}`
        );
      }

      try {
        if (population) {
          const result: WorldPopulation =
            await this.prisma.worldPopulation.create({
              data: {
                country:
                  countryId !== 0 ? { connect: { id: countryId } } : undefined,
                countryName: countryName,
                code: countryCode,
                indicator: population["Indicator Name"],
                indicatorCode: population["Indicator Code"],
                // countryId: countryId,
                population1960: parseInt(population["1960"] as string),
                population1961: parseInt(population["1961"] as string),
                population1962: parseInt(population["1962"] as string),
                population1963: parseInt(population["1963"] as string),
                population1964: parseInt(population["1964"] as string),
                population1965: parseInt(population["1965"] as string),
                population1966: parseInt(population["1966"] as string),
                population1967: parseInt(population["1967"] as string),
                population1968: parseInt(population["1968"] as string),
                population1969: parseInt(population["1969"] as string),
                population1970: parseInt(population["1970"] as string),
                population1971: parseInt(population["1971"] as string),
                population1972: parseInt(population["1972"] as string),
                population1973: parseInt(population["1973"] as string),
                population1974: parseInt(population["1974"] as string),
                population1975: parseInt(population["1975"] as string),
                population1976: parseInt(population["1976"] as string),
                population1977: parseInt(population["1977"] as string),
                population1978: parseInt(population["1978"] as string),
                population1979: parseInt(population["1979"] as string),
                population1980: parseInt(population["1980"] as string),
                population1981: parseInt(population["1981"] as string),
                population1982: parseInt(population["1982"] as string),
                population1983: parseInt(population["1983"] as string),
                population1984: parseInt(population["1984"] as string),
                population1985: parseInt(population["1985"] as string),
                population1986: parseInt(population["1986"] as string),
                population1987: parseInt(population["1987"] as string),
                population1988: parseInt(population["1988"] as string),
                population1989: parseInt(population["1989"] as string),
                population1990: parseInt(population["1990"] as string),
                population1991: parseInt(population["1991"] as string),
                population1992: parseInt(population["1992"] as string),
                population1993: parseInt(population["1993"] as string),
                population1994: parseInt(population["1994"] as string),
                population1995: parseInt(population["1995"] as string),
                population1996: parseInt(population["1996"] as string),
                population1997: parseInt(population["1997"] as string),
                population1998: parseInt(population["1998"] as string),
                population1999: parseInt(population["1999"] as string),
                population2000: parseInt(population["2000"] as string),
                population2001: parseInt(population["2001"] as string),
                population2002: parseInt(population["2002"] as string),
                population2003: parseInt(population["2003"] as string),
                population2004: parseInt(population["2004"] as string),
                population2005: parseInt(population["2005"] as string),
                population2006: parseInt(population["2006"] as string),
                population2007: parseInt(population["2007"] as string),
                population2008: parseInt(population["2008"] as string),
                population2009: parseInt(population["2009"] as string),
                population2010: parseInt(population["2010"] as string),
                population2011: parseInt(population["2011"] as string),
                population2012: parseInt(population["2012"] as string),
                population2013: parseInt(population["2013"] as string),
                population2014: parseInt(population["2014"] as string),
                population2015: parseInt(population["2015"] as string),
                population2016: parseInt(population["2016"] as string),
                population2017: parseInt(population["2017"] as string),
                population2018: parseInt(population["2018"] as string),
                population2019: parseInt(population["2019"] as string),
                population2020: parseInt(population["2020"] as string),
                population2021: parseInt(population["2021"] as string),
                population2022: parseInt(population["2022"] as string),
              },
            });
          logger.info(
            `${mm} ..... WorldPopulation result: 🎽 ${result.code} - ${result.countryName} 🍎`
          );
          return result;
        }
      } catch (err) {
        logger.info(
          `${mm} 🔴  🔴  🔴 failed to parse: ${countryCode} - ${countryName} ERROR: ${err}  🔴  🔴`
        );
        console.log(err);
      }
    });

    const list = await Promise.all(createPromises);
    logger.info(
      `${mm} ...... savePopulations completed ...  🍎 records saved to db: ${list.length} 🍎`
    );
    return list;
  }
}
