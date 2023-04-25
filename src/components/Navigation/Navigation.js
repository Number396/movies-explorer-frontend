import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navigation({ logedIn }) {
    const [btnMenuClass, setBtnMenuClass] = useState("navigation__button");
    const [menuClass, setMenuClass] = useState("navigation");
    const [overlayClass, setOverlayClass] = useState("overlay");
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    function onNavClick() {
        setIsMenuClicked(false);
        setBtnMenuClass("navigation__button");
        setMenuClass("navigation");
        setOverlayClass("overlay");
    }

    function handleMenuClick() {
        if (!isMenuClicked) {
            setBtnMenuClass("navigation__button_active");
            setMenuClass("navigation_active");
            setOverlayClass("overlay enabled")

        }
        else {
            setBtnMenuClass("navigation__button");
            setMenuClass("navigation");
            setOverlayClass("overlay");
        }
        setIsMenuClicked(!isMenuClicked);
    }


    return (
        <section >
            <div className={overlayClass} />
            <nav >
                {logedIn ? (
                    <div className="container">
                        <div className={menuClass}>
                            <ul className="navigation__items">
                                <li>
                                    <NavLink to="/" className="navigation__main-link" onClick={onNavClick}>
                                        Главная
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/movies" className="navigation__movie-link" onClick={onNavClick}>
                                        Фильмы
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/saved-movies" className="navigation__saved-movies-link" onClick={onNavClick}
                                    >
                                        Сохранённые фильмы
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/profile" className="navigation__profile-link" onClick={onNavClick}
                                    >
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <button className={btnMenuClass} onClick={handleMenuClick} />
                    </div>
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
                {/* navigation__button_active */}
            </nav>
        </section>
    );
}

export default Navigation;
