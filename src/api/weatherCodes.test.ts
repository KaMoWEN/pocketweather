import { describe, expect, it } from "vitest";
import { describeWeather } from "./weatherCodes";

describe("describeWeather", () => {
  it.each([
    [0, "Clear sky"],
    [1, "Partly cloudy"],
    [2, "Partly cloudy"],
    [3, "Overcast"],
    [45, "Fog"],
    [48, "Fog"],
    [53, "Drizzle"],
    [63, "Rain"],
    [80, "Rain"],
    [75, "Snow"],
    [86, "Snow"],
    [95, "Thunderstorm"],
    [99, "Thunderstorm"],
  ])("maps WMO code %i to %s", (code, label) => {
    expect(describeWeather(code).label).toBe(label);
  });

  it("falls back to Unknown for unmapped codes", () => {
    expect(describeWeather(42).label).toBe("Unknown");
    expect(describeWeather(-1).label).toBe("Unknown");
  });

  it("always returns an icon and a background tint", () => {
    for (const code of [0, 2, 3, 45, 55, 65, 75, 95, 42]) {
      const kind = describeWeather(code);
      expect(kind.icon.length).toBeGreaterThan(0);
      expect(kind.tint).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
