import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import Backdrop from '../UI/Backdrop/Backdrop';
import AuthContent from './AuthContent/AuthContent';
import Profile from '../Profile/Profile';
import './Auth.scss';

class Auth {
    constructor() {
        this.auth = document.createElement('div');

        this.auth.className = 'auth';

        this.auth.append(new Button({
            text: 'Sign In',
            additionalClasses: 'button__alternative',
            onclick: this.openModalHandler.bind(this)
        }));

        return new Profile('Bob Marley');

        // return this.auth;
    }

    openModalHandler() {
        document.body.style.overflowY = 'hidden';
        document.body.style.paddingRight = '15px';

        const modal = new Modal(new AuthContent(this.closeModalHandler.bind(this)));
        const backdrop = new Backdrop(this.closeModalHandler.bind(this));

        this.auth.append(modal, backdrop);
    }

    closeModalHandler() {
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '';

        const modal = this.auth.querySelector('.modal');
        const backdrop = this.auth.querySelector('.backdrop');

        modal.remove();
        backdrop.remove();
    }
}

export default Auth;
