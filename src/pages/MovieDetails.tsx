import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/tmdb";
import type { Movie } from "../types/Movie";
import { addToFavorites } from "../services/favorites";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function loadMovieDetails() {
      if (!id) {
        console.log("joker");
        return;
      }

      const selectedMovie = await getMovieDetails(id);

      setMovie(selectedMovie);
    }

    loadMovieDetails();
  }, [id]);

  function handleAddToFavorites() {
    if (!movie) {
      return;
    }

    addToFavorites(movie);
  }

  if (!movie) {
    return (
      <main>
        <p>Loading movie details...</p>
      </main>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <main>
      <Link className="back-link" to="/">
        ← Back to Home
      </Link>
      <div className="movie-details">
        {posterUrl ? (
          <img
            className="movie-details-poster"
            src={posterUrl}
            alt={`${movie.title} poster`}
          />
        ) : (
          <div className="movie-details-no-poster">
            No poster available
          </div>
        )}

        <div className="movie-details-content">
          <h1>{movie.title}</h1>

          <p>⭐ {movie.vote_average.toFixed(1)}</p>

          <p>
            📅 {movie.release_date || "Release date unavailable"}
          </p>

          <p>{movie.overview || "No overview available."}</p>

          <button onClick={handleAddToFavorites}>
            ❤️ Add to Favorites
          </button>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;