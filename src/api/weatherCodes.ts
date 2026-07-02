import type { ComponentProps } from "react";
import type { Ionicons } from "@expo/vector-icons";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

export interface WeatherKind {
  label: string;
  icon: IoniconName;
  /** Screen background tint for this kind of weather. */
  tint: string;
}

/** WMO weather interpretation codes, grouped. */
export function describeWeather(code: number): WeatherKind {
  if (code === 0) {
    return { label: "Clear sky", icon: "sunny", tint: "#1c2a4a" };
  }
  if (code === 1 || code === 2) {
    return { label: "Partly cloudy", icon: "partly-sunny", tint: "#22304e" };
  }
  if (code === 3) {
    return { label: "Overcast", icon: "cloudy", tint: "#262f42" };
  }
  if (code === 45 || code === 48) {
    return { label: "Fog", icon: "reorder-three", tint: "#2a3040" };
  }
  if (code >= 51 && code <= 57) {
    return { label: "Drizzle", icon: "rainy", tint: "#233047" };
  }
  if ((code >= 61 && code <= 67) || code === 80 || code === 81 || code === 82) {
    return { label: "Rain", icon: "rainy", tint: "#1f2c45" };
  }
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return { label: "Snow", icon: "snow", tint: "#28334c" };
  }
  if (code >= 95) {
    return { label: "Thunderstorm", icon: "thunderstorm", tint: "#1d2438" };
  }
  return { label: "Unknown", icon: "help-circle", tint: "#22304e" };
}
