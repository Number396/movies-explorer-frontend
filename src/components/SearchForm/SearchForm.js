import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import searchIcon from "../../images/search-icon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleSearch }) {
  const { values, handleChange } = useForm({});
  const [checked, setChecked] = useState(false);

  function handleCheckbox() {
    setChecked(!checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(values, checked);
  }

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
      <div className="searchForm__checbox-container">
        <FilterCheckbox isChecked={checked} handleCheckbox={handleCheckbox} />
        <p className="searchForm__checbox-text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
