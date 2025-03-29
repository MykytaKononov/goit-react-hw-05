import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTrendingMovies } from "../components/tmdbAPI";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <div>
      <p>Trending Today</p>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ movie }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
