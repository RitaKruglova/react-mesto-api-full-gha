import { checkResponse } from "./utils";

const { REACT_APP_BACKEND_URL = 'http://localhost:3000' } = process.env;

export function register(email, password) {
  return fetch(`${REACT_APP_BACKEND_URL}/signup`, {
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
  return fetch(`${REACT_APP_BACKEND_URL}/signin`, {
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

export function getCurrentUser() {
  return fetch(`${REACT_APP_BACKEND_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
    mode: 'cors',
    credentials: 'include'
  })
    .then(checkResponse)
    .then(data => data)
}

export function logout() {
  return fetch(`${REACT_APP_BACKEND_URL}/signout`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  })
}