import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import AuthPage from "../AuthPage/AuthPage";

function Register({
  loggedIn,
  handleRegister,
  isButtonDisabled,
  errorAuthMessage,
  isAuthError,
}) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values);
  }

  return (
    <AuthPage
      title="Добро пожаловать!"
      name="registration"
      btnText="Зарегистрироваться"
      loggedIn={loggedIn}
      isRegister={true}
      onSubmit={handleSubmit}
      isValid={isValid}
      isButtonDisabled={isButtonDisabled}
      errorAuthMessage={errorAuthMessage}
      isAuthError={isAuthError}
    >
      <label className="authpage__label" htmlFor="name">
        Имя
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Имя"
        className="authpage__input"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={values.name || ""}
        pattern="^([a-яё]+(?:[ -][a-яё]+)*[ -]?|)$"
      />
      <span className="authpage__input-error authpage__input-error_type_register ">
        {errors.name}
      </span>

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
      />
      <span className="authpage__input-error authpage__input-error_type_register ">
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
      <span className="authpage__input-error authpage__input-error_type_register password-input-error">
        {errors.password}
      </span>
    </AuthPage>
  );
}

export default Register;
