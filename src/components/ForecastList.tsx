import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { DailyForecast } from "../api/types";
import { describeWeather } from "../api/weatherCodes";
import { colors, radius, spacing } from "../theme";

function dayName(iso: string, index: number): string {
  if (index === 0) return "Today";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export function ForecastList({ daily }: { daily: DailyForecast }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>7-day forecast</Text>
      {daily.time.map((iso, i) => {
        const kind = describeWeather(daily.weather_code[i]);
        return (
          <View key={iso} style={styles.row}>
            <Text style={styles.day}>{dayName(iso, i)}</Text>
            <Ionicons name={kind.icon} size={18} color={colors.accent} />
            <Text style={styles.range}>
              <Text style={styles.max}>
                {Math.round(daily.temperature_2m_max[i])}°
              </Text>
              <Text style={styles.min}>
                {"  "}
                {Math.round(daily.temperature_2m_min[i])}°
              </Text>
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  heading: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  day: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: "500",
  },
  range: {
    minWidth: 86,
    textAlign: "right",
    fontVariant: ["tabular-nums"],
  },
  max: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  min: {
    color: colors.textFaint,
    fontSize: 15,
  },
});
