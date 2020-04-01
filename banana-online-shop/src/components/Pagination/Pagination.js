import Products from '../Products/Products';
import PaginationButton from './PaginationButton/PaginationButton';
import './Pagination.scss';

class Pagination {
    constructor() {
        this.pagination = document.createElement('div');

        this.pagination.className = 'pagination';

        Pagination.render(this.pagination);

        this.pagination.addEventListener(
            'click',
            this.onSwitchPageHandler.bind(this)
        );

        return this.pagination;
    }

    static getActivePage() {
        const activeBtn = document.querySelector('.pagination-button_active');

        return activeBtn ? activeBtn.dataset.page : 1;
    }

    static render(location) {
        let where = location;

        const { totalAmount } = Products.filterProducts();

        const amount = Math.ceil(totalAmount / 3);

        if (!location) {
            where = new DocumentFragment();
        }

        for (let i = 0; i < amount; i++) {
            where.append(new PaginationButton(i + 1));
        }

        const paginationContainer = document.querySelector('.pagination');

        if (paginationContainer) {
            paginationContainer.innerHTML = '';
            paginationContainer.append(where);
        }
    }

    onSwitchPageHandler(e) {
        const button = e.target.closest('.pagination-button');

        if (!button || button.classList.contains('pagination-button_active')) return;
        
        const activeBtn = this.pagination.querySelector('.pagination-button_active');
        activeBtn.classList.remove('pagination-button_active');

        button.classList.add('pagination-button_active');

        Products.render();
    }
}

export default Pagination;
