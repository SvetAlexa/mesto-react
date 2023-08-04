import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, onOverlay }) {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            link,
            name: title
        })
        setLink('');
        setTitle('')
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    function handleChangeTitle(evt) {
        setTitle(evt.target.value);
    }

    return (
        <PopupWithForm name="new-card" title="Новое место" buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onOverlay={onOverlay}
            onSubmit={handleSubmit}>
            <ul className="popup__input-list">
                <li className="popup__input-item">
                    <input type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required
                        className="popup__input popup__input_value_title" value={title} onChange={handleChangeTitle} />
                    <span className="error" id="name-error"></span>
                </li>
                <li>
                    <input type="url" name="link" placeholder="Ссылка на картинку" required
                        className="popup__input popup__input_value_link" value={link} onChange={handleChangeLink} />
                    <span className="error" id="link-error"></span>
                </li>
            </ul>
        </PopupWithForm>
    )
}