import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ images, fav, foundedMovies }) {
  const [isLoading, setIsLoading] = useState(false);

  function handleMoreClick() {
    setIsLoading(!isLoading);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "м";
  }

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__items">
        {foundedMovies.map((items, index) => (
          <MoviesCard
            img={`https://api.nomoreparties.co/${items.image.url}`}
            title={items.nameRU}
            time={getTimeFromMins(items.duration)}
            link={items.trailerLink}
            // fav={fav}
            key={items.id}
          />
        ))}
      </ul>
      <button
        className={` moviesCardList__more-button
                ${
                  fav
                    ? "moviesCardList__more-button_type_movie-safe"
                    : "moviesCardList__more-button_type_movie"
                }
                    `}
        type="button"
        onClick={handleMoreClick}
      >
        Ещё
      </button>

      {isLoading && <Preloader />}
    </section>
  );
}

export default MoviesCardList;
