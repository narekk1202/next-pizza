import { Ingredient, ProductItem } from "@prisma/client"
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza"
import { calcPizzaPrices } from "./calc-pizza-prices"

export const getPizzaDetails = (
	size: PizzaSize,
	type: PizzaType,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

	const totalPrice = calcPizzaPrices(
		type,
		size,
		items,
		ingredients,
		selectedIngredients
	);

	return { textDetails, totalPrice };
};
