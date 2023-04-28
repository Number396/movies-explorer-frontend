import { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React from "react";

function Profile({ handleProfile, onSignoutClick }) {
    const [isEditPushed, setIsEditPushed] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
        setIsEditPushed(false);
    }

    function handleEditClick() {
        setIsEditPushed(true);
        setIsEdit(true);
    }

    function handleInputClick() {
        setIsEdit(false);
    }

    return (

        <section className="profile">
            {/* <h2 className="profile__title">{`Привет, ${currentUser.name}`}</h2> */}
            <h2 className="profile__title">{`Привет, ${currentUser.name}`}</h2>
            <form name="profile"
                className="profile__form"
                onSubmit={handleSubmit}
            >
                <label className="profile__label" htmlFor="name">Имя</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Имя"
                    className="profile__input"
                    required
                    disabled={!isEditPushed}
                    minLength="1"
                    maxLength="40"
                    onClick={handleInputClick}
                // value="Виталий"
                />
                <span className="profile__input-error name-input-error">Что-то пошло не так</span>
                <div className="profile__input-border" />
                <label className="profile__label" htmlFor="email">E-mail</label>
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
                    onClick={handleInputClick}
                // value="pochta@yandex.ru"
                />
                <span className="profile__input-error email-input-error">Что-то пошло не так</span>

                <div className="profile__button-container">

                    {!isEditPushed && < button
                        type="button"
                        className="profile__button profile__button_type_edit"
                        onClick={handleEditClick}
                    >
                        Редактировать
                    </button>
                    }
                    {!isEditPushed && <button
                        type="button"
                        name="profileExitBtn"
                        id="profileExitBtnId"
                        className="profile__button profile__button_type_signout"
                        onClick={onSignoutClick}
                    >
                        Выйти из аккаунта
                    </button>
                    }
                    {isEditPushed && <button
                        type="submit"
                        className="profile__button profile__button_type_submit"
                        onSubmit={handleSubmit}
                        disabled={isEdit}
                    >
                        Сохранить
                    </button>
                    }
                </div>
            </form>

        </section >
    );
}

export default Profile;