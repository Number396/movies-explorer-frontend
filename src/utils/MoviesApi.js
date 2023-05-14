import { API_MOVIES_CONFIG } from "./constants";

class MoviesApi {
  constructor({ url, headers }) {
    this._baseUrl = url;
    this._headers = headers;
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

  getMovies() {
    return this._request(this._baseUrl, {
      method: "GET",
      headers: this._headers,
    });
  }
}

export const apiMovies = new MoviesApi(API_MOVIES_CONFIG);
