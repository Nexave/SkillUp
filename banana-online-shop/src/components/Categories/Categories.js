import Category from './Category/Category.js';
import Products from '../Products/Products';
import Pagination from '../Pagination/Pagination.js';
import productsData from '../../assets/database/products.json';
import './Categories.scss';

class Categories {
    constructor() {
        this.categories = document.createElement('div');

        this.categories.className = 'categories';

        const categoryList = productsData.reduce((result, productData) => {
            const { category } = productData;

            if (!result.includes(category)) {
                result.push(category);
            }

            return result;
        }, []);

        for (const category of categoryList) {
            this.categories.append(new Category(category));
        }
        
        this.categories.addEventListener(
            'click',
            this.onSwitchCategoryHandler
        );

        return this.categories;
    }

    static getActiveCategory() {
        const activeCategory = document.querySelector('.category_active');

        // first render when activeCategory does not exist yet
        if (!activeCategory) return 'TV';

        // return activeCategory.dataset.category;
        return activeCategory.getAttribute('data-category');
    }

    onSwitchCategoryHandler(e) {
        const categoryBtn = e.target.closest('.category');

        if (!categoryBtn) return;
        if (categoryBtn.classList.contains('category_active')) return;

        const activeBtn = document.querySelector('.category_active');
        activeBtn.classList.remove('category_active');

        categoryBtn.classList.add('category_active');

        Pagination.render();
        Products.render();
    }
}

export default Categories;
