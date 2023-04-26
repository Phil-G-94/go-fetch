import { useContext } from "react";
import CartContext from "../../store/CartContext";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

export default function Cart(props) {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`; // .toFixed(2). totalAmount currently returns undefined (?)

    const hasItems = cartCtx.items.length > 0;
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button
                    className={classes["button--alt"]}
                    onClick={props.onClose}
                >
                    Close
                </button>
                {/* conditional rendering: items rendered only if hasItems != 0 */}
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
}
