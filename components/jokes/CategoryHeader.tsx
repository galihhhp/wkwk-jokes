import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

interface CategoryHeaderProps {
  title: string;
  index: number;
  isExpanded: boolean;
  arrowRotation: Animated.AnimatedInterpolation<string>;
  onToggle: () => void;
  onMoveToTop: (e: any) => void;
  color?: string;
}

const CategoryHeader = ({
  title,
  index,
  isExpanded,
  arrowRotation,
  onToggle,
  onMoveToTop,
  color = "#5c6bc0"
}: CategoryHeaderProps) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onToggle}
    style={[
      styles.categoryHeader,
      isExpanded && styles.categoryHeaderExpanded,
    ]}>
    <View style={styles.headerLeftSection}>
      <View style={[styles.numberBadge, { backgroundColor: color }]}>
        <Text style={styles.numberText}>{index + 1}</Text>
      </View>
      <Text style={styles.categoryName}>{title}</Text>
    </View>

    <View style={styles.headerRightSection}>
      <TouchableOpacity
        style={[styles.topButton, { backgroundColor: color }]}
        onPress={onMoveToTop}>
        <Ionicons
          name="arrow-up"
          size={14}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Top</Text>
      </TouchableOpacity>

      <Animated.View
        style={{
          transform: [{ rotate: arrowRotation }],
          marginLeft: 12,
          width: 24,
          height: 24,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Ionicons name="chevron-forward" size={20} color={color} />
      </Animated.View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f5",
  },
  categoryHeaderExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerLeftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerRightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  categoryName: {
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 12,
    textTransform: "capitalize",
    color: "#343a40",
    flex: 1,
  },
  topButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  buttonIcon: {
    marginRight: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default CategoryHeader;