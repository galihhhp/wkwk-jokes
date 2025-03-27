import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Joke } from '@/types/jokes';

interface JokeItemProps {
  joke: Joke;
  color?: string;
}

const JokeItem = ({ joke, color = "#5c6bc0" }: JokeItemProps) => (
  <TouchableOpacity
    style={styles.jokeItem}
    activeOpacity={0.7}
    onPress={() => Alert.alert("Joke", joke.joke)}>
    <View style={styles.jokeContent}>
      <Text style={styles.jokeText}>{joke.joke}</Text>
      <View style={styles.jokeIconContainer}>
        <Ionicons name="happy-outline" size={18} color={color} />
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  jokeItem: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  jokeContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  jokeText: {
    fontSize: 15,
    color: "#495057",
    lineHeight: 22,
    flex: 1,
  },
  jokeIconContainer: {
    marginLeft: 8,
    alignSelf: "flex-start",
  },
});

export default JokeItem;