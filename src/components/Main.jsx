import { useState, useEffect } from "react";
import api from '../utils/api';
import Card from "./Card";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo()
            .then((userData) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
            })
            .catch((err) => {
                console.error(`Произошла ошибка: ${err}`)
            })
    }, [])

    useEffect(() => {
        api.getInitialCards()
            .then((cardsArray) => {
                setCards(cardsArray);
            })
            .catch((err) => {
                console.error(`Произошла ошибка: ${err}`)
            })
    }, [])

    return (
        <main className="main">
            <section className="profile page__container-profile">
                <div className="profile__container-avatar" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar} alt="фотография профиля" />
                    <div className="profile__overlay" >
                        <div className="profile__avatar-edit-icon" ></div>
                    </div>
                </div>
                <div className="profile__info">
                    <div className="profile__name-container">
                        <h1 className="profile__name">{userName}</h1>
                        <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__activity">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-card-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements page__container-elements" aria-label="Галерея с фотографиями">
                <ul className="elements__lists">
                    {cards.map((item) => (
                        <Card
                            key={item._id}
                            card={item}
                            onCardClick={onCardClick}
                        />
                    ))
                    }
                </ul>
            </section>
        </main>
    )
}
