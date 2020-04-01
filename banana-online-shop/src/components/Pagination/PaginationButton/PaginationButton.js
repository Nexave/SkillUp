import './PaginationButton.scss';

class PaginationButton {
    constructor(value) {
        this.paginationButton = document.createElement('div');

        this.paginationButton.className = value !== 1
            ? 'pagination-button'
            : 'pagination-button pagination-button_active';

        this.paginationButton.innerHTML = `
            <strong class="pagination-button__value">
                ${value}
            <strong>
        `;

        this.paginationButton.setAttribute('data-page', value);

        return this.paginationButton;
    }
}

export default PaginationButton;
