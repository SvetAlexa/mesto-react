import { useState, useEffect } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api"


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  // const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

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

  // function handleButtonDeleteClick() {
  //   setIsDeletePopupOpen(true);
  // }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id) // определяем, есть ли у карточки лайк, поставленный текущим пользователем
    api.swapLike(card._id, isLiked) // отправляем запрос в API и получаем обновленные данные карточки
      .then((newCard) => {
        setCards((state) =>
          state.map((item) =>
            item._id === card._id ? newCard : item)
        )
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((item) =>
            item._id !== card._id
          )
        })
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
  }

  function handleUpdateUser(userInfo) {
    api.editUserInfo(userInfo)
    .then((userInfoUpdated) => {
      setCurrentUser(userInfoUpdated);
      closeAllPopups()
    })
    .catch((err) => {
      console.error(`Произошла ошибка: ${err}`)
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
          onCardDelete={handleCardDelete}
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
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <ul className="popup__input-list">
          <li className="popup__input-item">
            <input type="url" name="avatar" placeholder="Ссылка на аватар" required
              className="popup__input popup__input_value_avatar" />
            <span className="error" id="avatar-error"></span>
          </li>
        </ul>
      </PopupWithForm>
      <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" onClose={closeAllPopups}>
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