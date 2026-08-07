import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import { 
  getPopularMovies, 
  searchMovies, 
  getMovieGenres, 
  getMoviesByGenre 
} from "../services/tmdb";
import type { Genre } from "../types/Genre";
import { addToFavorites } from "../services/favorites";
import MovieCard from "../components/MovieCard";
import type { MovieResponse } from "../types/MovieResponse";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        let response: MovieResponse;

        if (activeSearch) {
          response = await searchMovies(activeSearch, page);
          if (selectedGenre) {
            response.results = response.results.filter((movie) =>
              movie.genre_ids?.includes(Number(selectedGenre))
            );
          }
        } else if (selectedGenre) {
          response = await getMoviesByGenre(selectedGenre, page);
        } else {
          response = await getPopularMovies(page);
        }

        setMovies(response.results);
        setTotalPages(Math.min(response.total_pages, 500));
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
  }, [page, activeSearch, selectedGenre]);

  useEffect(() => {
    async function loadGenres() {
      try {
        const genreList = await getMovieGenres();
        setGenres(genreList);
      } catch (error) {
        console.error(error);
      }
    }

    loadGenres();
  }, []);

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

      <select
        value={selectedGenre}
        onChange={(e) => {
          setSelectedGenre(e.target.value);
          setPage(1);
        }}
      >
        <option value="">All Genres</option>

        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

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
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          First Page
        </button>

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button 
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>

        <button 
          onClick={() => setPage(totalPages)}
          disabled={page >= totalPages}
        >
          Last Page
        </button>
      </div>
    </main>
  );
}

export default Home;