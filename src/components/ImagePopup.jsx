function ImagePopup({ card, isOpen, onClose, onOverlay }) {

    return (
        <div className={`popup popup_type_image ${isOpen ? 'popup_is-opened' : ''}`} onClick={onOverlay}>
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