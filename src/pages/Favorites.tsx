import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";

function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteMovies");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  function handleRemoveFromFavorites(movie: Movie) {
    const updatedFavorites = favorites.filter(
      (favoriteMovie) => favoriteMovie.id !== movie.id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(updatedFavorites)
    );
  }

  return (
    <main>
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p>You haven't added any favorite movies yet.</p>
      ) : (
        <section className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              buttonText="🗑️ Remove from Favorites"
              onButtonClick={handleRemoveFromFavorites}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default Favorites;