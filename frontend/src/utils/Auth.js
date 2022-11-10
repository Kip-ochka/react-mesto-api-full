class Auth {
  constructor() {
    this._base_url = 'https://api.mesto.kip0.nomoredomains.icu'
  }

  _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  signUp(password, email) {
    return fetch(`${this._base_url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(this._getResponse)
  }

  signIn(password, email) {
    return fetch(`${this._base_url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    }).then(this._getResponse)
  }

  signout() {
    return fetch(`${this._base_url}/signout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
  }

  checkToken() {
    return fetch(`${this._base_url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then(this._getResponse)
  }
}

const auth = new Auth()

export { auth }
