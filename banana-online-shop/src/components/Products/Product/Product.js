import Button from '../../UI/Button/Button';
import Rating from '../../Rating/Rating';
import Spinner from '../../UI/Spinner/Spinner';
import './Product.scss';

class Product {
    constructor({
        id,
        category, // h1
        model, // h3
        manufacturer, // h2
        country, // h4
        imageSrc,
        price, // h3
        rating,
        description, // p
        warranty // h4
    }) {
        this.product = document.createElement('div');
        this.spinner = new Spinner();

        this.product.setAttribute('data-id', id);
        this.product.className = 'product';
        this.product.innerHTML = `
            <div class="product__top">
                <h3 class="product__model">${model}</h3>
            </div>

            <div class="product__img-wrapper">
                <img class="product__img product__img_hidden" src="${imageSrc}" alt="${model}">
            </div>

            <h1 class="product__category">${category}</h1>
            <h2 class="product__manufacturer">${manufacturer}</h2>
            <h4 class="product__country">${country}</h4>
            <h3 class="product__price">$${price}</h3>
            <h4 class="product__warranty">Warranty: ${warranty}</h4>
            <p class="product__description">${description.slice(0, 150)}...</p>
        `;

        const imgWrapper = this.product.querySelector('.product__img-wrapper');
        imgWrapper.append(this.spinner);
        this.product.firstElementChild.append(new Rating(rating));
        this.product.append(new Button({ text: 'Add to Cart' }));

        imgWrapper.firstElementChild.addEventListener(
            'load',
            this.onLoadImageHandler.bind(this)
        );

        return this.product;
    }
    
    onLoadImageHandler(e) {
        const image = e.target;

        setTimeout(() => {
            image.classList.remove('product__img_hidden');
            this.spinner.remove();
        }, 1500);
    }
}

export default Product;
