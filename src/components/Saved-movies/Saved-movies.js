import { images } from "../../utils/constants";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
    return (
        <main>
            <SearchForm />
            <MoviesCardList
                images={images.slice(0, 3)}
                fav={true}
            />
        </main>

    );
}

export default SavedMovies;