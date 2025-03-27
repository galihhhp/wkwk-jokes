import { Joke, Category } from '@/types/jokes';


export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/categories');
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    return [];
  }
};

export const fetchJokesForCategory = async (category: string): Promise<Joke[]> => {
  try {
    const response = await fetch(`https://v2.jokeapi.dev/joke/${category}?type=single&amount=2`);
    const data = await response.json();

    if (data.error) {
      return [];
    }

    return data.jokes.map((joke: any) => ({
      id: Math.random().toString(36).substring(2, 9),
      joke: joke.joke,
    }));
  } catch (error) {
    return [];
  }
};