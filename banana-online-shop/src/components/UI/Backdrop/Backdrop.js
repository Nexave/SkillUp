import './Backdrop.scss';

class Backdrop {
    constructor(onCloseHandler) {
        this.backdrop = document.createElement('div');

        this.backdrop.className = 'backdrop';

        if (onCloseHandler) {
            this.backdrop.addEventListener('click', onCloseHandler);
        }

        return this.backdrop;
    }
}

export default Backdrop;
