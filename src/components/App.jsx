import { useState, useEffect } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api"


function App({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onClose, onCardLike }) {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState('');

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getAllInfo()
    .then(([userData, cardsArray]) => {
      console.log(userData);
      setCurrentUser(userData);
      setCards(cardsArray);
    })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id) // определяем, есть ли у карточки лайк, поставленный текущим пользователем
    api.swapLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((c) => 
          c._id === card._id ? newCard : c)
        )
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <Footer />
      </div>
      <PopupWithForm name="new-card" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <ul className="popup__input-list">
          <li className="popup__input-item">
            <input type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required
              className="popup__input popup__input_value_title" />
            <span className="error" id="name-error"></span>
          </li>
          <li>
            <input type="url" name="link" placeholder="Ссылка на картинку" required
              className="popup__input popup__input_value_link" />
            <span className="error" id="link-error"></span>
          </li>
        </ul>
      </PopupWithForm>
      <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <ul className="popup__input-list">
          <li className="popup__input-item">
            <input type="text" name="user" placeholder="Ваше имя" minLength="2" maxLength="40" required
              className="popup__input popup__input_value_name" />
            <span className="error" id="user-error"></span>
          </li>
          <li>
            <input type="text" name="about" placeholder="Ваше занятие" minLength="2" maxLength="200"
              required className="popup__input popup__input_value_activity" />
            <span className="error" id="about-error"></span>
          </li>
        </ul>
      </PopupWithForm>
      <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <ul className="popup__input-list">
          <li className="popup__input-item">
            <input type="url" name="avatar" placeholder="Ссылка на аватар" required
              className="popup__input popup__input_value_avatar" />
            <span className="error" id="avatar-error"></span>
          </li>
        </ul>
      </PopupWithForm>
      <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да">
        <ul className="popup__input-list">
          <li className="popup__input-item">
            <input type="url" name="avatar" placeholder="Ссылка на аватар" required
              className="popup__input popup__input_value_avatar" />
            <span className="error" id="avatar-error"></span>
          </li>
        </ul>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;