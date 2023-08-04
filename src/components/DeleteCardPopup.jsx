import PopupWithForm from "./PopupWithForm";
import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function DeleteCardPopup({ isOpen, card, onClose, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    function handleSubmit(evt) {
        evt.preventDefault();
        console.log(currentUser);
        onCardDelete(card)
    }

    return (
        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
        </PopupWithForm>
    )

}