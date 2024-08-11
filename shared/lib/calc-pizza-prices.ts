import { Ingredient, ProductItem } from "@prisma/client"
import { PizzaSize, PizzaType } from '../constants/pizza'

/**
 * Function that calculates total price of pizza
 * @param type - type of pizza
 * @param size - size of pizza
 * @param items - list of products
 * @param ingredients - list of ingredients
 * @param selectedIngredients - list of selected ingredients
 * @returns - total price
 */


export const calcPizzaPrices = (
	type: PizzaType,
	size: PizzaSize,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const pizzaPrice =
		items.find(item => item.pizzaType === type && item.size === size)?.price ||
		0;
	const totalIngredientsPrice = ingredients
		.filter(ingredient => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0);

	return pizzaPrice + totalIngredientsPrice;
};
