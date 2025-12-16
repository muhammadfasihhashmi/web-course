import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import WatchedBox from "./components/WatchedBox";
import MoviesBox from "./components/MoviesBox";

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
        <MoviesBox movies={movies} isLoading={isLoading} isError={isError} />
        <WatchedBox watched={watched} />
      </main>
    </>
  );
}

// import { useEffect, useRef, useState } from "react";
// import { ApiKey } from "../App";
// import LoadingSpinner from "./LoadingSpinner";
// import ErrorMessage from "./ErrorMessage";
// import RatingStars from "./RatingStars";
// import { useMovieDetail } from "../hooks/useMovieDetail";

// function MovieDetails({
//   selectedMovie,
//   handleSetWatched,
//   watched,
//   handleSelectedMovie,
// }) {
//   const timesUserRated = useRef(0);

//   const [PermanentStars, setPermanentStars] = useState(null);
//   //custom hook
//   const { isLoading, error, movieDetails } = useMovieDetail({
//     ApiKey,
//     movieID: selectedMovie,
//   });

//   const {
//     imdbID,
//     Poster,
//     Released,
//     Runtime,
//     Genre,
//     imdbRating,
//     Plot,
//     Actors,
//     Director,
//     Title,
//   } = movieDetails;

//   function handleAdd() {
//     const movie = {
//       imdbID,
//       Poster,
//       Title,
//       imdbRating: Number(imdbRating),
//       userRating: PermanentStars,
//       runtime: Number(Runtime.split(" ")[0]),
//       timesUserRated: timesUserRated.current,
//     };
//     handleSetWatched(movie);
//     handleSelectedMovie(null);
//   }

//   const isMatched = watched.some((movie) => selectedMovie === movie.imdbID);

//   const matchedMovie = watched.find((movie) => selectedMovie === movie.imdbID);

//   useEffect(() => {
//     if (!Title) return;
//     document.title = Title;
//     //cleanup function
//     return () => {
//       document.title = "Use Popcorn";
//     };
//   }, [selectedMovie, Title]);

//   return (
//     <>
//       {error && <ErrorMessage error={error} />}
//       {isLoading && <LoadingSpinner />}
//       {!error && !isLoading && (
//         <div className="details">
//           <header>
//             <button
//               className="back-button"
//               onClick={() => handleSelectedMovie(null)}
//             >
//               <i className="fa-solid fa-left-long"></i>
//             </button>
//             <img src={Poster} alt={`Poster of ${Title} movie`} />
//             <div className="details-overview">
//               <h2>{Title}</h2>
//               <p>
//                 {Released} &bull; {Runtime}
//               </p>
//               <p>{Genre}</p>
//               <p>
//                 <span>⭐️</span>
//                 {imdbRating} rating
//               </p>
//             </div>
//           </header>
//           <section>
//             <div className="rating">
//               {isMatched ? (
//                 `Your given rating is ${matchedMovie.userRating} ⭐`
//               ) : (
//                 <>
//                   <RatingStars
//                     size={25}
//                     PermanentStars={PermanentStars}
//                     setPermanentStars={setPermanentStars}
//                     timesUserRated={timesUserRated}
//                   />
//                   {PermanentStars && (
//                     <button className="btn-add" onClick={handleAdd}>
//                       + Add to list
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//             <p>
//               <em>{Plot}</em>
//             </p>
//             <p>Starring {Actors}</p>
//             <p>Directed by {Director}</p>
//           </section>
//         </div>
//       )}
//     </>
//   );
// }

// export default MovieDetails;
