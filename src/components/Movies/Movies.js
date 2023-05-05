import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { images } from "../../utils/constants";

function Movies({
  handleSearch,
  handleCheckbox,
  foundedMovies,
  shortMovie,
  handleMoreClick,
  isMore,
  newMovies,
  query,
}) {
  return (
    <main>
      <SearchForm
        handleSearch={handleSearch}
        shortMovie={shortMovie}
        handleCheckbox={handleCheckbox}
        query={query}
      />

      <MoviesCardList
        images={images}
        fav={false}
        // foundedMovies={foundedMovies}
        handleMoreClick={handleMoreClick}
        isMore={isMore}
        newMovies={newMovies}
      />
    </main>
  );
}

export default Movies;
