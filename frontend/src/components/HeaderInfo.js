function HeaderInfo(props) {
  return (
    <ul className="header__info">
      <li className="header__email">{props.email}</li>
      <li className="header__link header__link_type_logout" onClick={props.onClick}>Выйти</li>
    </ul>
  )
}

export default HeaderInfo;