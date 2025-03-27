import React, { useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
  UIManager,
  RefreshControl,
  StatusBar,
} from "react-native";
import { useJokeCategories } from "@/hooks/useJokeCategories";
import { useCollapsibleState } from "@/hooks/useCollapsibleState";
import { useAddMoreTracker } from "@/hooks/useAddMoreTracker";
import LoadingIndicator from "@/components/jokes/LoadingIndicator";
import EmptyState from "@/components/jokes/EmptyState";
import CategoryItem from "@/components/jokes/CategoryItem";
import { Category } from "@/types/jokes";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PRIMARY_COLOR = "#5c6bc0";

const JokeScreen = () => {
  const {
    categories,
    loading,
    refreshing,
    setRefreshing,
    loadCategoriesAndJokes,
    addMoreJokes,
    moveToTop,
  } = useJokeCategories();

  const {
    expandedCategories,
    initializeAnimations,
    toggleExpansion,
    getRotationAnimation,
  } = useCollapsibleState();

  const { clickCounts, incrementCount, resetAllCounts, isLimitReached } =
    useAddMoreTracker();

  const flatListRef = useRef<FlatList>(null);

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      resetAllCounts();
      const categoryNames = await loadCategoriesAndJokes();

      const categoryKeys = categoryNames.map(
        (name, index) => `${name}-${index}`
      );
      initializeAnimations(categoryKeys, false);
    } catch (error) {
      Alert.alert("Error", "Failed to refresh jokes. Pull down to try again.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleAddMore = async (index: number) => {
    const categoryKey = await addMoreJokes(index);
    incrementCount(categoryKey);
  };

  const handleMoveToTop = (index: number) => {
    moveToTop(index);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const renderCategoryItem = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    const categoryKey = `${item.name}-${index}`;
    const isExpanded = expandedCategories[categoryKey] || false;

    return (
      <CategoryItem
        item={item}
        index={index}
        isExpanded={isExpanded}
        arrowRotation={getRotationAnimation(categoryKey)}
        onToggle={() => toggleExpansion(categoryKey)}
        onMoveToTop={(e) => {
          e.stopPropagation();
          handleMoveToTop(index);
        }}
        onAddMoreJokes={() => handleAddMore(index)}
        isLimitReached={isLimitReached(categoryKey)}
        color={PRIMARY_COLOR}
      />
    );
  };

  if (loading) {
    return <LoadingIndicator color={PRIMARY_COLOR} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      {categories.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          ref={flatListRef}
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[PRIMARY_COLOR]}
              tintColor={PRIMARY_COLOR}
              title="Refreshing jokes..."
              titleColor="#6c757d"
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
});

export default JokeScreen;
