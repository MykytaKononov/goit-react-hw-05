import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../components/tmdbAPI";
import MovieList from "../components/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchMoviesByQuery(query);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (query) {
      fetchMovies();
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value.trim();
    setSearchParams(searchQuery ? { query: searchQuery } : {});
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>

      <MovieList movies={movies} />
    </div>
  );
}
