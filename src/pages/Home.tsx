import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import { getPopularMovies, searchMovies } from "../services/tmdb";
import { addToFavorites } from "../services/favorites";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const popularMovies = await getPopularMovies();

        setMovies(popularMovies);
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to load movies.");
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, []);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);
      setErrorMessage("");

      if (!searchTerm.trim()) {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        return;
      }

      const results = await searchMovies(searchTerm);
      setMovies(results);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to search movies.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleAddToFavorites(movie: Movie) {
    addToFavorites(movie);
  }

  if (isLoading) {
    return (
      <main>
        <h1>Movie Database</h1>

        <p>Loading movies...</p>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main>
        <h1>Movie Database</h1>

        <p className="error-message">{errorMessage}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Movie Database</h1>
      <p>Discover popular movies and search for your favorites.</p>
      <form className="movie-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>
      <section className="movie-grid">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            buttonText="❤️ Add to Favorites"
            onButtonClick={handleAddToFavorites} 
          />
        ))}
      </section>
    </main>
  );
}

export default Home;