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
}) {
  useEffect(() => {
    const savedLocalMovies = JSON.parse(localStorage.getItem("savedMovies"));
    setSavedMovies(savedLocalMovies);
    localStorage.setItem("foundedSavedMovies", JSON.stringify(""));
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
      />
      <MoviesCardList
        newMovies={saveMovies}
        handleLikeClick={handleRemoveClick}
        fav={true}
      />
    </main>
  );
}

export default SavedMovies;
