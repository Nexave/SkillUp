import Logo from '../../components/Logo/Logo';
import Auth from '../../components/Auth/Auth';
import './Header.scss';

class Header {
    constructor() {
        this.header = document.createElement('header');

        this.header.className = 'header';
        this.header.innerHTML = '<div class="header__wrapper"></div>';

        this.header.firstElementChild.append(
            new Logo('Banana Online Shop'),
            new Auth()
        );

        return this.header;
    }
}

export default Header;
