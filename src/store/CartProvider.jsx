import CartContext from "./CartContext";
import { useReducer } from "react";

// initial state for reducer
const defaultCartState = {
    items: [],
    totalAmount: 0,
};

// reducer function
const cartReducer = (state, action) => {
    // ADD ITEM logic
    if (action.type === "ADD_ITEM") {
        const updatedTotalAmount = (state.totalAmount +=
            (action.item.price * action.item.amount) / 2); // /* IMPROVE */

        // looks for index of item whose ID === the ID of the item that's been added.
        // returns true if there's a match, false otherwise
        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.item.id;
        });

        // grabs a reference to that index. only works if the item above exists.
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        // checks if existingCartItem is truthy, which will only be the case if its already part of the array
        // updates provider logic based on quantities of items added
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            // assign the value of that index to the updatedItem obj, which includes first instance of item + the additional items of  the same ID
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            // executes if item is being added for the first time
            updatedItems = state.items.concat(action.item); // returns new state snapshot in shallow copy of array
        }

        return {
            ...state,
            items: updatedItems,
            amount: updatedTotalAmount,
        };
    }

    // REMOVE ITEM logic
    if (action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.id;
        });

        const existingItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;

        if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            // amount update following removal
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1,
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount,
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
