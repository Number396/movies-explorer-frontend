import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ images, fav, foundedMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [end, setEnd] = useState();
  const [newMovies, setNewMovies] = useState([]);

  const SCREEN_SM = 320;
  const SCREEN_MD = 768;
  const SCREEN_LG = 1244;
  // const SCREEN_XL = 1200;
  // const SCREEN_XXL = 1400;

  const useResize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = (event) => {
        setWidth(event.target.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return {
      width,
      isScreenSm: width >= SCREEN_SM && width < SCREEN_MD,
      isScreenMd: width >= SCREEN_MD && width < SCREEN_LG,
      isScreenLg: width >= SCREEN_LG,
      // isScreenXl: width >= SCREEN_XL,
      // isScreenXxl: width >= SCREEN_XXL,
    };
  };

  const { width, isScreenSm, isScreenMd, isScreenLg } = useResize();

  useEffect(() => {
    if (isScreenSm) {
      setNewMovies(foundedMovies.slice(0, 5));
    }
    if (isScreenMd) {
      setNewMovies(foundedMovies.slice(0, 8));
    }
    if (isScreenLg) {
      setNewMovies(foundedMovies.slice(0, 12));
      // setEnd(16);
    }
  }, [width, foundedMovies]);

  function handleMoreClick() {
    // setIsLoading(!isLoading);
    console.log(isScreenSm);
    console.log(isScreenMd);
    console.log(isScreenLg);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "м";
  }

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__items">
        {/* {foundedMovies.map((items) => ( */}
        {newMovies.map((items) => (
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
