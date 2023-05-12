import AuthPage from "../AuthPage/AuthPage";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Login({
  loggedIn,
  handleLogin,
  isButtonDisabled,
  errorAuthMessage,
  isAuthError,
}) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values);
  }

  return (
    <AuthPage
      title="Рады видеть!"
      name="login"
      btnText="Войти"
      loggedIn={loggedIn}
      isRegister={false}
      onSubmit={handleSubmit}
      isValid={isValid}
      isButtonDisabled={isButtonDisabled}
      errorAuthMessage={errorAuthMessage}
      isAuthError={isAuthError}
    >
      <label className="authpage__label" htmlFor="email">
        E-mail
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="authpage__input"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={values.email || ""}
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        title="test@test.com"
      />
      <span className="authpage__input-error authpage__input-error_type_login ">
        {errors.email}
      </span>

      <label className="authpage__label" htmlFor="password">
        Пароль
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Пароль"
        className="authpage__input"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={values.password || ""}
      />
      <span className="authpage__input-error authpage__input-error_type_login">
        {errors.password}
      </span>
    </AuthPage>
  );
}

export default Login;
