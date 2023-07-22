export default function Card(props) {

    function handleClick() {
        props.onCardClick(props.card)
    }

    return (
        <>
            <li className="element">
                <button type="button" className="element__delete"></button>
                <img className="element__image" src={props.card.src} alt={props.card.title} onClick={handleClick} />
                <div className="element__title-container">
                    <h2 className="element__title">{props.card.title}</h2>
                    <div className="element__container">
                        <button type="button" className="element__likes"></button>
                        <span className="element__likes-counter"></span>
                    </div>
                </div>
            </li>
        </>
    )
}