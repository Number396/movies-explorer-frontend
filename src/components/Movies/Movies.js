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
  // isLiked,
  handleLikeClick,
}) {
  return (
    <main>
      <SearchForm
        handleSearch={handleSearch}
        shortMovie={shortMovie}
        handleCheckbox={handleCheckbox}
        query={query}
        fav={false}
      />

      <MoviesCardList
        images={images}
        fav={false}
        // foundedMovies={foundedMovies}
        handleMoreClick={handleMoreClick}
        isMore={isMore}
        newMovies={newMovies}
        // isLiked={isLiked}
        handleLikeClick={handleLikeClick}
      />
    </main>
  );
}

export default Movies;
