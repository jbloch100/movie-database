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
  const [activeSearch, setActiveSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const results = activeSearch
          ? await searchMovies(activeSearch, page)
          : await getPopularMovies(page);

        setMovies(results);
      } catch (error) {
        console.error(error);

        setErrorMessage(
          activeSearch
            ? "Unable to search movies."
            : "Unable to load movies."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, [page, activeSearch]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const trimmedSearch = searchTerm.trim();

    setPage(1);
    setActiveSearch(trimmedSearch);
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
      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </main>
  );
}

export default Home;