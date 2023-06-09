import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { nanoid } from "nanoid"; // randomised string ID => alternative value for id

export default function MealItemForm(props) {
    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        // stores 'ref' for item amount as string
        const enteredAmount = amountInputRef.current.value;

        // converts that string 'ref' into number
        const enteredAmountToNumber = +enteredAmount;

        // validation
        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountToNumber < 1 ||
            enteredAmountToNumber > 5
        ) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountToNumber);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: nanoid(),
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1 - 5)</p>}
        </form>
    );
}
