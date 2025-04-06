import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../components/tmdbAPI";
import MovieList from "../components/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <div>
      <p>Trending Today</p>
      <MovieList movies={movies} />
    </div>
  );
}
