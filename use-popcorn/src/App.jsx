import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import WatchedBox from "./components/WatchedBox";
import MoviesBox from "./components/MoviesBox";
import MovieDetails from "./components/MovieDetails";

export const ApiKey = "b4ec1a51";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isSelected, setIsSelected] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setIsError("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${ApiKey}&s=${query}`
        );

        if (!response.ok) {
          throw new Error("Network error");
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
      } catch (error) {
        setMovies([]);
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length > 2) {
      getMovies();
    }
    if (query.length < 2) {
      setIsError("Try searching something !!!");
      setMovies([]);
    }
  }, [query]);

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />

      <main className="main">
        <MoviesBox
          movies={movies}
          isLoading={isLoading}
          isError={isError}
          setIsSelected={setIsSelected}
        />
        {isSelected ? (
          <div className="box">
            <MovieDetails
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />
          </div>
        ) : (
          <WatchedBox watched={watched} />
        )}
      </main>
    </>
  );
}
