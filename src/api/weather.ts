import type { ForecastResponse, GeocodingResponse, GeoResult } from "./types";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/** Searches cities by name. Open-Meteo requires no API key. */
export async function geocodeCity(name: string): Promise<GeoResult[]> {
  const url = `${GEO_URL}?name=${encodeURIComponent(name)}&count=8&language=en&format=json`;
  const data = await fetchJson<GeocodingResponse>(url);
  return data.results ?? [];
}

/** Current conditions plus a 7-day daily forecast. */
export function getForecast(
  latitude: number,
  longitude: number,
): Promise<ForecastResponse> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    forecast_days: "7",
    timezone: "auto",
  });
  return fetchJson<ForecastResponse>(`${FORECAST_URL}?${params}`);
}
