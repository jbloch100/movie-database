import type { Movie } from "../types/Movie";

const FAVORITES_KEY = "favoriteMovies";

export function getFavorites(): Movie[] {
  const savedFavorites = localStorage.getItem(FAVORITES_KEY);

  return savedFavorites ? JSON.parse(savedFavorites) : [];
}

export function addToFavorites(movie: Movie): void {
  const favorites = getFavorites();

  const movieAlreadyAdded = favorites.some(
    (favoriteMovie) => favoriteMovie.id === movie.id
  );

  if (movieAlreadyAdded) {
    return;
  }

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify([...favorites, movie])
  );
}

export function removeFromFavorites(movieId: number): void {
  const favorites = getFavorites();

  const updatedFavorites = favorites.filter(
    (movie) => movie.id !== movieId
  );

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updatedFavorites)
  );
}