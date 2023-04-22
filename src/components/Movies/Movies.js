import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { images } from "../../utils/constants";

function Movies() {
    return (
        <main>
            <SearchForm />
            <MoviesCardList
                images={images}
                fav={false}
            />
        </main>
    );
}

export default Movies;