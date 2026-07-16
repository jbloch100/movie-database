import type { Movie } from "../types/Movie";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function getPopularMovies(): Promise<Movie[]> {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular",
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies.");
  }

  const data = await response.json();

  return data.results;
}