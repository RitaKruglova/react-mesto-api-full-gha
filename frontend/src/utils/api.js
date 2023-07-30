class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetch(url, method = 'GET', body = null) {
    return fetch(`${this._baseUrl}${url}`, {
      method,
      headers: this._headers,
      body,
      mode: 'cors',
      credentials: 'include'
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getInitialCards() {
    return this._fetch(`/cards`);
  }

  putLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, 'PUT');
  }

  deleteLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, 'DELETE');
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._fetch(`/cards/${cardId}/likes`, 'DELETE');
    }
    return this._fetch(`/cards/${cardId}/likes`, 'PUT');
  }

  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, 'DELETE');
  }

  getUserInfo() {
    return this._fetch(`/users/me`);
  }

  setUserInfo({ name, about }) {
    return this._fetch(`/users/me`, 'PATCH',
      JSON.stringify({
        name,
        about
      })
    );
  }

  addNewCard({ name, link }) {
    return this._fetch(`/cards`, 'POST',
      JSON.stringify({
        name,
        link
      })
    )
  }

  changeAvatar(link) {
    return this._fetch(`/users/me/avatar`, 'PATCH',
      JSON.stringify({
        avatar: link
      })
    )
  }
}

const { REACT_APP_BACKEND_URL = 'http://localhost:3000' } = process.env;

const api = new Api({
  baseUrl: REACT_APP_BACKEND_URL,
  headers: {
    // authorization: 'b2c416ac-9733-4a5c-9da0-2148e2adbd32',
    'Content-Type': 'application/json',
  }
});

export { api }