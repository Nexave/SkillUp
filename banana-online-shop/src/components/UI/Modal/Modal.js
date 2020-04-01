import './Modal.scss';

class Modal {
    constructor(content) {
        this.modal = document.createElement('div');

        this.modal.className = 'modal';

        this.modal.append(content);

        return this.modal;
    }
}

export default Modal;
