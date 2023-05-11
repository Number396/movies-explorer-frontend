import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import searchIcon from "../../images/search-icon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function SearchForm({
  handleSearch,
  handleCheckbox,
  shortMovie,
  query,
  fav,
  setFoundedMoviesDef,
}) {
  // const { values, handleChange, setValues } = useForm({});
  const { values, handleChange, setValues, errors } = useFormWithValidation();

  // const [checked, setChecked] = useState(false);

  // function handleCheckbox() {
  //   setChecked(!checked);
  // }

  function handleSubmit(e) {
    // console.log(values.searchMovies);
    // console.log(errors.searchMovies);
    e.preventDefault();

    if (values.searchMovies !== "") {
      // handleSearch(values, checked);
      handleSearch(values);
    } else {
      console.log("pusto");
    }
  }

  useEffect(() => {
    console.log("inside useEffect [] in SearchForm");
    console.log("inside useEffect [] in SearchForm. query:", query);

    if (!fav) {
      setValues({ searchMovies: query });
    } else {
      setValues({ searchMovies: "" });
      setFoundedMoviesDef();
    }
    // const query = localStorage.getItem("query");
    // // const isShortMovie = localStorage.getItem("isShortMovie");
    // if (query) {
    //   setValues({ searchMovies: query });
    // } else {
    //   console.log("else");
    //   setValues({ searchMovies: "" });
    // }
    // if (isShortMovie) {
    //   setChecked(isShortMovie);
    // }
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
