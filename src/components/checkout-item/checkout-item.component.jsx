import { useDispatch, useSelector } from 'react-redux';
import { CheckoutItemContainer, ImageContainer, SpanText, 
    Quantity, Value, RemoveButton, Arrow } from './checkout-item.styles';
import { removeItemFromCart, addItemToCart, clearItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const {name, price, quantity, imageUrl} = cartItem;
    const cartItems = useSelector(selectCartItems);

    const removeItemFromCartHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const addItemToCartHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const clearCartItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <SpanText>{name}</SpanText>
            <Quantity>
                <Arrow onClick={removeItemFromCartHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemToCartHandler}>&#10095;</Arrow>
            </Quantity>
            <SpanText>${price}</SpanText>
            <RemoveButton onClick={clearCartItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;