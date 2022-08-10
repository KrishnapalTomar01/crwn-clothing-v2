import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CheckoutItem = ({cartItem}) => {
    const {name, price, quantity, imageUrl} = cartItem;
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
    const removeItemFromCartHandler = () => removeItemFromCart(cartItem);
    const addItemToCartHandler = () => addItemToCart(cartItem);
    const clearCartItemHandler = () => clearItemFromCart(cartItem);
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={removeItemFromCartHandler} className='arrow'>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div onClick={addItemToCartHandler} className='arrow'>&#10095;</div>
            </span>
            <span className='price'>${price}</span>
            <div onClick={clearCartItemHandler} className='remove-button'>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;