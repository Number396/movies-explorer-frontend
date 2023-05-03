import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { images } from "../../utils/constants";

function Movies({ handleSearch, foundedMovies }) {
  return (
    <main>
      <SearchForm handleSearch={handleSearch} />
      <MoviesCardList
        images={images}
        fav={false}
        foundedMovies={foundedMovies}
      />
    </main>
  );
}

export default Movies;
