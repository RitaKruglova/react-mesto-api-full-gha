// import { useState } from "react";
import AuthenticationForm from "./AuthenticationForm";
import { Link } from 'react-router-dom';
import { register } from "../utils/auth";
import useValidate from "../hooks/useValidate";
import { validateEmail, validatePassword } from "../utils/validation";

function Register({changeRegistrationState}) {
  const EMAIL = 'email';
  const PASSWORD = 'password';

  function validate(values) {
    const errors = {};
    const emailError = validateEmail(values[EMAIL]);
    const passwordError = validatePassword(values[PASSWORD]);
    if (emailError) {
      errors[EMAIL] = emailError;
    }
    if (passwordError) {
      errors[PASSWORD] = passwordError;
    }
    return errors;
  }

  const { values, errors, handleChange, isSubmitting } = useValidate({
    [EMAIL]: '',
    [PASSWORD]: ''
  }, validate);

  function handleSubmit(event) {
    event.preventDefault();

    register(values[EMAIL], values[PASSWORD])
      .then(() => {
        changeRegistrationState(true);
      })
      .catch(err => {
        changeRegistrationState(false);
        console.log(err);
      })
  }

  return (
    <>
      <AuthenticationForm
        buttonText="Зарегистрироваться"
        title="Регистрация"
        onChange={handleChange}
        onSubmit={handleSubmit}
        formValue={values}
        errors={errors}
        isSubmitting={isSubmitting}
        emailName={[EMAIL]}
        passwordName={[PASSWORD]}
        emailValue={values[EMAIL]}
        passwordValue={values[PASSWORD]}
        emailError={errors[EMAIL]}
        passwordError={errors[PASSWORD]}
      />
      <Link className="authentication__link" to="/sign-in" >Уже зарегистрированы? Войти</Link>
    </>
  )
}

export default Register;