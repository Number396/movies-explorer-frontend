import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
    return (
        <section className="moviesCardList">
            <ul className="moviesCardList__items">
                <MoviesCard />
            </ul>
        </section>



    );
}

export default MoviesCardList;