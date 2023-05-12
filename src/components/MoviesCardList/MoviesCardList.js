import MoviesCard from "../MoviesCard/MoviesCard";
import { getTimeFromMins } from "../../utils/getTimeFromMins";

function MoviesCardList({
  fav,
  isMore,
  handleMoreClick,
  newMovies,
  handleLikeClick,
}) {
  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__items">
        {newMovies.map((item) => (
          <MoviesCard
            card={item}
            img={
              fav
                ? item.image
                : `https://api.nomoreparties.co/${item.image.url}`
            }
            title={item.nameRU}
            time={getTimeFromMins(item.duration)}
            link={item.trailerLink}
            fav={fav}
            key={fav ? item._id : item.id}
            handleLikeClick={handleLikeClick}
          />
        ))}
      </ul>

      {isMore && (
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
      )}
    </section>
  );
}

export default MoviesCardList;
