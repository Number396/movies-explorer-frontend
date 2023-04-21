import one from "../../images/1.png"

function MoviesCard() {

    function handleLikeClick() {

    }

    return (
        <li className="moviesCard">
            <img
                className="movieCard__image"
                src={one}
                alt="изображение фильма"
            />
            <div className="moviesCard__description" >
                <p className="moviesCard__title">
                    33 слова о дизайне
                </p>
                <button
                    aria-label="кнопка нравится"
                    type="button"
                    className="moviesCard__like"
                    onClick={handleLikeClick}
                />
            </div>
            <p className="moviesCard__time">1ч 42м</p>


        </li>



    );
}

export default MoviesCard;