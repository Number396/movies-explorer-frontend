import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/header-logo.svg";

function AuthPage({
  title,
  name,
  btnText,
  loggedIn,
  isRegister,
  onSubmit,
  children,
  isValid,
  isButtonDisabled,
  errorAuthMessage,
  isAuthError,
}) {
  const navigate = useNavigate();

  return (
    <section className="authpage">
      <img
        className="authpage__logo"
        src={logo}
        onClick={() => navigate("/")}
        alt="логотип"
      />
      <h2 className="authpage__title">{title}</h2>
      <form
        name={name}
        className="authpage__form"
        onSubmit={onSubmit}
        noValidate
      >
        {children}

        <div className="authpage__api-error">
          {isAuthError && errorAuthMessage}
        </div>

        <button
          type="text"
          className="authpage__submit-button"
          disabled={!isValid || isButtonDisabled}
        >
          {btnText}
        </button>

        {!loggedIn & isRegister ? (
          <p className="authpage__suggestion">
            Уже зарегистрированы?
            <NavLink to="/signin" className="authpage__link">
              Войти
            </NavLink>
          </p>
        ) : (
          <p className="authpage__suggestion">
            Ещё не зарегистрированы?
            <NavLink to="/signup" className="authpage__link">
              Регистрация
            </NavLink>
          </p>
        )}
      </form>
    </section>
  );
}
export default AuthPage;
