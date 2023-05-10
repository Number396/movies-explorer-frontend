import { apiAuthConfig } from "./constants";

class MainApi {
  constructor({ url, headers }) {
    this._baseUrl = url;
    this._headers = headers;
    this._signupUrl = `${this._baseUrl}signup`;
    this._signinUrl = `${this._baseUrl}signin`;
    this._userUrl = `${this._baseUrl}users/me`;
    this._movieUrl = `${this._baseUrl}movies`;
  }

  _checkUserResponse(response) {
    if (response.ok) {
      // console.log(response);
      return response.json();
    } else {
      return Promise.reject(response);
    }
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
  }

  _userRequest(url, options) {
    return fetch(url, options).then(this._checkUserResponse);
  }

  register(name, email, password) {
    return this._userRequest(this._signupUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    });
  }

  login(email, password) {
    return this._userRequest(this._signinUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    });
  }

  checkToken(token) {
    return this._request(this._userUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  setUserInfo({ name, email, token }) {
    return this._request(this._userUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });
  }

  createMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN,
    token,
  }) {
    return this._request(this._movieUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co/${image.url}`,
        trailerLink,
        thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
        movieId: id,
        nameRU,
        nameEN,
      }),
    });
  }

  deleteMovie({ movieId, token }) {
    console.log(movieId, token);
    return this._request(`${this._movieUrl}/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getSavedMovies({ token }) {
    return this._request(this._movieUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const apiMain = new MainApi(apiAuthConfig);
