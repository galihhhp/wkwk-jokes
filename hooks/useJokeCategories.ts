import { useState, useEffect } from "react";
import { Category } from "@/types/jokes";
import { fetchCategories, fetchJokesForCategory } from "@/services/jokeService";

export const useJokeCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCategoriesAndJokes = async () => {
    try {
      setLoading(true);
      const categoryNames = await fetchCategories();
      const categoriesWithJokes = await Promise.all(
        categoryNames.map(async (name: string) => {
          const jokes = await fetchJokesForCategory(name);
          return { name, jokes };
        })
      );

      setCategories(categoriesWithJokes);
      return categoryNames;
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addMoreJokes = async (categoryIndex: number) => {
    const updatedCategories = [...categories];
    const category = updatedCategories[categoryIndex];

    const newJokes = await fetchJokesForCategory(category.name);
    updatedCategories[categoryIndex] = {
      ...category,
      jokes: [...category.jokes, ...newJokes],
    };

    setCategories(updatedCategories);
    return `${category.name}-${categoryIndex}`;
  };

  const moveToTop = (index: number) => {
    if (index === 0) return;

    const updatedCategories = [...categories];
    const categoryToMove = updatedCategories.splice(index, 1)[0];
    updatedCategories.unshift(categoryToMove);

    setCategories(updatedCategories);
  };

  useEffect(() => {
    loadCategoriesAndJokes();
  }, []);

  return {
    categories,
    loading,
    refreshing,
    setRefreshing,
    loadCategoriesAndJokes,
    addMoreJokes,
    moveToTop,
  };
};
