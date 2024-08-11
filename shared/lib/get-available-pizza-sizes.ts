import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from '../components/shared/variants'

/**
 * Function that returns list of available pizza sizes 
 * @param type 
 * @param items 
 * @returns 
 */

export const getAvailablePizzaSizes = (
	type: PizzaType,
	items: ProductItem[]
): Variant[] => {
	const filteredPizzasByType = items.filter(item => item.pizzaType === type);
	
	return pizzaSizes.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType.some(
			pizza => Number(pizza.size) === Number(item.value)
		),
	}));
};
