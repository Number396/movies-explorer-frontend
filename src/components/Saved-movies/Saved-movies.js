import { useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  handleRemoveClick,
  handleSearch,
  setSavedMovies,
  shortSaveMovie,
  handleCheckbox,
  querySavedMovie,
  showSavedMovies,
  setShowSavedMovies,
  setSavedMoviesSeached,
  setShortSaveMovie,
  isSearchMessage,
  searchMessage,
  setSearchMessageSettings,
  showSearchMessage,
}) {
  useEffect(() => {
    const savedLocalMovies = JSON.parse(localStorage.getItem("savedMovies"));
    setSavedMovies(savedLocalMovies);
    setShowSavedMovies(savedLocalMovies);
    setSavedMoviesSeached([]);
    setShortSaveMovie(false);
  }, []);

  return (
    <main>
      <SearchForm
        handleSearch={handleSearch}
        shortMovie={shortSaveMovie}
        handleCheckbox={handleCheckbox}
        query={querySavedMovie}
        fav={true}
        isSearchMessage={isSearchMessage}
        searchMessage={searchMessage}
        setSearchMessageSettings={setSearchMessageSettings}
        showSearchMessage={showSearchMessage}
      />
      <MoviesCardList
        newMovies={showSavedMovies}
        handleLikeClick={handleRemoveClick}
        fav={true}
      />
    </main>
  );
}

export default SavedMovies;
