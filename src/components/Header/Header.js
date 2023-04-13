import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__content">
                <NavLink to="/" className="header__register-link">Регистрация</NavLink>
            </div>
        </header>
    );
}

export default Header;