export default function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card)
    }

    return (
        <li className="element">
            <div className="element__image-container">
                <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
            </div>
            <button type="button" className="element__delete"></button>
            <div className="element__title-container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__container">
                    <button type="button" className="element__likes"></button>
                    <span className="element__likes-counter"></span>
                </div>
            </div>
        </li>
    )
}