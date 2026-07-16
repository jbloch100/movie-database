import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import { getPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadMovies() {
      const popularMovies = await getPopularMovies();
      console.log(popularMovies);
      setMovies(popularMovies);
    }

    loadMovies();
  }, []);

  return (
    <main>
      <h1>Movie Database</h1>
      <p>Discover popular movies and search for your favorites.</p>
      <section className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  );
}

export default Home;