import CartContext from "./CartContext";
import { useReducer } from "react";

// initial state for reducer
const defaultCartState = {
    items: [],
    totalAmount: 0,
};

// reducer function
const cartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        // returns new state snapshot in shallow copy of array
        const updatedItems = state.items.concat(action.item);

        const updatedTotalAmount = (state.totalAmount +=
            action.item.price * action.item.amount);
        return {
            ...state,
            items: updatedItems,
            amount: updatedTotalAmount,
        };
    }
    return defaultCartState;
};

// wrapper component for CartContext.
// contains the context object handling logic.

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    // forwarding the item to reducer, add item action
    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD_ITEM", item: item });
    };

    // forward the id to reducer, remove item action
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE_ITEM", id: id });
    };

    // replicate the default value object declared at context creation in CartContext.js
    // this will be the *concrete context value* that will be updated over time
    // .items and .totalAmount, made readable within CartProvider.js by CartContext

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
