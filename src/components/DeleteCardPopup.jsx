import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup({ isOpen, card, onClose, onCardDelete, onOverlay }) {

    function handleSubmit(evt) {
        evt.preventDefault();
        onCardDelete(card)
    }

    return (
        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onOverlay={onOverlay}
            onSubmit={handleSubmit} >
        </PopupWithForm>
    )

}