import React, { useCallback, useEffect, useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
// import { useForm } from "./../../hooks/useForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";


function Login({ loggedIn, handleLogin }) {

    // const useInput = (initialValue, validations) => {
    //     const [value, setValue] = useState(initialValue);
    //     const valid = useValidation(value, validations);

    //     const handleChange = (e) => {
    //         setValue(e.target.value);
    //     }
    //     return { value, handleChange, ...valid }
    // };

    // const useValidation = (value, validators) => {
    //     const [isEmpty, setIsEmpty] = useState(true);
    //     const [minLengthError, setMinLengthError] = useState(false);

    //     useEffect(() => {
    //         for (const validation in validators) {
    //             // eslint-disable-next-line default-case
    //             switch (validation) {
    //                 case 'minLength':
    //                     value.length < validators[validation] ? setMinLengthError(true) : setMinLengthError(false)
    //                     break;
    //                 case 'isEmpty':
    //                     value ? setIsEmpty(false) : setIsEmpty(true)
    //                     break;
    //                 // default:
    //                 //     break;
    //             }
    //         }
    //     }, [value])

    //     return { isEmpty, minLengthError }
    // };

    // const { values, handleChange, setValues } = useForm({});

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(email.value);
        // console.log(pass.value);
        // console.log(values);
        // console.log(errors);
        // resetForm();
        handleLogin(values);
    }
    // const email = useInput('', { isEmpty: true, minLength: 2 });
    // const pass = useInput('', { isEmpty: true, minLength: 2 });

    // const useFormWithValidation = () => {
    //     const [values, setValues] = React.useState({});
    //     const [errors, setErrors] = React.useState({});
    //     const [isValid, setIsValid] = React.useState(false);

    //     const handleChange = (event) => {
    //         const target = event.target;
    //         const name = target.name;
    //         const value = target.value;
    //         setValues({ ...values, [name]: value });
    //         setErrors({ ...errors, [name]: target.validationMessage });
    //         setIsValid(target.closest("form").checkValidity());
    //     };

    //     const resetForm = useCallback(
    //         (newValues = {}, newErrors = {}, newIsValid = false) => {
    //             setValues(newValues);
    //             setErrors(newErrors);
    //             setIsValid(newIsValid);
    //         },
    //         [setValues, setErrors, setIsValid]
    //     );

    //     return { values, handleChange, errors, isValid, resetForm };
    // };

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();


    return (
        <AuthPage
            title="Рады видеть!"
            name="login"
            btnText="Войти"
            loggedIn={loggedIn}
            isRegister={false}
            onSubmit={handleSubmit}
            isValid={isValid}
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
                onChange={handleChange}
                value={values.email || ''}
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="test@test.com"
            // pattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0, 61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0, 61}[a-zA-Z0-9])?)*$/
            // value={email.value}
            />
            <span
                className="authpage__input-error authpage__input-error_type_login ">{errors.email}</span>

            {/* `authpage__input-error authpage__input-error_type_login email-input-error
                   ${email.minLengthError ? 'authpage__input-error_type_error' : ''}`}>hello</span> */}
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
                // onChange={pass.handleChange}
                onChange={handleChange}
                value={values.password || ''}
            // value={pass.value || ''}
            />
            <span className="authpage__input-error authpage__input-error_type_login">{errors.password}</span>
        </AuthPage >
    );
}

export default Login;