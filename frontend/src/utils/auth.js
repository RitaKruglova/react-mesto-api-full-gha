import { checkResponse } from "./utils";

export const baseUrl = process.env.REACT_APP_BACKEND_URL;

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

export function getCurrentUser() {
  return fetch(`${baseUrl}/users/me`, {
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