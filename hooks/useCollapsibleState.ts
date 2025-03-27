import { useState, useRef, useEffect } from "react";
import { Animated, LayoutAnimation } from "react-native";

export const useCollapsibleState = () => {
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const animationValues = useRef<{ [key: string]: Animated.Value }>({});

  useEffect(() => {
    return () => {
      Object.values(animationValues.current).forEach((value) => {
        value && value.stopAnimation();
      });
    };
  }, []);

  const initializeAnimations = (keys: string[], defaultValue = false) => {
    const initialState: { [key: string]: boolean } = {};

    keys.forEach((key) => {
      initialState[key] = defaultValue;
      if (!animationValues.current[key]) {
        animationValues.current[key] = new Animated.Value(defaultValue ? 1 : 0);
      }
    });

    setExpandedCategories(initialState);
  };

  const toggleExpansion = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (!animationValues.current[key]) {
      animationValues.current[key] = new Animated.Value(
        expandedCategories[key] ? 1 : 0
      );
    }

    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    const animValue = animationValues.current[key];
    if (animValue) {
      Animated.timing(animValue, {
        toValue: expandedCategories[key] ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const getRotationAnimation = (key: string) => {
    if (!animationValues.current[key]) {
      const initialValue = expandedCategories[key] ? 1 : 0;
      animationValues.current[key] = new Animated.Value(initialValue);
    }

    return animationValues.current[key].interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"],
    });
  };

  return {
    expandedCategories,
    initializeAnimations,
    toggleExpansion,
    getRotationAnimation,
  };
};
