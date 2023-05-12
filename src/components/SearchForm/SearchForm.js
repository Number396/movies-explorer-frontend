import { useEffect } from "react";
import searchIcon from "../../images/search-icon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function SearchForm({
  handleSearch,
  handleCheckbox,
  shortMovie,
  query,
  fav,
  isSearchMessage,
  searchMessage,
  setSearchMessageSettings,
  showSearchMessage,
}) {
  const { values, handleChange, setValues } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    if (values.searchMovies !== "") {
      handleSearch(values);
    } else {
      showSearchMessage(values.searchMovies);
    }
  }

  useEffect(() => {
    setSearchMessageSettings();

    if (!fav) {
      setValues({ searchMovies: query });
    } else {
      setValues({ searchMovies: "" });
    }
  }, []);

  return (
    <section className="searchForm">
      <form className="searchForm__form" noValidate onSubmit={handleSubmit}>
        <img
          className="searchForm__searchIcon"
          src={searchIcon}
          alt="иконнка поиска"
        />
        <label htmlFor="search" />
        <input
          required
          minLength="1"
          className="searchForm__input"
          type="text"
          name="searchMovies"
          id="searchMovies"
          placeholder="Фильм"
          onChange={handleChange}
          value={values.searchMovies || ""}
        />
        <button
          className="searchForm__button"
          type="submit"
          onSubmit={handleSubmit}
        />
      </form>

      <div className="searchForm__message ">
        {isSearchMessage && searchMessage}
      </div>

      <div className="searchForm__checbox-container">
        <FilterCheckbox
          isChecked={shortMovie}
          handleCheckbox={handleCheckbox}
        />
        <p className="searchForm__checbox-text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
