import mealsImage from "/src/assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

export default function Header(props) {
    return (
        <>
            <header className={classes.header}>
                <h1 className={classes["heading-text"]}>
                    GoFetch: Food Order App
                </h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="A buffet table full of food."></img>
            </div>
        </>
    );
}
