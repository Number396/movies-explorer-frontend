import { useEffect, useState } from "react";

function MoviesCard({ img, title, time, fav, link, handleLikeClick, card }) {
  const [isLiked, setIsLiked] = useState(false);
  const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));

  function checkIsLike() {
    const res = savedMovies.some((item) => {
      return item.movieId === card.id;
    });
    return res;
  }

  useEffect(() => {
    if (!fav) {
      const res = checkIsLike();
      setIsLiked(res);
    }
  }, []);

  function handleClick() {
    handleLikeClick(card, isLiked, setIsLiked);
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
