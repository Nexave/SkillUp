import './Input.scss';

class Input {
    constructor({
        type = 'text',
        name,
        placeholder
    }) {
        this.input = document.createElement('input');

        this.input.className = 'input';
        this.input.type = type;
        this.input.placeholder = placeholder;

        if (name) {
            this.input.name = name;
        }

        return this.input;
    }
}

export default Input;
