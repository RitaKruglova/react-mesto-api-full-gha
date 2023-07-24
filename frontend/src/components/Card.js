import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext} from 'react';

function Card({ card, onCardClick, onCardLike, openDeleteCardPopup }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleRecycleBinClick() {
    openDeleteCardPopup(card)
  }

  return (
    <article className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
      {isOwn && <button onClick={handleRecycleBinClick} type="button" className="card__recycle-bin" aria-label="Удалить карточку"></button>}
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-counter">
          <button onClick={handleLikeClick} type="button" className={`card__like${isLiked ? ' card__like_active' : ''}`} aria-label="Нравится"></button>
          <p className="card__counter">{card.likes.length > 0 ? `${card.likes.length}` : ''}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;