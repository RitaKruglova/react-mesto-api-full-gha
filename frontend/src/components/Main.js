import { useContext} from 'react';
import pencil from '../images/pencil.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({cards, onCardClick, onCardLike, onEditProfile, onEditAvatar, onAddPlace, openDeleteCardPopup}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img id="avatar" src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
          <img src={pencil} alt="Редактировать аватар" className="profile__avatar-overlay" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__flex-row">
            <h1 id="profileName" className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" aria-label="Редактировать профиль" onClick={onEditProfile} />
          </div>
          <p id="profileDescription" className="profile__description">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="Добавить" onClick={onAddPlace} />
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card openDeleteCardPopup={openDeleteCardPopup} onCardLike={onCardLike} card={card} key={card._id} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  )
}

export default Main;