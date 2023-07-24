import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({isOpen, name, title, isSubmitting, buttonText, children, onSubmit, buttonClass}) {
  const { closeAllPopups } = useContext(AppContext);

  usePopupClose(isOpen, closeAllPopups);

  return (
    <div className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`}>
      <div className={`popup__container popup__container_place_${name}`}>
        <button type="button" className="popup__reset-button" aria-label="Отменить" onClick={closeAllPopups}></button>
        <h3 className="popup__title">{title}</h3>
        <form onSubmit={onSubmit} className="popup__form" name={name} noValidate>
          {children}
          <button
            type="submit"
            className={`${buttonClass || 'popup__confirm-button'}${isSubmitting ? '' : ` ${buttonClass || 'popup__confirm-button'}_disabled`}`}
            disabled={!isSubmitting}
          >
            {buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;