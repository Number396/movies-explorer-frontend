import { NavLink } from "react-router-dom";

function Navigation({ logedIn }) {
    return (
        <nav>
            {logedIn ? (
                <ul className="navigation__items">
                    <li>
                        <NavLink to="/movies" className="navigation__movie-link">
                            Фильмы
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/saved-movies"
                            className="navigation__saved-movies-link"
                        >
                            Сохранённые фильмы
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/profile"
                            className="navigation__profile-link"
                        >
                        </NavLink>
                    </li>
                </ul>
            ) : (
                <div className="header__content">
                    <NavLink to="/signup" className="header__register-link">
                        Регистрация
                    </NavLink>
                    <NavLink to="/signin" className="header__signin">
                        Войти
                    </NavLink>
                </div>
            )}
        </nav>
    );
}

export default Navigation;
