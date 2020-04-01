import './Category.scss';

class Category {
    constructor(title) {
        this.category = document.createElement('div');

        // this.category.className = title === 'Smartphone'
        this.category.className = title === 'TV'
            ? 'category category_active'
            : 'category';
            
        this.category.innerHTML = `
            <strong class="category__title">${title}</strong>
        `;

        this.category.setAttribute('data-category', title);

        return this.category;
    }
}

export default Category;
