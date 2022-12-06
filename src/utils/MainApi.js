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

  likeMovie(currentMovie) {
    return fetch(`${this._options.baseUrl}/movies`, {
    method: 'POST',
    body: JSON.stringify(currentMovie),
    headers: this._options.headers,
    credentials: this._options.credentials,
  })
    .then(this._errorHandler)
  }

  deleteMovie(id) {
    return fetch(`${this._options.baseUrl}/movies/${id}`, {
    method: 'DELETE',
    headers: this._options.headers,
    credentials: this._options.credentials,
  })
    .then(this._errorHandler)
  }

  getSavedMovies() {
    return fetch(`${this._options.baseUrl}/movies`, {
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
    .then(this._errorHandler)
  }

  register(data) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify(data),
      credentials: this._options.credentials,   
    })
    .then(this._errorHandler)
  }

  authorize(data) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify(data),
      credentials: this._options.credentials,
    })
    .then(this._errorHandler)
  }

  getContent() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
    .then(this._errorHandler)
  }

  changeUser(data) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify(data),
      credentials: this._options.credentials,
    })
    .then(this._checkResponseStatus)
  }
  
  signOut() {
    return fetch(`${this._options.baseUrl}/signout`, {
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
    .then(this._errorHandler)
  }
}

const api = new Api({
  // baseUrl: 'https://api-movies.04.pe',
  baseUrl: 'http://localhost:3000',
  // использую свой домен, так как тех поддержка яндекса не может решить проблему настройки доменов, а дедлайн уже очень близко нет времени ждать
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default api;