import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ images, fav }) {
    return (
        <section className="moviesCardList">
            <ul className="moviesCardList__items">
                {images.map((items) => (
                    <MoviesCard
                        img={items.img}
                        title={items.title}
                        time={items.time}
                        fav={fav}
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
            >
                Ещё
            </button>
        </section >
    );
}

export default MoviesCardList;
