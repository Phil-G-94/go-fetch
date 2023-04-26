import classes from "./input.module.css";
import React from "react";

const Input = React.forwardRef(function Input(props, ref) {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input}></input>
        </div>
    );
});

export default Input;
