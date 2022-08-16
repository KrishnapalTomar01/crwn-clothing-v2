import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id ?
                { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);
    if (existingCartItem) {
        if (existingCartItem.quantity === 1) {
            return cartItems.filter((cartItem) => cartItem.id !== existingCartItem.id);
        }
        return cartItems.map(cartItem =>
            cartItem.id === existingCartItem.id ?
                { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    }
    return cartItems;
}

const clearCartItem = (cartItems, productToRemove) =>
    cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)

export const addItemToCart = (cartItems, productToAdd) => {
   return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, addCartItem(cartItems, productToAdd));
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, removeCartItem(cartItems, productToRemove));
}

export const clearItemFromCart = (cartItems, productToRemove) => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, clearCartItem(cartItems, productToRemove));
}

export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, boolean);


