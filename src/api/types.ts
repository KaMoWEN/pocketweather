// Shared response types for the Open-Meteo APIs.
// Kept framework-free so they could be reused by a web client as-is.

export interface GeoResult {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface GeocodingResponse {
  results?: GeoResult[];
}

export interface CurrentWeather {
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

export interface ForecastResponse {
  current: CurrentWeather;
  daily: DailyForecast;
}
