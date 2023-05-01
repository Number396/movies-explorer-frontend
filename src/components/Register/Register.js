import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import AuthPage from "../AuthPage/AuthPage";
import { useForm } from "./../../hooks/useForm";

function Register({ loggedIn, handleRegister }) {

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();


    function handleSubmit(e) {
        e.preventDefault();
        console.log(values);
        console.log(errors);
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

        >
            <label className="authpage__label" htmlFor="name">Имя</label>
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
                value={values.name || ''}
                pattern="^([a-яё]+(?:[ -][a-яё]+)*[ -]?|)$"
            />
            {/* <span className="register__input-error email-input-error">Что-то пошло не так</span> */}
            <span className="authpage__input-error authpage__input-error_type_register email-input-error">{errors.name}</span>

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
                onChange={handleChange}
                value={values.email || ''}
            />
            <span className="authpage__input-error authpage__input-error_type_register email-input-error">{errors.email}</span>
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
                onChange={handleChange}
                value={values.password || ''}
            />
            <span className="authpage__input-error authpage__input-error_type_register password-input-error">{errors.password}</span>
        </AuthPage>
    );
}

export default Register;