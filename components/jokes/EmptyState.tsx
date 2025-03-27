import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IoniconsNames = React.ComponentProps<typeof Ionicons>["name"];

interface EmptyStateProps {
  iconName?: IoniconsNames;
  iconSize?: number;
  iconColor?: string;
  primaryText?: string;
  secondaryText?: string;
}

const EmptyState = ({
  iconName = "sad-outline",
  iconSize = 60,
  iconColor = "#adb5bd",
  primaryText = "No joke categories found",
  secondaryText = "Pull down to try again",
}: EmptyStateProps) => (
  <View style={styles.emptyStateContainer}>
    <Ionicons name={iconName} size={iconSize} color={iconColor} />
    <Text style={styles.emptyStatePrimaryText}>{primaryText}</Text>
    {secondaryText && (
      <Text style={styles.emptyStateSecondaryText}>{secondaryText}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  emptyStateContainer: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStatePrimaryText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#495057",
    marginTop: 16,
    textAlign: "center",
  },
  emptyStateSecondaryText: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 8,
    textAlign: "center",
  },
});

export default EmptyState;
