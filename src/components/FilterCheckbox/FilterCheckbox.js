function FilterCheckbox({ isChecked, handleCheckbox }) {
  return (
    <label className="checkbox" htmlFor="checkboxId">
      <input
        type="checkbox"
        name="checkbox"
        id="checkboxId"
        checked={isChecked}
        onChange={handleCheckbox}
      />
      <span className="checkbox__slider"></span>
    </label>
  );
}

export default FilterCheckbox;
