import type { Movie } from "../types/Movie";
import type { Genre } from "../types/Genre";
import type { MovieResponse } from "../types/MovieResponse";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function getPopularMovies(page: number = 1): Promise<MovieResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?page=${page}`,
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

  return response.json();
}

export async function searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search movies.");
  }

  return response.json();
}

export async function getMovieDetails(id: string): Promise<Movie> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details.");
  }

  return response.json();
}

export async function getMovieGenres(): Promise<Genre[]> {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list",
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch genres.");
  }

  const data = await response.json();

  return data.genres;
}

export async function getMoviesByGenre(
  genreId: string,
  page: number = 1
): Promise<MovieResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies by genre.");
  }

  return response.json();
}