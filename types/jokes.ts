export interface Joke {
  id: string;
  joke: string;
}

export interface Category {
  name: string;
  jokes: Joke[];
}