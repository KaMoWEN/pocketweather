import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { GeoResult } from "../api/types";
import { colors, radius, spacing } from "../theme";

interface CityListProps {
  cities: GeoResult[];
  onSelect: (city: GeoResult) => void;
}

export function CityList({ cities, onSelect }: CityListProps) {
  return (
    <View style={styles.list}>
      {cities.map((city) => (
        <Pressable
          key={city.id}
          onPress={() => onSelect(city)}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
          accessibilityRole="button"
        >
          <Ionicons name="location-outline" size={16} color={colors.accent} />
          <View style={styles.rowText}>
            <Text style={styles.name}>{city.name}</Text>
            <Text style={styles.meta}>
              {[city.admin1, city.country].filter(Boolean).join(", ")}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={colors.textFaint}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.xs,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  rowPressed: {
    backgroundColor: colors.surfaceStrong,
  },
  rowText: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 1,
  },
});
