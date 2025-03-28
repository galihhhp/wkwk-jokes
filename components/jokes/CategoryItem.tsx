import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Joke, Category } from "@/types/jokes";
import { Animated } from "react-native";
import JokeItem from "./JokeItem";
import CategoryHeader from "./CategoryHeader";
import AddMoreButton from "./AddMoreButton";

interface CategoryItemProps {
  item: Category;
  index: number;
  isExpanded: boolean;
  arrowRotation: Animated.AnimatedInterpolation<string>;
  onToggle: () => void;
  onMoveToTop: (e: any) => void;
  onAddMoreJokes: () => void;
  isLimitReached: boolean;
  color?: string;
}

const CategoryItem = ({
  item,
  index,
  isExpanded,
  arrowRotation,
  onToggle,
  onMoveToTop,
  onAddMoreJokes,
  isLimitReached,
  loadingJokes,
  color = "#5c6bc0",
}: CategoryItemProps & { loadingJokes: string | null }) => {
  const renderJokeItem = ({ item: joke }: { item: Joke }) => (
    <JokeItem joke={joke} color={color} />
  );

  const categoryKey = `${item.name}-${index}`;

  return (
    <View style={styles.categoryContainer}>
      <CategoryHeader
        title={item.name}
        index={index}
        isExpanded={isExpanded}
        arrowRotation={arrowRotation}
        onToggle={onToggle}
        onMoveToTop={onMoveToTop}
        color={color}
      />

      {isExpanded && (
        <View style={styles.jokesContainer}>
          {item.jokes.length === 0 ? (
            <Text style={styles.emptyMessage}>
              Oops! The jokes must’ve gone on vacation.
            </Text>
          ) : (
            <FlatList
              data={item.jokes}
              keyExtractor={(joke) => joke.id || Math.random().toString()}
              renderItem={renderJokeItem}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View style={styles.jokeSeparator} />
              )}
            />
          )}

          {item.jokes.length !== 0 && (
            <AddMoreButton
              onPress={onAddMoreJokes}
              isLimitReached={isLimitReached}
              loading={loadingJokes === categoryKey}
              color={color}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  jokesContainer: {
    padding: 16,
  },
  jokeSeparator: {
    height: 12,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default CategoryItem;
