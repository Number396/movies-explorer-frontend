import AuthPage from "../AuthPage/AuthPage";

function Register({ loggedIn, handleRegister }) {
    function handleSubmit(e) {
        e.preventDefault();
        // handleRegister(values);
    }

    return (
        <AuthPage
            title="Добро пожаловать!"
            name="registration"
            btnText="Зарегистрироваться"
            loggedIn={loggedIn}
            isRegister={true}
            onSubmit={handleSubmit}

        >
            <label className="register__label" htmlFor="name">Имя</label>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Имя"
                className="register__input"
                required
                minLength="1"
                maxLength="40"
            // onChange={handleChange}
            // value={values.email || ''}
            />
            <span className="register__input-error email-input-error">Что-то пошло не так</span>

            <label className="register__label" htmlFor="email">E-mail</label>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="register__input"
                required
                minLength="2"
                maxLength="40"
            // onChange={handleChange}
            // value={values.email || ''}
            />
            <span className="register__input-error email-input-error">Что-то пошло не так</span>
            <label className="register__label" htmlFor="password">Пароль</label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                className="register__input"
                required
                minLength="2"
                maxLength="40"
            // onChange={handleChange}
            // value={values.password || ''}
            />
            <span className="register__input-error password-input-error">Что-то пошло не так</span>
        </AuthPage>
    );
}

export default Register;