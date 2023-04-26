
function FilterCheckbox() {
    return (
        <label className="checkbox" htmlFor="checkboxId">
            <input
                type="checkbox"
                name="checkbox"
                id="checkboxId"
            />
            <span className="checkbox__slider"></span>
        </label>
    );
}

export default FilterCheckbox;