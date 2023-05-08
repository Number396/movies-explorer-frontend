import { useEffect, useState } from "react";

function MoviesCard({
  img,
  title,
  time,
  fav,
  link,
  // isLiked,
  handleLikeClick,
  card,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));

  function checkIsLike() {
    // const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const res = savedMovies.some((item) => {
      return item.movieId === card.id;
    });
    // console.log(res);
    return res;
  }

  useEffect(() => {
    if (!fav) {
      const res = checkIsLike();
      // console.log(res);
      setIsLiked(res);
    }
  }, []);

  function handleClick() {
    // console.log("like click");
    handleLikeClick(card, isLiked, setIsLiked);
    // setIsLiked(!isLiked);
  }

  return (
    <li className="moviesCard">
      <a href={link} target="_blank" rel="noreferrer">
        <img className="moviesCard__image" src={img} alt="изображение фильма" />
      </a>
      <div className="moviesCard__description">
        <p className="moviesCard__title">{title}</p>
        <button
          aria-label="кнопка нравится"
          type="button"
          className={` ${!fav ? "moviesCard__like" : "moviesCard__like-fav"} ${
            isLiked && "movieCard__like-active"
          }`}
          onClick={handleClick}
        />
      </div>
      <p className="moviesCard__time">{time}</p>
    </li>
  );
}

export default MoviesCard;
