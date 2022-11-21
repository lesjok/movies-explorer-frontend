class Api {
  constructor(options) {
    this._options = options;
  }
  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getAllMovies() {
    return fetch(this._options.baseUrl, {
      headers: this._options.headers
    })
    .then(this._errorHandler)
    .catch((err) => {
      console.log(err);
    })
  }
}

const api = new Api({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
      'Content-Type': 'application/json',
  }
});

export default api;