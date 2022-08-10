import { createContext, useState, useEffect } from "react";

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
    if(existingCartItem){
        if(existingCartItem.quantity === 1){
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
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const count = cartItems.reduce((previous, current) =>
            current.quantity + previous, 0);
        const newCartTotal = cartItems.reduce((total, currentItem) => 
            total + currentItem.price * currentItem.quantity, 0);
        setCartCount(count);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (productToRemove) => {
        setCartItems(clearCartItem(cartItems, productToRemove));
    }

    const value = { cartOpen, setCartOpen, addItemToCart, cartItems, cartCount, 
        clearItemFromCart, removeItemFromCart, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}