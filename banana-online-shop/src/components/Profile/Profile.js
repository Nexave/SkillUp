import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import Cart from '../Cart/Cart';
import './Profile.scss';

class Profile {
    constructor(login) {
        this.profile = document.createElement('div');

        this.profile.className = 'profile';
        this.profile.innerHTML = `
            <h1 class="profile__login">${login}</h1>

            <div class="profile__icon-wrapper">
                <i class="fas fa-shopping-cart profile__icon"></i>
            </div>
        `;

        this.profile.append(new Button({
            text: 'Logout',
            additionalClasses: 'button__alternative'
        }));

        const iconWrapper = this.profile.querySelector('.profile__icon-wrapper');
        iconWrapper.addEventListener('click', this.openCartHandler.bind(this));

        return this.profile;
    }

    openCartHandler() {
        document.body.style.overflowY = 'hidden';
        document.body.style.paddingRight = '15px';

        const cart = new Cart();

        this.profile.append(
            new Backdrop(this.closeModalHandler.bind(this)),
            new Modal(cart)
        );
    }

    closeModalHandler() {
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '';

        const modal = this.profile.querySelector('.modal');
        const backdrop = this.profile.querySelector('.backdrop');

        modal.remove();
        backdrop.remove();
    }
}

export default Profile;
