import { useEffect } from "react"

export default function PopupWithForm(props) {

    useEffect(() => {
        const handleEscClick = (evt) => {
            const key = evt.key;
            if (key === 'Escape') {
                props.onClose()
            }
        }

        if (props.isOpen) {
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
            <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_is-opened' : ''}`}
                onClick={handleOverlayClick}>
                <div className="popup__container">
                    <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                    <h2 className="popup__title">{props.title}</h2>
                    <form name={`${props.name}-form`} className="popup__form" noValidate>
                        {(props.children)}
                    </form>
                    <button type="submit" name="submit" value="submit"
                        className="popup__button-sumbit popup__button-sumbit_create">{props.buttonText}</button>
                </div>
            </div>
        </>
    )
}