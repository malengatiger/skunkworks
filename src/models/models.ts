import { Prisma } from '@prisma/client';

export class Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export class Position {
  type: string;
  coordinates: [number, number];
}

export class City {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  countryId: number;
  stateId: number;
  position: Prisma.JsonValue;
}

export class State {
  id: number;
  name: string;
  state_code: string;
  latitude: string;
  longitude: string;
  type: string | null;
  cities: City[];
  position: Prisma.JsonValue;
}

export class Country {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  timezones: Timezone[];
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
  states: State[];
  position: Prisma.JsonValue;
}

export class CityDistance {
  id: number;
  distanceInKM: number;
  stateName: string;
  cityName: string;
  position: Prisma.JsonValue;
}
