import { afterEach, describe, expect, it, vi } from "vitest";
import { geocodeCity, getForecast } from "./weather";

const ok = (body: unknown) =>
  ({ ok: true, json: () => Promise.resolve(body) }) as Response;

afterEach(() => vi.unstubAllGlobals());

describe("geocodeCity", () => {
  it("returns the results array", async () => {
    const results = [
      { id: 1, name: "Nha Trang", country: "Vietnam", latitude: 12.2, longitude: 109.2 },
    ];
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(ok({ results })));

    await expect(geocodeCity("Nha Trang")).resolves.toEqual(results);
  });

  it("returns an empty array when the API omits results", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(ok({})));
    await expect(geocodeCity("zzzz")).resolves.toEqual([]);
  });

  it("URL-encodes the city name", async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok({}));
    vi.stubGlobal("fetch", fetchMock);

    await geocodeCity("Nha Trang");
    expect(String(fetchMock.mock.calls[0][0])).toContain("name=Nha%20Trang");
  });

  it("throws on a non-2xx response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 } as Response),
    );
    await expect(geocodeCity("London")).rejects.toThrow("500");
  });
});

describe("getForecast", () => {
  it("requests current and daily fields for the coordinates", async () => {
    const body = { current: {}, daily: {} };
    const fetchMock = vi.fn().mockResolvedValue(ok(body));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getForecast(12.25, 109.18)).resolves.toEqual(body);

    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toContain("latitude=12.25");
    expect(url).toContain("longitude=109.18");
    expect(url).toContain("temperature_2m_max");
    expect(url).toContain("weather_code");
    expect(url).toContain("timezone=auto");
  });
});
