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
   id?: String;
   date: String;
   weather: Weather;
   visibility: Visibility;
   comment?: String;
}

export type FlightData = WeatherData[];

export type NewEntry = {
   date: String;
   visibility: Visibility;
   weather: Weather;
   comment?: String;
}