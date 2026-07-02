import { useCallback, useRef, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { ForecastResponse, GeoResult } from "../api/types";
import { geocodeCity, getForecast } from "../api/weather";
import { describeWeather } from "../api/weatherCodes";
import { SearchBar } from "../components/SearchBar";
import { CityList } from "../components/CityList";
import { CurrentCard } from "../components/CurrentCard";
import { ForecastList } from "../components/ForecastList";
import {
  EmptyView,
  ErrorView,
  IdleView,
  LoadingView,
} from "../components/StateViews";
import { colors, spacing } from "../theme";

type Phase =
  | { kind: "idle" }
  | { kind: "searching" }
  | { kind: "noResults"; query: string }
  | { kind: "cities"; cities: GeoResult[] }
  | { kind: "loadingForecast"; city: GeoResult }
  | { kind: "ready"; city: GeoResult; forecast: ForecastResponse }
  | { kind: "error"; message: string; retry: () => void };

export function WeatherScreen() {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  // Monotonic id per request: a slow old response must never
  // overwrite the result of a newer search or city selection.
  const requestSeq = useRef(0);

  const search = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    Keyboard.dismiss();
    const seq = ++requestSeq.current;
    setPhase({ kind: "searching" });
    try {
      const cities = await geocodeCity(trimmed);
      if (seq !== requestSeq.current) return;
      setPhase(
        cities.length === 0
          ? { kind: "noResults", query: trimmed }
          : { kind: "cities", cities },
      );
    } catch {
      if (seq !== requestSeq.current) return;
      setPhase({
        kind: "error",
        message: "Couldn't search for cities",
        retry: () => void search(trimmed),
      });
    }
  }, []);

  const selectCity = useCallback(async (city: GeoResult) => {
    const seq = ++requestSeq.current;
    setPhase({ kind: "loadingForecast", city });
    try {
      const forecast = await getForecast(city.latitude, city.longitude);
      if (seq !== requestSeq.current) return;
      setPhase({ kind: "ready", city, forecast });
    } catch {
      if (seq !== requestSeq.current) return;
      setPhase({
        kind: "error",
        message: "Couldn't load the forecast",
        retry: () => void selectCity(city),
      });
    }
  }, []);

  const background =
    phase.kind === "ready"
      ? describeWeather(phase.forecast.current.weather_code).tint
      : colors.background;

  return (
    <View style={[styles.screen, { backgroundColor: background }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.brand}>PocketWeather</Text>
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={() => void search(query)}
        />

        <View style={styles.body}>
          {phase.kind === "idle" && <IdleView />}
          {phase.kind === "searching" && (
            <LoadingView label="Searching cities" />
          )}
          {phase.kind === "noResults" && <EmptyView query={phase.query} />}
          {phase.kind === "cities" && (
            <CityList cities={phase.cities} onSelect={(c) => void selectCity(c)} />
          )}
          {phase.kind === "loadingForecast" && (
            <LoadingView label={`Loading weather for ${phase.city.name}`} />
          )}
          {phase.kind === "error" && (
            <ErrorView message={phase.message} onRetry={phase.retry} />
          )}
          {phase.kind === "ready" && (
            <View style={styles.results}>
              <CurrentCard
                cityName={phase.city.name}
                current={phase.forecast.current}
              />
              <ForecastList daily={phase.forecast.daily} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  brand: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  body: {
    marginTop: spacing.xs,
  },
  results: {
    gap: spacing.md,
  },
});
