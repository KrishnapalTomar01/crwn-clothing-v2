import { CartIconContainer, ItemCountContainer, ShoppingIconContainer } from './cart-icon.styles';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';

const CartIcon = () => {
    const dispatch = useDispatch();
    const cartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!cartOpen));

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconContainer />
            <ItemCountContainer>{cartCount}</ItemCountContainer>
        </CartIconContainer> 
    );
}

export default CartIcon;