import Input from '../UI/Input/Input';
import './Search.scss';

class Search {
    constructor() {
        this.search = document.createElement('div');

        this.search.className = 'search';
        this.search.innerHTML = '<i class="fas fa-search"></i>';

        this.search.append(new Input({ placeholder: 'Search...' }));

        this.search.lastElementChild.addEventListener(
            'focus',
            this.onFocusHandler.bind(this)
        );

        this.search.lastElementChild.addEventListener(
            'blur',
            this.onBlurHandler.bind(this)
        );

        return this.search;
    }

    onFocusHandler(e) {
        const input = e.target;
        const icon = input.previousElementSibling;

        icon.classList.add('focused');
    }

    onBlurHandler(e) {
        const input = e.target;
        const icon = input.previousElementSibling;

        icon.classList.remove('focused');
    }
}

export default Search;
