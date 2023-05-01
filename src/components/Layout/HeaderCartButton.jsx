import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/CartContext";

export default function HeaderCartButton(props) {
    const [btnIsActivated, setBtnIsActivated] = useState(false);

    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((currentVal, item) => {
        return currentVal + item.amount;
    }, 0);

    // .bump cart button animation

    const { items } = cartCtx;

    const btnClasses = `${classes.button} ${btnIsActivated ? classes.bump : " "}`;

    useEffect(() => {
        if (items.length === 0) return;
        
        setBtnIsActivated(true);

        // animation timer: animation ceases 300ms after it fires   
        const timer = setTimeout(() => {
            setBtnIsActivated(false);
        }, 300);

        // cleanup function
        return () => {
            clearTimeout(timer);
        }

    }, [items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
}
