import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";


function Login({ loggedIn, handleLogin }) {


    function handleSubmit(e) {
        e.preventDefault();
        handleLogin();
    }

    return (
        <AuthPage
            title="Рады видеть!"
            name="login"
            btnText="Войти"
            loggedIn={loggedIn}
            isRegister={false}
            onSubmit={handleSubmit}
        >
            <label className="authpage__label" htmlFor="email">E-mail</label>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="authpage__input"
                required
                minLength="2"
                maxLength="40"
            // onChange={handleChange}
            // value={values.email || ''}
            />
            <span className="authpage__input-error authpage__input-error_type_login email-input-error">Что-то пошло не так</span>
            <label className="authpage__label" htmlFor="password">Пароль</label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                className="authpage__input"
                required
                minLength="2"
                maxLength="40"
            // onChange={handleChange}
            // value={values.password || ''}
            />
            <span className="authpage__input-error authpage__input-error_type_login password-input-error">Что-то пошло не так</span>
        </AuthPage>
    );
}

export default Login;