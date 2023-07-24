export function validateEmail(value) {
  if (!value) {
    return 'Email обязателен';
  }
  if (!/\S+@\S+\.\S+/.test(value)) {
    return 'Неправильный формат email';
  }
  return '';
}

export function validateText(value) {
  if (value.length < 2) {
    return 'Текст должен быть не короче 2 символов';
  } else {
    return '';
  }
}

export function validatePassword(value) {
  if (value.length < 6) {
    return 'Пароль должен быть не короче 6 символов';
  } else {
    return '';
  }
}

export function validateLink(value) {
  if (!value) {
    return 'Поле не может быть пустым';
  }
  if (!/^(https?:\/\/)?[A-z\d-]*\.?[A-z\d-]+\.[a-z]{2,}\/?.*$/.test(value)) {
    return 'Неправильный формат URL';
  }
  return '';
}
