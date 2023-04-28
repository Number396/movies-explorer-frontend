import { apiAuthConfig } from "./constants";

class MainApi {
    constructor({ url, headers }) {
        this._baseUrl = url;
        this._headers = headers;
        this._signupUrl = `${this._baseUrl}signup`;
        this._signinUrl = `${this._baseUrl}signin`;
        this._userUrl = `${this._baseUrl}users/me`;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(
                `Ошибка HTTP: ${response.status} ${response.statusText}`
            );
        }
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    };

    register(name, email, password) {
        return this._request(this._signupUrl, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, email, password }),
        })
    };

    login(email, password) {
        return this._request(this._signinUrl, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ password, email }),
        })
    };

}

export const apiAuth = new MainApi(apiAuthConfig);