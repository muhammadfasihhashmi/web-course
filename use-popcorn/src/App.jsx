import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import WatchedBox from "./components/WatchedBox";
import MoviesBox from "./components/MoviesBox";

export const ApiKey = "b4ec1a51";

// api url
// `http://www.omdbapi.com/?apikey=${ApiKey}&s=${query}`

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

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
  const [isLoading, setISLoading] = useState(false);
  const [isError, setIsError] = useState("");

  console.log(movies);

  useEffect(() => {
    async function getMovies() {
      try {
        setISLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${ApiKey}&s=${query}`
        );
        if (!response.ok) throw new Error("netwrok error");
        const data = await response.json();
        if (data.response === false) throw new Error("data not found");
        setMovies(data.Search);
        setISLoading(false);
      } catch (error) {
        setIsError("movie not found");
        console.log(error);
      } finally {
        setIsError("");
      }
    }
    if (query.length > 1) {
      getMovies();
      setIsError("");
    }
    if (query.length === 0) {
      setIsError("search movies...");
    }
  }, [query]);

  return (
    <>
      <Navbar movies={movies} setQuery={setQuery} query={query} />
      <main className="main">
        <MoviesBox movies={movies} isLoading={isLoading} isError={isError} />
        <WatchedBox watched={watched} />
      </main>
    </>
  );
}
