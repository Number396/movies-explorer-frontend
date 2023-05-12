// import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
// import { useResize } from "../../hooks/useResize";
import { getTimeFromMins } from "../../utils/getTimeFromMins";
import { useState } from "react";

function MoviesCardList({
  // images,
  fav,
  // foundedMovies,
  isMore,
  handleMoreClick,
  newMovies,
  // isLiked,
  handleLikeClick,
}) {
  // const [isLoading, setIsLoading] = useState(false);
  // const [newMovies, setNewMovies] = useState([]);
  // const [countS, setCountS] = useState(7);
  // const [countM, setCountM] = useState(10);
  // const [countL, setCountL] = useState(16);
  // const [isMore, setIsMore] = useState(false);

  // const SCREEN_SM = 320;
  // const SCREEN_MD = 768;
  // const SCREEN_LG = 1244;

  // const useResize = () => {
  //   const [width, setWidth] = useState(window.innerWidth);

  //   useEffect(() => {
  //     const handleResize = (event) => {
  //       setWidth(event.target.innerWidth);
  //     };
  //     window.addEventListener("resize", handleResize);
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);

  //   return {
  //     width,
  //     isScreenSm: width >= SCREEN_SM && width < SCREEN_MD,
  //     isScreenMd: width >= SCREEN_MD && width < SCREEN_LG,
  //     isScreenLg: width >= SCREEN_LG,
  //     // isScreenXl: width >= SCREEN_XL,
  //     // isScreenXxl: width >= SCREEN_XXL,
  //   };
  // };
  // const { width, isScreenSm, isScreenMd, isScreenLg } = useResize();

  // useEffect(() => {
  //   // console.log("base");

  //   if (isScreenSm) {
  //     if (foundedMovies.length >= 6) {
  //       setIsMore(true);
  //     } else {
  //       setIsMore(false);
  //     }

  //     setNewMovies(foundedMovies.slice(0, 5));
  //     setCountS(7);
  //   }

  //   if (isScreenMd) {
  //     if (foundedMovies.length >= 9) {
  //       setIsMore(true);
  //     } else {
  //       setIsMore(false);
  //     }

  //     setNewMovies(foundedMovies.slice(0, 8));
  //     setCountM(10);
  //   }
  //   if (isScreenLg) {
  //     if (foundedMovies.length >= 13) {
  //       setIsMore(true);
  //     } else {
  //       setIsMore(false);
  //     }

  //     setNewMovies(foundedMovies.slice(0, 12));
  //     setCountL(16);
  //   }
  // }, [width, foundedMovies]);

  // function handleMoreClick() {
  //   // console.log(foundedMovies.length);

  //   // setIsLoading(!isLoading);
  //   // if (isScreenMd) {
  //   //   setNewMovies(foundedMovies.slice(0, 8));
  //   // }
  //   if (isScreenSm) {
  //     setNewMovies(foundedMovies.slice(0, countS));
  //     setCountS(countS + 2);
  //     // console.log("countS", countS);
  //     if (foundedMovies.length <= countS) {
  //       setIsMore(false);
  //       setCountS(7);
  //     }
  //   }

  //   if (isScreenMd) {
  //     setNewMovies(foundedMovies.slice(0, countM));
  //     setCountM(countM + 2);
  //     // console.log("countM", countM);
  //     if (foundedMovies.length <= countM) {
  //       setIsMore(false);
  //       setCountM(10);
  //     }
  //   }

  //   if (isScreenLg) {
  //     setNewMovies(foundedMovies.slice(0, countL));
  //     setCountL(countL + 4);
  //     // console.log("countL", countL);
  //     if (foundedMovies.length <= countL) {
  //       setIsMore(false);
  //       setCountL(16);
  //     }
  //   }
  // }

  // function getTimeFromMins(mins) {
  //   let hours = Math.trunc(mins / 60);
  //   let minutes = mins % 60;
  //   return hours + "ч " + minutes + "м";
  // }

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__items">
        {/* {foundedMovies.map((items) => ( */}
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
            // isLiked={isLiked}
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

      {/* {isLoading && <Preloader />} */}
    </section>
  );
}

export default MoviesCardList;
