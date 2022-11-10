class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers, credentials: 'include' },).then(
      this.checkResponse
    )
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers, credentials: 'include' }).then(
      this.checkResponse
    )
  }

  setUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }), 
      credentials: 'include'
    }).then(this.checkResponse)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: 'include'
    }).then(this.checkResponse)
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    }).then(this.checkResponse)
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include'
    }).then(this.checkResponse)
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    }).then(this.checkResponse)
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
      credentials: 'include'
    }).then(this.checkResponse)
  }

  _handleLike(method, id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: method,
      headers: this._headers,
      credentials: 'include'
    }).then(this.checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked
      ? this._handleLike('DELETE', id)
      : this._handleLike('PUT', id)
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.kip0.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
