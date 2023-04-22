import MoviesCard from "../MoviesCard/MoviesCard";
import { images } from "../../utils/constants";


function MoviesCardList() {
    return (
        <section className="moviesCardList">
            <ul className="moviesCardList__items">
                {images.map((items) => (
                    <MoviesCard
                        img={items.img}
                        title={items.title}
                        time={items.time}
                    />
                ))
                }
            </ul>
            <button
                className="moviesCardList__more-button"
                type="button"
            >Ещё</button>

        </section>

    );
}

export default MoviesCardList;