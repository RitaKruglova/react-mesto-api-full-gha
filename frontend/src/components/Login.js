import AuthenticationForm from "./AuthenticationForm";
import { authorise } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import useValidate from "../hooks/useValidate";
import { validateEmail, validatePassword } from "../utils/validation";

function Login({ handleLogin, setEmail }) {
  const EMAIL = 'email';
  const PASSWORD = 'password';
  const navigate = useNavigate();

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

  const { setValues, values, errors, handleChange, isSubmitting } = useValidate({
    [EMAIL]: '',
    [PASSWORD]: ''
  }, validate);

  function handleSubmit(event) {
    event.preventDefault();

    authorise(values[EMAIL], values[PASSWORD])
      .then(() => {
        setValues({
          [EMAIL]: '',
          [PASSWORD]: ''
        })
        handleLogin();
        setEmail(values[EMAIL]);
        navigate('/', {replace: true});
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <AuthenticationForm
      buttonText="Войти"
      title="Вход"
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
  )
}

export default Login;