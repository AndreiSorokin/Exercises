export enum Visibility {
   Great = 'great',
   Good = 'good',
   Ok = 'ok',
   Poor = 'poor',
}

export enum Weather {
   Sunny = 'sunny',
   Rainy = 'rainy',
   Cloudy = 'cloudy',
   Stormy = 'stormy',
   Windy = 'windy',
}

export type WeatherData = {
   id: string;
   date: string;
   weather: Weather;
   visibility: Visibility;
   comment: string;
}

export type FlightData = WeatherData[];

export type NewEntry = {
   date: string;
   visibility: Visibility;
   weather: Weather;
   comment: string;
}

export type NonSensetiveFlightData = Omit<FlightData, 'id'>