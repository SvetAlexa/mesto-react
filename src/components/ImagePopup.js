import { useEffect } from "react"

function ImagePopup(props) {

    useEffect(() => {
        const handleEscClick = (evt) => {
            const key = evt.key;
            if (key === 'Escape') {
                props.onClose()
            }
        }

        if (props.card) {
            document.addEventListener('keydown', handleEscClick)
        }

        return () => {
            document.removeEventListener('keydown', handleEscClick)
        }
    })


    function handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            props.onClose()
        }
    }

    return (
        <>
            <div className={`popup popup_type_image ${props.card ? 'popup_is-opened' : ''}`} onClick={handleOverlayClick}>
                <div className="popup__container-image">
                    <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                    <figure className="popup__figure">
                        <img className="popup__image" src={props.card.src} alt={props.card.title} />
                        <figcaption className="popup__caption">{props.card.title}</figcaption>
                    </figure>
                </div>
            </div>
        </>
    )
}

export default ImagePopup