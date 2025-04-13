import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../components/tmdbAPI";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const genres = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <img
          src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : ""}
          alt={movie.title}
          style={{ width: "300px", borderRadius: "10px" }}
        />
        <div>
          <h1>
            {movie.title} ({movie.release_date.split("-")[0]})
          </h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <p>{movie.overview}</p>
          <p>Genres: {genres}</p>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Additional Information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: location.state?.from }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: location.state?.from }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
