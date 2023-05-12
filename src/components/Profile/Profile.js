import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Profile({
  handleProfile,
  onSignoutClick,
  errorAuthMessage,
  handleEditClick,
  isProfileUpdated,
}) {
  const [isEditPushed, setIsEditPushed] = useState(false);
  const [isSame, setIsSame] = useState(false);
  const [initialValue, setInitialValue] = useState({});

  const currentUser = React.useContext(CurrentUserContext);
  const { values, setValues, handleChange, errors, isValid } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditPushed(false);
    handleProfile(values);
  }

  function handleEdit() {
    setIsEditPushed(true);
    setIsSame(true);
    setInitialValue({ name: currentUser.name, email: currentUser.email });
    handleEditClick();
  }

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
    setInitialValue({ name: currentUser.name, email: currentUser.email });
  }, []);

  useEffect(() => {
    if (JSON.stringify(initialValue) === JSON.stringify(values)) {
      setIsSame(true);
    }
    if (JSON.stringify(initialValue) !== JSON.stringify(values)) {
      setIsSame(false);
    }
  }, [values]);

  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}`}</h2>
      <form name="profile" className="profile__form" onSubmit={handleSubmit}>
        <label className="profile__label" htmlFor="name">
          Имя
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Имя"
          className="profile__input"
          required
          disabled={!isEditPushed}
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={values.name || ""}
        />
        <span className="profile__input-error name-input-error">
          {errors.name}
        </span>
        <div className="profile__input-border" />
        <label className="profile__label" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="profile__input"
          required
          disabled={!isEditPushed}
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={values.email || ""}
        />
        <span className="profile__input-error email-input-error">
          {errors.email}
        </span>

        <div
          className={`profile__api-error ${
            isProfileUpdated && "profile__api-succed"
          }`}
        >
          {errorAuthMessage}
        </div>

        <div className="profile__button-container">
          {!isEditPushed && (
            <button
              type="button"
              className="profile__button profile__button_type_edit"
              onClick={handleEdit}
            >
              Редактировать
            </button>
          )}
          {!isEditPushed && (
            <button
              type="button"
              name="profileExitBtn"
              id="profileExitBtnId"
              className="profile__button profile__button_type_signout"
              onClick={onSignoutClick}
            >
              Выйти из аккаунта
            </button>
          )}
          {isEditPushed && (
            <button
              type="submit"
              className="profile__button profile__button_type_submit"
              onSubmit={handleSubmit}
              disabled={isSame || !isValid ? true : false}
            >
              Сохранить
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default Profile;
