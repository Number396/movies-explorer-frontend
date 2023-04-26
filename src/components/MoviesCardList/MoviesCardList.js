import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ images, fav }) {

    const [isLoading, setIsLoading] = useState(false);

    function handleMoreClick() {
        setIsLoading(!isLoading);
    }

    return (
        <section className="moviesCardList">
            <ul className="moviesCardList__items">
                {images.map((items, index) => (
                    <MoviesCard
                        img={items.img}
                        title={items.title}
                        time={items.time}
                        fav={fav}
                        key={index}
                    />
                ))}
            </ul>
            <button
                className={` moviesCardList__more-button
                ${fav
                        ? "moviesCardList__more-button_type_movie-safe"
                        : "moviesCardList__more-button_type_movie"
                    }
                    `}
                type="button"
                onClick={handleMoreClick}
            >
                Ещё
            </button>
            {
                isLoading && <Preloader />
            }
        </section >
    );
}

export default MoviesCardList;
