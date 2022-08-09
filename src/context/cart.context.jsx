import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //find if cart item contains productToAdd

    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    if(existingCartItem){
        return cartItems.map(cartItem => 
            cartItem.id === productToAdd.id ? 
            {...cartItem, quantity : cartItem.quantity + 1} 
            : cartItem
        )
    }
    
    //If found increment quantity
    return [...cartItems, {...productToAdd, quantity : 1 }]
    //return new array with modified / new cart item
}

export const CartContext = createContext({
    cartOpen: false,
    setCartOpen: () => null,
    cartItems :[],
    addItemToCart: () => null
});

export const CartProvider = ({ children }) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = { cartOpen, setCartOpen, addItemToCart, cartItems };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}