import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getFavorites, removeFromFavorites } from "../services/favorites";
import type { Movie } from "../types/Movie";

function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  function handleRemoveFromFavorites(movie: Movie) {
    removeFromFavorites(movie.id);

    setFavorites(getFavorites());
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