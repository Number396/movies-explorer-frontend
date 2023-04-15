import { NavLink } from "react-router-dom";

function Navigation({ logedIn }) {
    return (
        <>
            {!logedIn && (
                <div className="header__content" >
                    <NavLink to="/signup" className="header__register-link">Регистрация</NavLink>
                    <NavLink to="/signin" className="header__signin">Войти</NavLink>
                </div>
            )
            }
        </>
    )
}

export default Navigation;