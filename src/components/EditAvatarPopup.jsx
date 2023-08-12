import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidator from "../hooks/useFormValidator"

export default function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar, onOverlay }) {
    
    const { values, errors, setErrors, handleInputsChange, setValues, isValid, setIsValid } = useFormValidator()

    const inputAvatarRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: inputAvatarRef.current.value
        })
    }

    useEffect(() => {
        setErrors('')
        setValues('')
        setIsValid(false)
    }, [isOpen])

    return (
        <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText={`${!isLoading ? "Сохранить" : "Сохранение..."}`}
            isOpen={isOpen}
            isValid={!isValid}
            onClose={onClose}
            onOverlay={onOverlay}
            onSubmit={handleSubmit}>
            <ul className="popup__input-list">
                <li className="popup__input-item">
                    <input type="url" name="avatar" placeholder="Ссылка на аватар" required
                        className="popup__input popup__input_value_avatar" ref={inputAvatarRef} value={values.avatar ?? ''} onChange={handleInputsChange} />
                    <span className="error" id="avatar-error">{errors.avatar}</span>
                </li>
            </ul>
        </PopupWithForm>
    )
}