import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onOverlay }) {

    const inputAvatarRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: inputAvatarRef.current.value
        })
    }

    return (
        <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onOverlay={onOverlay}
            onSubmit={handleSubmit}>
            <ul className="popup__input-list">
                <li className="popup__input-item">
                    <input type="url" name="avatar" placeholder="Ссылка на аватар" required
                        className="popup__input popup__input_value_avatar" ref={inputAvatarRef} />
                    <span className="error" id="avatar-error"></span>
                </li>
            </ul>
        </PopupWithForm>
    )
}