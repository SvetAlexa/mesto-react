import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, onOverlay }) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeAbout(evt) {
        setAbout(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({ name, about })
    }

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about)
    }, [currentUser])

    return (
        <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onOverlay={onOverlay}
            onSubmit={handleSubmit}>
            <ul className="popup__input-list">
                <li className="popup__input-item">
                    <input type="text" name="user" placeholder="Ваше имя" minLength="2" maxLength="40" required
                        className="popup__input popup__input_value_name" value={name ?? ''} onChange={handleChangeName} />
                    <span className="error" id="user-error"></span>
                </li>
                <li>
                    <input type="text" name="about" placeholder="Ваше занятие" minLength="2" maxLength="200"
                        required className="popup__input popup__input_value_activity" value={about ?? ''} onChange={handleChangeAbout} />
                    <span className="error" id="about-error"></span>
                </li>
            </ul>
        </PopupWithForm>
    )
}