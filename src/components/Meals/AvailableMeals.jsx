import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

import { useState, useCallback, useEffect } from "react";

export default function AvailableMeals() {
    const [meals, setMeals] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const fetchMealsHandler = useCallback(async () => {
        try {
            const response = await fetch(
                "https://go-fetch-264c5-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
            );

            if (!response.ok) {
                throw new Error("Something went wrong...");
            }

            const data = await response.json();

            const loadedMeals = [];

            // because our meals data in firebase is an object, we can use for...in
            // to iterate through and push individual meal objs into our loadedMeals array
            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                });
            }

            setMeals(loadedMeals);
        } catch (error) {
            setError(error.message);
        }

        setIsFetching(false);
    }, []);

    useEffect(() => {
        fetchMealsHandler();
    }, [fetchMealsHandler]);

    if (isFetching) {
        return (
            <section>
                <p className={classes.mealsLoading}>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={classes.mealsError}>
                <p>{error}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => {
        return (
            <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        );
    });

    return (
        <section className={classes.meals}>
            {!isFetching && <ul>{mealsList}</ul>}
        </section>
    );
}
