function AuthenticationForm(props) {
  return (
    <div className="authentication">
      <h2 className="authentication__title">{props.title}</h2>
      <form className="authentication__form" onSubmit={props.onSubmit} noValidate>
        <input
          id="emailInput"
          className="authentication__input"
          type="email"
          name={props.emailName}
          placeholder="Email"
          required
          value={props.emailValue}
          onChange={props.onChange}
        />
        <span id="emailInputError" className="authentication__error authentication__error_visible">{props.emailError && props.emailError}</span>
        <input
          id="passwordInput"
          className="authentication__input"
          type="password"
          name={props.passwordName}
          placeholder="Пароль"
          required
          value={props.passwordValue}
          onChange={props.onChange}
        />
        <span id="passwordInputError" className="authentication__error authentication__error_visible">{props.passwordError && props.passwordError}</span>
        <button
          className="authentication__submit-button"
          type="submit"
          disabled={!props.isSubmitting}
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  )
}

export default AuthenticationForm;