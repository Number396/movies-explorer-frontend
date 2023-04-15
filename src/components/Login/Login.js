import AuthPage from "../AuthPage/AuthPage";

function Login({ loggedIn, handleLogin }) {

    function handleSubmit(e) {
        e.preventDefault();
        // handleLogin(values);
    }

    return (
        <AuthPage
            title="Рады видеть!"
            name="login"
            btnText="Войти"
            isRegister={false}
            loggedIn={loggedIn}
            onSubmit={handleSubmit}
        >
            <label className="login__label" for="email">E-mail</label>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="login__input"
                required
                minLength="2"
                maxLength="40"
            // onChange={handleChange}
            // value={values.email || ''}
            />
            <label className="login__label" for="password">Пароль</label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                className="login__input"
                required
                minLength="2"
                maxLength="40"
            // onChange={handleChange}
            // value={values.password || ''}
            />
        </AuthPage>
    );
}

export default Login;