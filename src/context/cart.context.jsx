import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN'
}

const INITIAL_STATE = {
    cartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return { ...state, ...payload }
        case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
            return { ...state, cartOpen: payload }
        default:
            throw new Error(`Unhandled type: ${type} not defined.`)
    }
}

const calculateCartItemCount = (cartItems) => cartItems.reduce((previous, current) =>
    current.quantity + previous, 0);

const calculateCartTotal = (cartItems) => cartItems.reduce((total, currentItem) =>
    total + currentItem.price * currentItem.quantity, 0);

export const CartContext = createContext({
    cartOpen: false,
    setCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    cartCount: 0,
    removeItemFromCart: () => null,
    clearItemFromCart: () => null,
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [{ cartOpen, cartCount, cartTotal, cartItems }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const setCartItems = (newCartItems) => {
        const payload = {
            cartItems: newCartItems,
            cartTotal: calculateCartTotal(newCartItems),
            cartCount: calculateCartItemCount(newCartItems)
        }
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    }

    const setCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, bool));
    }

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (productToRemove) => {
        setCartItems(clearCartItem(cartItems, productToRemove));
    }

    const value = {
        cartOpen, setCartOpen, addItemToCart, cartItems, cartCount,
        clearItemFromCart, removeItemFromCart, cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}