import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navigation({ loggedIn }) {
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
      setBtnMenuClass("navigation__button navigation__button_active");
      setMenuClass("navigation__menu navigation__menu_active");
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
        {loggedIn ? (
          <div className="navigation__main">
            <div className={menuClass}>
              <ul className="navigation__items">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "navigation__link-active"
                        : "navigation__link navigation__link_type_disabled"
                    }
                    onClick={onNavClick}
                  >
                    Главная
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                      isActive ? "navigation__link-active" : "navigation__link"
                    }
                    onClick={onNavClick}
                  >
                    Фильмы
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/saved-movies"
                    className={({ isActive }) =>
                      isActive ? "navigation__link-active" : "navigation__link"
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
            <NavLink to="/signup" className="navigation__link-register">
              Регистрация
            </NavLink>
            <NavLink to="/signin" className="navigation__link-signin">
              Войти
            </NavLink>
          </div>
        )}
      </nav>
    </section>
  );
}

export default Navigation;
