import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "../theme";

export function LoadingView({ label }: { label: string }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator color={colors.accent} size="large" />
      <Text style={styles.muted}>{label}</Text>
    </View>
  );
}

export function ErrorView({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <View style={styles.center}>
      <Ionicons name="cloud-offline-outline" size={34} color={colors.danger} />
      <Text style={styles.title}>{message}</Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      )}
    </View>
  );
}

export function EmptyView({ query }: { query: string }) {
  return (
    <View style={styles.center}>
      <Ionicons name="search-outline" size={34} color={colors.textFaint} />
      <Text style={styles.title}>No city named “{query}”</Text>
      <Text style={styles.muted}>Check the spelling and try again.</Text>
    </View>
  );
}

export function IdleView() {
  return (
    <View style={styles.center}>
      <Ionicons name="partly-sunny-outline" size={40} color={colors.accent} />
      <Text style={styles.title}>Where are you headed?</Text>
      <Text style={styles.muted}>
        Search for any city to see the current weather and a 7-day forecast.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
  muted: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    marginTop: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#10203a",
    fontWeight: "700",
    fontSize: 14,
  },
});
