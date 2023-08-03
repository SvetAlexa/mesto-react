import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id //определяем, является ли текущий пользователь владельцем текущей карточки

    const isLiked = card.likes.some(i => i._id === currentUser._id) // определяем, есть ли у карточки лайк, поставленный текущим пользователем

    const cardLikeButtonClassName = (
        `element__likes ${isLiked && 'element__likes_is_active'}`
    );

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleClick() {
        onCardClick(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="element">
            <div className="element__image-container">
                <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
            </div>
            {isOwn && <button type="button" className="element__delete" onClick={handleDeleteClick} /> }
            <div className="element__title-container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="element__likes-counter">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}