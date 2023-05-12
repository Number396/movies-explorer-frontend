import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
// import { images } from "../../utils/constants";
// import { useEffect } from "react";
import Preloader from "../Preloader/Preloader";

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
  isSearchMessage,
  searchMessage,
  setSearchMessageSettings,
  showSearchMessage,
  isLoading,
  // setFoundedMoviesDef,
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
        isSearchMessage={isSearchMessage}
        searchMessage={searchMessage}
        setSearchMessageSettings={setSearchMessageSettings}
        showSearchMessage={showSearchMessage}
        // setFoundedMoviesDef={setFoundedMoviesDef}
      />
      {isLoading && <Preloader />}

      <MoviesCardList
        // images={images}
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
