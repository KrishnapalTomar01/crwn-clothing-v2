import { createSelector } from "reselect";

const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.cartOpen
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((previous, current) =>
        current.quantity + previous, 0) 
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, currentItem) =>
        total + currentItem.price * currentItem.quantity, 0)
)