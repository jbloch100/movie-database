import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import { getPopularMovies, searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadMovies() {
      const popularMovies = await getPopularMovies();
      console.log(popularMovies);
      setMovies(popularMovies);
    }

    loadMovies();
  }, []);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!searchTerm.trim()) {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      return;
    }

    const results = await searchMovies(searchTerm);
    setMovies(results);
  }

  function handleAddToFavorites(movie: Movie) {
    const savedFavorites = localStorage.getItem("favoriteMovies");

    const favorites: Movie[] = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

    const movieAlreadyAdded = favorites.some(
      (favoriteMovie) => favoriteMovie.id === movie.id
    );

    if (movieAlreadyAdded) {
      return;
    }

    const updatedFavorites = [...favorites, movie];

    localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(updatedFavorites)
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