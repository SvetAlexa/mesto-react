import { useEffect } from "react"

function ImagePopup({ card, onClose }) {

    useEffect(() => {
        const handleEscClick = (evt) => {
            const key = evt.key;
            if (key === 'Escape') {
                onClose()
            }
        }

        if (card) {
            document.addEventListener('keydown', handleEscClick)
        }

        return () => {
            document.removeEventListener('keydown', handleEscClick)
        }
    })


    function handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            onClose()
        }
    }

    return (
        <div className={`popup popup_type_image ${card ? 'popup_is-opened' : ''}`} onClick={handleOverlayClick}>
            <div className="popup__container-image">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <figure className="popup__figure">
                    <img className="popup__image" src={card?.link} alt={card?.name} />
                    <figcaption className="popup__caption">{card?.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup