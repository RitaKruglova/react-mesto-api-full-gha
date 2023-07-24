import { checkResponse } from "./utils";

export const baseUrl = 'https://api.mesto.rita-kruglova.nomoredomains.xyz';

export function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
    mode: 'cors',
    credentials: 'include'
  })
    .then(checkResponse)
    .then(res => res)
}

export function authorise(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
    mode: 'cors',
    credentials: 'include'
  })
    .then(checkResponse)
    .then(data => {
      localStorage.setItem('jwt', data.token);
      return;
    })
}

export function getToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`,
    },
    mode: 'cors',
    credentials: 'include'
  })
    .then(checkResponse)
    .then(data => data)
}