import searchIcon from "../../images/search-icon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <section className="searchForm">
            <form className="searchForm__form" >
                <img className="searchForm__searchIcon" src={searchIcon} alt="иконнка поиска" />
                <label htmlFor="search" />
                <input
                    className="searchForm__input"
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Фильм"
                />
                <button
                    className="searchForm__button"
                    type="submit"
                    onSubmit={handleSubmit}
                />
            </form>
            <div className="searchForm__checbox-container" >
                <FilterCheckbox />
                <p className="searchForm__checbox-text">Короткометражки</p>

            </div>
        </section>

    );
}

export default SearchForm;