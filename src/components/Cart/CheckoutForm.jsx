import classes from "./CheckoutForm.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";

const isFiveChars = (value) => value.trim().length >= 5;

export default function CheckoutForm(props) {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postcode: true,
        city: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postcodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostcode = postcodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const postcodeIsValid = isFiveChars(enteredPostcode);
        const cityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: nameIsValid,
            street: streetIsValid,
            postcode: postcodeIsValid,
            city: cityIsValid,
        });

        const formIsValid =
            nameIsValid && streetIsValid && postcodeIsValid && cityIsValid;

        if (!formIsValid) {
            return;
        }

        // makes data available to submitOrderHandler function @ Cart.jsx, ln 30
        props.onSubmit({
            name: enteredName,
            street: enteredStreet,
            postcode: enteredPostcode,
            city: enteredCity,
        });
    };

    const nameControlClasses = formInputsValidity.name
        ? classes.control
        : classes.invalid;

    const streetControlClasses = formInputsValidity.street
        ? classes.control
        : classes.invalid;

    const postcodeControlClasses = formInputsValidity.postcode
        ? classes.control
        : classes.invalid;

    const cityControlClasses = formInputsValidity.city
        ? classes.control
        : classes.invalid;
    return (
        <form
            className={classes.form}
            onSubmit={confirmHandler}
        >
            <div className={nameControlClasses}>
                <label htmlFor="name">Your Name</label>
                <input
                    ref={nameInputRef}
                    type="text"
                    id="name"
                />
                {!formInputsValidity.name && (
                    <p className={classes["error-text"]}>
                        Please enter a valid name.
                    </p>
                )}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input
                    ref={streetInputRef}
                    type="text"
                    id="street"
                />
                {!formInputsValidity.street && (
                    <p className={classes["error-text"]}>
                        Please enter a valid street.
                    </p>
                )}
            </div>
            <div className={postcodeControlClasses}>
                <label htmlFor="postcode">Postcode</label>
                <input
                    ref={postcodeInputRef}
                    type="text"
                    id="postcode"
                />
                {!formInputsValidity.postcode && (
                    <p className={classes["error-text"]}>
                        Please enter a valid postcode.
                    </p>
                )}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input
                    ref={cityInputRef}
                    type="text"
                    id="city"
                />
                {!formInputsValidity.city && (
                    <p className={classes["error-text"]}>
                        Please enter a valid city.
                    </p>
                )}
            </div>
            <div className={classes.actions}>
                <button
                    className={classes.cancelButton}
                    onClick={props.onCancel}
                    type="button"
                >
                    Cancel
                </button>
                <button
                    className={classes.confirmButton}
                    type="submit"
                >
                    Confirm
                </button>
            </div>
        </form>
    );
}
