import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AddMoreButtonProps {
  onPress: () => void;
  isLimitReached: boolean;
  color?: string;
}

const AddMoreButton = ({
  onPress,
  isLimitReached,
  color = "#5c6bc0",
}: AddMoreButtonProps) => (
  <View style={styles.footerContainer}>
    {!isLimitReached ? (
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: color }]}
        onPress={onPress}>
        <Ionicons
          name="add-circle-outline"
          size={18}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Add more jokes</Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.limitContainer}>
        <Ionicons name="information-circle-outline" size={18} color="#6c757d" />
        <Text style={styles.limitText}>
          Maximum jokes reached for this category
        </Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    minWidth: 160,
  },
  buttonIcon: {
    marginRight: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  limitContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f1f3f5",
    borderRadius: 12,
  },
  limitText: {
    color: "#6c757d",
    fontSize: 14,
    marginLeft: 6,
  },
});

export default AddMoreButton;
