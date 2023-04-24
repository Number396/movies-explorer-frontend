import { useState } from "react";

function MoviesCard({ img, title, time, fav }) {
    const [isLiked, setIsLiekd] = useState(false);

    function handleLikeClick() {
        setIsLiekd(!isLiked);
    }

    return (
        <li className="moviesCard">
            <img
                className="movieCard__image"
                src={img}
                alt="изображение фильма"
            />
            <div className="moviesCard__description" >
                <p className="moviesCard__title">
                    {title}
                </p>
                <button
                    aria-label="кнопка нравится"
                    type="button"
                    className={` ${!fav ? 'moviesCard__like' : 'moviesCard__like_fav'} ${isLiked && 'movieCard__like_active'}`}
                    onClick={handleLikeClick}
                />
            </div>
            <p className="moviesCard__time">{time}</p>
        </li>
    );
}

export default MoviesCard;