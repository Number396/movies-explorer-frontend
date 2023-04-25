import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navigation({ logedIn }) {
    const [btnMenuClass, setBtnMenuClass] = useState("navigation__button");
    const [menuClass, setMenuClass] = useState("navigation__menu");
    const [overlayClass, setOverlayClass] = useState("navigation__overlay");
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    function onNavClick() {
        setIsMenuClicked(false);
        setBtnMenuClass("navigation__button");
        setMenuClass("navigation__menu");
        setOverlayClass("navigation__overlay");
    }

    function handleMenuClick() {
        if (!isMenuClicked) {
            setBtnMenuClass("navigation__button_active");
            setMenuClass("navigation__menu_active");
            setOverlayClass("navigation__overlay navigation__overlay_active");
        } else {
            setBtnMenuClass("navigation__button");
            setMenuClass("navigation__menu");
            setOverlayClass("navigation__overlay");
        }
        setIsMenuClicked(!isMenuClicked);
    }

    return (
        <section className="navigation">
            <div className={overlayClass} />
            <nav>
                {logedIn ? (
                    <div className="navigation__main">
                        <div className={menuClass}>
                            <ul className="navigation__items">
                                <li>
                                    <NavLink
                                        to="/"
                                        // className="navigation__main-link"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "navigation__link_type_active"
                                                : "navigation__link navigation__link_type_disabled"
                                        }
                                        onClick={onNavClick}
                                    >
                                        Главная
                                    </NavLink>
                                </li>
                                <li>
                                    {/* className="navigation__movie-link" */}
                                    {/* <NavLink to="/movies" className="navigation__movie-link" onClick={onNavClick}> */}
                                    <NavLink
                                        to="/movies"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "navigation__link_type_active"
                                                : "navigation__link"
                                        }
                                        onClick={onNavClick}
                                    >
                                        Фильмы
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/saved-movies"
                                        // className="navigation__saved-movies-link" onClick={onNavClick}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "navigation__link_type_active"
                                                : "navigation__link"
                                        }
                                        onClick={onNavClick}
                                    >
                                        Сохранённые фильмы
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/profile"
                                        className="navigation__profile-link"
                                        onClick={onNavClick}
                                    ></NavLink>
                                </li>
                            </ul>
                        </div>
                        <button className={btnMenuClass} onClick={handleMenuClick} />
                    </div>
                ) : (
                    <div className="navigation__landing">
                        <NavLink to="/signup" className="navigation__link_type_register">
                            Регистрация
                        </NavLink>
                        <NavLink to="/signin" className="navigation__type_signin">
                            Войти
                        </NavLink>
                    </div>
                )}
            </nav>
        </section>
    );
}

export default Navigation;
