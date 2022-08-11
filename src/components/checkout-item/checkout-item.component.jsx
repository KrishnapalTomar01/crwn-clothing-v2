import { CheckoutItemContainer, ImageContainer, SpanText, 
    Quantity, Value, RemoveButton, Arrow } from './checkout-item.styles';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CheckoutItem = ({cartItem}) => {
    const {name, price, quantity, imageUrl} = cartItem;
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
    const removeItemFromCartHandler = () => removeItemFromCart(cartItem);
    const addItemToCartHandler = () => addItemToCart(cartItem);
    const clearCartItemHandler = () => clearItemFromCart(cartItem);
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