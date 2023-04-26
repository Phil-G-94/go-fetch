import classes from "./MealsSummary.module.css";

export default function MealsSummary() {
    return (
        <section className={classes.summary}>
            <h2>Delicious food, at your doorstep!</h2>
            <p>
                Choose your favourite meal from our broad selection and enjoy a
                delicious lunch or dinner at home.
            </p>
            <p>
                All our meals are cooked with high-quality, organic ingredients.
                Prepared just in time and with lots of love by our experienced
                chefs.
            </p>
        </section>
    );
}
