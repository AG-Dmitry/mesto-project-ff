const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '0a6bc7cf-5c48-4624-9008-16880b1ee6e0',
    'Content-Type': 'application/json'
  }
}

function getResponseData (res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}

function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => getResponseData(res));
}

function getCards () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => getResponseData(res));
}

function patchUserAvatar (link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => getResponseData(res));
}

function patchUserInfo (name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => getResponseData(res));
}

function postCard (name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => getResponseData(res));
}

function deleteCard (card) {
  return fetch(`${config.baseUrl}/cards/${card.id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => getResponseData(res));
}

function likeCard (card, button, isActiveClass) {
  const currentMethod = button.classList.contains(isActiveClass) ? 'DELETE' : 'PUT';
  return fetch(`${config.baseUrl}/cards/likes/${card.id}`, {
    method: currentMethod,
    headers: config.headers
  })
  .then(res => getResponseData(res));
}

export { getUserInfo, getCards, patchUserAvatar, patchUserInfo, postCard, deleteCard, likeCard };