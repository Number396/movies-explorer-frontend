import { useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  saveMovies,
  handleRemoveClick,
  handleSearch,
  setSavedMovies,
  shortSaveMovie,
  handleCheckbox,
  querySavedMovie,
  // setShortSaveMovie,
  // setFoundedMoviesDef,
  foundedSavedMovies,
  setFoundedSavedMovies,
  setSavedMoviesSeached,
  setShortSaveMovie,
  isSearchMessage,
  searchMessage,
  setSearchMessageSettings,
  showSearchMessage,
}) {
  useEffect(() => {
    const savedLocalMovies = JSON.parse(localStorage.getItem("savedMovies"));
    localStorage.setItem(
      "foundedSavedMovies",
      JSON.stringify(savedLocalMovies)
    );
    setSavedMovies(savedLocalMovies);
    setFoundedSavedMovies(savedLocalMovies);
    setSavedMoviesSeached([]);
    setShortSaveMovie(false);

    // setShortSaveMovie(false);
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

        // setFoundedMoviesDef={setFoundedMoviesDef}
      />
      <MoviesCardList
        newMovies={foundedSavedMovies}
        handleLikeClick={handleRemoveClick}
        fav={true}
      />
    </main>
  );
}

export default SavedMovies;
