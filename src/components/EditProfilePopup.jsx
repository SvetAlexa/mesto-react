import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormValidator from "./useFormValidator"

export default function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser, onOverlay }) {

    const currentUser = useContext(CurrentUserContext);

    const { values, errors, setErrors, handleInputsChange, setValues, isValid, setIsValid } = useFormValidator()

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({ name: values.user, about: values.about })
    }

    useEffect(() => {
        setValues({ user: currentUser.name, about: currentUser.about })
        if (Object.keys(currentUser).length !== 0) {   
            setIsValid(true)
        }
        setErrors('')
    }, [currentUser, isOpen])

    return (
        <PopupWithForm name="edit" title="Редактировать профиль" buttonText={`${!isLoading ? "Сохранить" : "Сохранение..."}`}
            isOpen={isOpen}
            isValid={!isValid}
            onClose={onClose}
            onOverlay={onOverlay}
            onSubmit={handleSubmit}>
            <ul className="popup__input-list">
                <li className="popup__input-item">
                    <input type="text" name="user" placeholder="Ваше имя" minLength="2" maxLength="40" required
                        className="popup__input popup__input_value_name" value={values.user ?? ''} onChange={handleInputsChange} />
                    <span className="error" id="user-error">{errors.user}</span>
                </li>
                <li>
                    <input type="text" name="about" placeholder="Ваше занятие" minLength="2" maxLength="200"
                        required className="popup__input popup__input_value_activity" value={values.about ?? ''} onChange={handleInputsChange} />
                    <span className="error" id="about-error">{errors.about}</span>
                </li>
            </ul>
        </PopupWithForm>
    )
}