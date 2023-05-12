import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function Movies({
  handleSearch,
  handleCheckbox,
  shortMovie,
  handleMoreClick,
  isMore,
  newMovies,
  query,
  handleLikeClick,
  isSearchMessage,
  searchMessage,
  setSearchMessageSettings,
  showSearchMessage,
  isLoading,
}) {
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
      />
      {isLoading && <Preloader />}

      <MoviesCardList
        fav={false}
        handleMoreClick={handleMoreClick}
        isMore={isMore}
        newMovies={newMovies}
        handleLikeClick={handleLikeClick}
      />
    </main>
  );
}

export default Movies;
