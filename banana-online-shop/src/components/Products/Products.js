import Product from './Product/Product';
import Categories from '../Categories/Categories';
import Pagination from '../Pagination/Pagination';
import productsData from '../../assets/database/products.json';
import './Products.scss';

class Products {
    constructor() {
        this.products = document.createElement('div');

        this.products.className = 'products';

        Products.render(this.products);

        this.products.addEventListener(
            'click',
            this.addProductToCart.bind(this)
        );

        return this.products;
    }

    static filterProducts() {
        const activeCategory = Categories.getActiveCategory();
        const activePage = Pagination.getActivePage();

        const filteredProducts = productsData.filter(element => {
            return element.category === activeCategory;
        });

        const min = (activePage - 1) * 3;
        const max = activePage * 3;

        return {
            filteredProducts: filteredProducts.slice(min, max),
            totalAmount: filteredProducts.length
        };
    }

    static render(location) {
        let where = location;
        const { filteredProducts } = Products.filterProducts();
        
        const productsContainer = document.querySelector('.products');

        if (productsContainer) {
            where = new DocumentFragment();
        }

        // let from = (activePage - 1) * 9;

        // for (let i = 0; i < 9; i++) {
        //     const productData = filteredProducts[from];

        //     from++;

        //     let stop = filteredProducts.length - from;

        //     if (stop < 0) break;

        //     where.append(new Product(productData));
        // }

        for (const productData of filteredProducts) {
            where.append(new Product(productData));
        }

        if (productsContainer) {
            productsContainer.innerHTML = '';
            productsContainer.append(where);
        }
    }

    addProductToCart(e) {
        const button = e.target;

        if (button.tagName !== 'BUTTON') return;

        const product = button.closest('.product');
        const { id } = product.dataset;

        const cartProducts = localStorage.getItem('cartProducts');

        if (cartProducts) {
            const parsedCartProducts = JSON.parse(cartProducts);

            localStorage.setItem(
                'cartProducts',
                JSON.stringify([...parsedCartProducts, +id])
            );
        } else {
            localStorage.setItem('cartProducts', JSON.stringify([+id]));
        }
    }
}

export default Products;
