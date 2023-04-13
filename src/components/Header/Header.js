import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__content">
                <NavLink to="/" className="header__register-link">Регистрация</NavLink>
                <button
                    type="button"
                    // onClick={onExitClick}
                    className="header__signin">
                    Войти
                </button>
            </div>
        </header>
    );
}

export default Header;