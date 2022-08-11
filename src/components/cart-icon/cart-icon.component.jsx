import { CartIconContainer, ItemCountContainer, ShoppingIconContainer } from './cart-icon.styles';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CartIcon = () => {
    const {cartOpen, setCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setCartOpen(!cartOpen);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconContainer />
            <ItemCountContainer>{cartCount}</ItemCountContainer>
        </CartIconContainer> 
    );
}

export default CartIcon;