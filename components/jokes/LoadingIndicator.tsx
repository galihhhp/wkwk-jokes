import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

interface LoadingIndicatorProps {
  color?: string;
  message?: string;
}

const LoadingIndicator = ({
  color = "#5c6bc0",
  message = "Loading jokes...",
}: LoadingIndicatorProps) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={color} />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6c757d",
  },
});

export default LoadingIndicator;
