import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidator from "../hooks/useFormValidator"

export default function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlace, onOverlay }) {

    const { values, errors, setErrors, handleInputsChange, setValues, isValid, setIsValid } = useFormValidator()

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name: values.name,
            link: values.url
        })
        setValues('')
    }

    useEffect(() => {
        setErrors('')
        setValues('')
        setIsValid(false)
    }, [isOpen])

    return (
        <PopupWithForm name="new-card" title="Новое место" buttonText={`${!isLoading ? "Создать" : "Сохранение..."}`}
            isOpen={isOpen}
            isValid={!isValid}
            onClose={onClose}
            onOverlay={onOverlay}
            onSubmit={handleSubmit}>
            <ul className="popup__input-list">
                <li className="popup__input-item">
                    <input type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required
                        className="popup__input popup__input_value_title" value={values.name ?? ''} onChange={handleInputsChange} />
                    <span className="error" id="name-error">{errors.name}</span>
                </li>
                <li>
                    <input type="url" name="url" placeholder="Ссылка на картинку" required
                        className="popup__input popup__input_value_link" value={values.url ?? ''} onChange={handleInputsChange} />
                    <span className="error" id="url-error">{errors.url}</span>
                </li>
            </ul>
        </PopupWithForm>
    )
}