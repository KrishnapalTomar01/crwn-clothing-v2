import { CartItem } from "./cart.types";
import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartState = {
    readonly cartOpen: boolean,
    readonly cartItems: CartItem[]
}

const CART_INITIAL_STATE: CartState = {
    cartOpen: false,
    cartItems: []
}

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
    if(setIsCartOpen.match(action)) {
        return { ...state, cartOpen: action.payload };
    } 

    if(setCartItems.match(action)) {
        return { ...state, cartItems: action.payload };
    }

    return state;
}
