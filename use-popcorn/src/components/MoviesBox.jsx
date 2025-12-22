import { useState } from "react";
import MovieList from "./MovieList";
import ErrorMessage from "./ErrorMessage";

function MoviesBox({ movies, isLoading, isError, setIsSelected }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>

      {isOpen1 && (
        <MovieList
          movies={movies}
          isLoading={isLoading}
          isError={isError}
          setIsSelected={setIsSelected}
        />
      )}
    </div>
  );
}

export default MoviesBox;
