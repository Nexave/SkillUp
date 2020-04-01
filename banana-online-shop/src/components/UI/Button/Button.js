import './Button.scss';

class Button {
    constructor(options) {
        const {
            text,
            type = 'button',
            additionalClasses
        } = options;

        this.button = document.createElement('button');

        this.button.className = `button ${additionalClasses || ''}`;
        this.button.type = type;
        this.button.textContent = text;

        const entries = Object.entries(options);

        for (const [ eventName, eventFunc ] of entries) {
            if (!eventName.startsWith('on') || typeof eventFunc !== 'function') continue;

            this.button.addEventListener(eventName.slice(2), eventFunc);
        }

        return this.button;
    }
}

export default Button;
