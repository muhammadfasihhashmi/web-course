const baseUrl = "http://www.omdbapi.com/?";

import { useEffect, useState } from "react";
import { ApiKey } from "../App";

function MovieDetails({ isSelected, setIsSelected }) {
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const response = await fetch(
          `${baseUrl}apikey=${ApiKey}&i=${isSelected}`
        );
        if (!response.ok) throw new Error("network error");
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.log(error);
      }
    }
    getMovieDetails();
  }, [isSelected]);

  const {
    imdbID,
    Poster,
    Released,
    Runtime,
    Genre,
    imdbRating,
    Plot,
    Actors,
    Director,
    Title,
  } = movieDetails;

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

  //   useEffect(() => {
  //     if (!Title) return;
  //     document.title = Title;
  //     //cleanup function
  //     return () => {
  //       document.title = "Use Popcorn";
  //     };
  //   }, [selectedMovie, Title]);

  return (
    <>
      <div className="details">
        <header className="">
          <button className="back-button" onClick={() => setIsSelected(null)}>
            <i className="fa-solid fa-left-long"></i>
          </button>
          <img src={Poster} alt={`Poster of ${Title} movie`} />
          <div className="details-overview">
            <h2>{Title}</h2>
            <p>
              {Released} &bull; {Runtime}
            </p>
            <p>{Genre}</p>
            <p>
              <span>⭐️</span>
              {imdbRating} rating
            </p>
          </div>
        </header>
        <section>
          {/* <div className="rating">
            {isMatched ? (
              `Your given rating is ${matchedMovie.userRating} ⭐`
            ) : (
              <>
                <RatingStars
                  size={25}
                  PermanentStars={PermanentStars}
                  setPermanentStars={setPermanentStars}
                  timesUserRated={timesUserRated}
                />
                {PermanentStars && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </button>
                )}
              </>
            )}
          </div> */}
          <p>
            <em>{Plot}</em>
          </p>
          <p>Starring {Actors}</p>
          <p>Directed by {Director}</p>
        </section>
      </div>
    </>
  );
}

export default MovieDetails;
