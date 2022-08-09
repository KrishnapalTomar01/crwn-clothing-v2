import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CartIcon = () => {
    const {cartOpen, setCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setCartOpen(!cartOpen);

    return (
        <div onClick={toggleIsCartOpen} className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div> 
    );
}

export default CartIcon;