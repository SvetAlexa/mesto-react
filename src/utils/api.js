import { config } from './utils.js'

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _onResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status}`);
    }

    _request(endpoint, options) {
        this._baseUrl = `${this._url}${endpoint}`
        return fetch(this._baseUrl, options)
            .then(this._onResponse)
    }


    getUserInfo() {
        return this._request(`/users/me`, {
            method: 'GET',
            headers: this._headers
        })
    }

    getInitialCards() {
        return this._request(`/cards`, {
            method: 'GET',
            headers: this._headers
        })
    }

    // getAllInfo() {
    //     return Promise.all([this.getUserInfo(), this.getInitialCards()])
    // }

    createNewCard(dataCard) {
        return this._request(`/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(dataCard)
        })
    }

    removeCard(cardId) {
        return this._request(`/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    swapLike(cardId, statusIsLiked) {
        return this._request(`/cards/${cardId}/likes`, {
            method: statusIsLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
    }

    editUserInfo(data) {
        return this._request(`/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
    }

    editAvatarPhoto(data) {
        return this._request(`/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
    }
}

const api = new Api(config);

export default api;