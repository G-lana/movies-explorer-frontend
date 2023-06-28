class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies() {
    return fetch(`${this._url}`, {
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }
}

export const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
