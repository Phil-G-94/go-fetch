import { useContext, useState } from "react";
import { nanoid } from "nanoid";
import CartContext from "../../store/CartContext";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

export default function Cart(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const [isCheckout, setIsCheckout] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        const response = await fetch(
            "https://go-fetch-264c5-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
            {
                method: "POST",
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Something went wrong...");
        } else {
            setIsSubmitting(false);
            setDidSubmit(true);
            cartCtx.clearCart();
        }
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={nanoid()}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)} // using .bind() to preconfigure the arguments received by RemoveHandler & AddHandler functions
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button
                className={classes["button--alt"]}
                onClick={props.onClose}
            >
                Close
            </button>
            {/* conditional rendering: items rendered only if hasItems != 0 */}
            {hasItems && (
                <button
                    className={classes.button}
                    onClick={orderHandler}
                >
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <CheckoutForm
                    onCancel={props.onClose}
                    onSubmit={submitOrderHandler}
                />
            )}
            {!isCheckout && modalActions}
        </>
    );

    const isSubmittingModalContent = (
        <p className={classes["modal-content"]}>
            The order is being submitted.
        </p>
    );
    const didSubmitModalContent = (
        <>
            <p className={classes["modal-content"]}>
                Order placed! We&apos;ll let you know when it&apos;s ready
            </p>
            <div className={classes.actions}>
                <button
                    className={classes.button}
                    onClick={props.onClose}
                >
                    Close
                </button>
            </div>
        </>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}
