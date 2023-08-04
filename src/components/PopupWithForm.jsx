import { useEffect } from "react"

export default function PopupWithForm({ name, title, buttonText, isOpen, onClose, children, onSubmit, onOverlay }) {

    useEffect(() => {
        const handleEscClick = (evt) => {
            const key = evt.key;
            if (key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscClick)
        }

        return () => {
            document.removeEventListener('keydown', handleEscClick)
        }
    })


   

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''}`}
            onClick={onOverlay}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form name={`${name}-form`} className="popup__form" noValidate onSubmit={onSubmit}>
                    {children}
                    <button type="submit" name="submit" value="submit"
                    className="popup__button-sumbit popup__button-sumbit_create" >{buttonText}</button>
                </form>
                
            </div>
        </div>
    )
}