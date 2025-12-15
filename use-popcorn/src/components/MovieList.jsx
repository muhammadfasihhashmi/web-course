import ErrorMessage from "./ErrorMessage";
import Movie from "./Movie";

function MovieList({ movies, isLoading, isError }) {
  return (
    <>
      {isError && <ErrorMessage message={isError} />}
      {isLoading ? (
        <div className="loader">loading..</div>
      ) : (
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
