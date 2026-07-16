import type { Movie } from "../types/Movie";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <article className="movie-card">
      {posterUrl ? (
        <img src={posterUrl} alt={`${movie.title} poster`} />
      ) : (
        <div className="no-poster">No poster available</div>
      )}

      <div className="movie-card-content">
        <h2>{movie.title}</h2>

        <p>⭐ {movie.vote_average.toFixed(1)}</p>

        <p>
          📅 {movie.release_date || "Release date unavailable"}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;