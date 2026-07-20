import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/tmdb";
import type { Movie } from "../types/Movie";

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

  if (!movie) {
    return (
      <main>
        <p>Loading movie details...</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{movie.title}</h1>

      <p>⭐ {movie.vote_average.toFixed(1)}</p>

      <p>
        📅 {movie.release_date || "Release date unavailable"}
      </p>

      <p>{movie.overview}</p>
    </main>
  );
}

export default MovieDetails;