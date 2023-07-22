import { useState } from "react"
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup"


function App({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onClose }) {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

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
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
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
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;