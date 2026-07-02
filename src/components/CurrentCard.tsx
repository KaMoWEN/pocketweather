import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { CurrentWeather } from "../api/types";
import { describeWeather } from "../api/weatherCodes";
import { colors, radius, spacing } from "../theme";

interface CurrentCardProps {
  cityName: string;
  current: CurrentWeather;
}

export function CurrentCard({ cityName, current }: CurrentCardProps) {
  const kind = describeWeather(current.weather_code);

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{cityName}</Text>
      <View style={styles.mainRow}>
        <Text style={styles.temperature}>
          {Math.round(current.temperature_2m)}°
        </Text>
        <Ionicons name={kind.icon} size={56} color={colors.accent} />
      </View>
      <Text style={styles.label}>{kind.label}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>
          Feels like {Math.round(current.apparent_temperature)}°
        </Text>
        <Text style={styles.metaDivider}>·</Text>
        <Text style={styles.meta}>
          Wind {Math.round(current.wind_speed_10m)} km/h
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  city: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: "600",
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  temperature: {
    color: colors.text,
    fontSize: 76,
    fontWeight: "200",
    letterSpacing: -2,
  },
  label: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "500",
    marginTop: spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
  },
  metaDivider: {
    color: colors.textFaint,
    fontSize: 13,
  },
});
