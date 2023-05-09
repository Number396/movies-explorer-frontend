import React, { useCallback, useEffect, useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Login({
  loggedIn,
  handleLogin,
  errorLoginMessage,
  isLoginError,
  isButtonDisabled,
  setErrorLoginMessage,
}) {
  // useEffect(() => {
  //   setErrorLoginMessage("");
  // }, [setErrorLoginMessage]);

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
      errorLoginMessage={errorLoginMessage}
      isLoginError={isLoginError}
      isButtonDisabled={isButtonDisabled}
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
        // pattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0, 61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0, 61}[a-zA-Z0-9])?)*$/
        // value={email.value}
      />
      <span className="authpage__input-error authpage__input-error_type_login ">
        {errors.email}
      </span>

      {/* `authpage__input-error authpage__input-error_type_login email-input-error
                   ${email.minLengthError ? 'authpage__input-error_type_error' : ''}`}>hello</span> */}
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
        // onChange={pass.handleChange}
        onChange={handleChange}
        value={values.password || ""}
        // value={pass.value || ''}
      />
      <span className="authpage__input-error authpage__input-error_type_login">
        {errors.password}
      </span>
    </AuthPage>
  );
}

export default Login;
