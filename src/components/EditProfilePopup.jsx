import PopupWithForm from "./PopupWithForm"

export default function EditProfilePopup({ isOpen, onClose }) {


    return (
        <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose}>
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
    )
}