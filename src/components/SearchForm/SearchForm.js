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
                <input className="searchForm__input" type="search" />
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