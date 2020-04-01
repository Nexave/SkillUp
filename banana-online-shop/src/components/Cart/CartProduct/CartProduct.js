import "./CartProduct.scss"
class CartProduct{
	constructor({
        model,
        imageSrc,
        price,
        quantity
	}){
		this.cartProduct = document.createElement('tr');
		this.cartProduct.className = 'cartProduct';
		this.cartProduct.innerHTML = ` 
            <td class="cart__td">
				<img class="cart-product__img" src="${imageSrc}"alt="${model}">
            </td>
            <td class="cart__td">${model}</td>
            <td class="cart__td">${price}</td>
            <td class="cart__td">${quantity}</td>
            <td class="cart__td">${quantity * price}</td>
		`
		return this.cartProduct;
	}
}

export default CartProduct;