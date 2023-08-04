import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup({ isOpen, isLoading, card, onClose, onCardDelete, onOverlay }) {

    function handleSubmit(evt) {
        evt.preventDefault();
        onCardDelete(card)
    }

    return (
        <PopupWithForm name="delete" title="Вы уверены?" buttonText={`${!isLoading ? "Да" : "Удаление..."}`}
            isOpen={isOpen}
            onClose={onClose}
            onOverlay={onOverlay}
            onSubmit={handleSubmit} >
        </PopupWithForm>
    )

}