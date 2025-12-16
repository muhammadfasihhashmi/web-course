import ErrorMessage from "./ErrorMessage";
import Movie from "./Movie";

function MovieList({ movies, isLoading, isError }) {
  return (
    <>
      {isLoading && <div className="loader">loading...</div>}
      {isError && <ErrorMessage message={isError} />}
      {!isLoading && !isError && (
        <ul className="list">
          {movies?.map((movie) => (
            <Movie movie={movie} />
          ))}
        </ul>
      )}
    </>
  );
}

export default MovieList;
