import Logo from '../images/logo.svg'

export default function Header() {
    return (
        <header className="header page__container-header">
            <img className="header__logo" src={Logo} alt="логотип Место Россия" />
        </header>
    )
}