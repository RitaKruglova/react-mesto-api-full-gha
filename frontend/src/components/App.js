import {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { LoggedInContext } from '../contexts/LoggedInContext';
import { AppContext } from '../contexts/AppContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import '../App.css';
import InfoTooltip from './InfoTooltip';
import { getCurrentUser } from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: ''
  });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [card, setCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, [loggedIn]);

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    getCurrentUser()
      .then(res => {
        if (res) {
          setEmail(res.email);
          setLoggedIn(true);
          navigate('/', {replace: true});
          return res;
        }
      })
      .catch(err => {
        setLoggedIn(false);
        console.log(err);
      });
  }

  function changeRegistrationState(boolean) {
    setIsRegistrationSuccess(boolean);
    setIsInfoTooltipPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    return api.setUserInfo({ name, about })
      .then(res => {
        return setCurrentUser({
          ...currentUser,
          name: res.name,
          about: res.about,
        })
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    return api.changeAvatar(avatar)
      .then(res => {
        return setCurrentUser({
          ...currentUser,
          avatar: res.avatar
        })
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }

  function handleCardLike(card) {
    console.log('card', card);
    const isLiked = card.likes.some(like => like === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        let index;
        cards.forEach((c, i) => {
          if (c._id === card._id) {
            index = i;
          }
        })
        cards[index] = newCard;
        setCards([...cards])
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCardDelete(event) {
    event.preventDefault();

    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id)); 
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    return api.addNewCard({name, link })
      .then(newCard => {
        return setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  return (
    <AppContext.Provider value={{isLoading, closeAllPopups}} >
      <CurrentUserContext.Provider value={currentUser} >
        <LoggedInContext.Provider value={{loggedIn, setLoggedIn}} >
          <div className="page">
            <Header email={email} setEmail={setEmail} />
            <Routes>
              <Route
                path='/'
                element={
                  <ProtectedRoute
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardClick={handleCardClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    openDeleteCardPopup={handleDeleteCardClick}
                    element={Main}
                  />
                }
              />
              <Route path="/sign-in" element={<Login handleLogin={handleLogin} checkToken={checkToken} setEmail={setEmail} />} />
              <Route
                path="sign-up"
                element={
                  <Register
                    changeRegistrationState={changeRegistrationState}
                  />
                }
              />
            </Routes>
            <Footer />
            <EditProfilePopup
              onUpdateUser={handleUpdateUser}
              isOpen={isEditProfilePopupOpen}
            />
            <AddPlacePopup
              onAddPlace={handleAddPlaceSubmit}
              isOpen={isAddPlacePopupOpen}
            />
            <EditAvatarPopup
              onUpdateAvatar={handleUpdateAvatar}
              isOpen={isEditAvatarPopupOpen}
            />
            <PopupWithForm
              name="delete-card"
              title="Вы уверены?"
              buttonText={isLoading ? 'Удаление...' : 'Да'}
              isOpen={isDeleteCardPopupOpen}
              isSubmitting={true}
              onSubmit={handleCardDelete}
            />
            <ImagePopup
              card={selectedCard}
            />
            <InfoTooltip
              isOpen={isInfoTooltipPopupOpen}
              isRegistrationSuccess={isRegistrationSuccess}
            />
          </div>
        </LoggedInContext.Provider>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
