import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { images } from "../../utils/constants";
import { useEffect } from "react";

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
  setFoundedMoviesDef,
}) {
  // useEffect(() => {
  //   setFoundedMoviesDef();
  // }, []);
  return (
    <main>
      <SearchForm
        handleSearch={handleSearch}
        shortMovie={shortMovie}
        handleCheckbox={handleCheckbox}
        query={query}
        fav={false}
        setFoundedMoviesDef={setFoundedMoviesDef}
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
