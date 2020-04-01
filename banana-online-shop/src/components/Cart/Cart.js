import Button from '../UI/Button/Button';
import productsData from '../../assets/database/products.json';
import CartProduct from './CartProduct/CartProduct';
import './Cart.scss';

class Cart {
    constructor() {
        this.cart = document.createElement('div');

        this.cart.className = 'cart';
        this.cart.innerHTML = `
            <table class="cart__table">
                <thead class="cart__thead">
                    <tr>
                        <th class="cart__th">Image</th>
                        <th class="cart__th">Model</th>
                        <th class="cart__th">Price</th>
                        <th class="cart__th">Quantity</th>
                        <th class="cart__th">Total</th>
                    </tr>
                </thead>

                <tbody class="cart__tbody">
                    
                </tbody>

                <tfoot class="cart__tfoot">
                    <tr>
                        <td class="cart__td " colspan="4"></td>
                        <td class="cart__td">+5%</td>
                    </tr>

                    <tr>
                        <td class="cart__td" colspan="4">Total</td>
                        <td class="cart__td cart__td_total">0</td>
                    </tr>
                </tfoot>
            </table>
        `;
        this.tBody = this.cart.querySelector('.cart__tbody');
        this.totalCell = this.cart.querySelector('.cart__td_total');
        this.renderCartBody()
        this.cart.append(new Button({ text: 'Confirm Order' }));

        return this.cart;
    }
    renderCartBody(){
        const cartProducts = localStorage.getItem('cartProducts');

        if (!cartProducts) return
            const parsedCartProducts = JSON.parse(cartProducts);

            const filteredProducts = parsedCartProducts.reduce((result, productId) => {
                const cartProduct = result.find(p => {
                    return p.id === productId;
                });

                if (cartProduct) {
                    cartProduct.quantity++;

                    return result;
                }

                const newCartProduct = productsData.find(p => {
                    return p.id === productId;
                });

                result.push({
                    id: newCartProduct.id,
                    model: newCartProduct.model,
                    imageSrc: newCartProduct.imageSrc,
                    price: newCartProduct.price,
                    quantity: 1
                });

                return result;
            }, []);

            const {tableRows,totalSum} = filteredProducts.reduce((result,product)=>{
                result.tableRows.push(new CartProduct(product));
                result.totalSum += product.price * product.quantity;
                return result
            },{tableRows:[],totalSum:0})

            this.tBody.append(...tableRows);
            this.totalCell.textContent = totalSum * 1.05;

    }
}

export default Cart;
