import { ProductItem } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { Variant } from "../components/shared/variants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { getAvailablePizzaSizes } from "../lib";

interface ReturnProps {
	size: PizzaSize;
	type: PizzaType;
	availableSizes: Variant[];
	selectedIngredients: Set<number>;
	currentItemId?: number;
	setSize: (size: PizzaSize) => void;
	setType: (type: PizzaType) => void;
	addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);
	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([])
	);

	const availableSizes = getAvailablePizzaSizes(type, items);

	const currentItemId = items.find(item => item.pizzaType === type && item.size === size)?.id;

	useEffect(() => {
		const isAvailableSize = availableSizes?.find(
			item => Number(item.value) === size && !item.disabled
		);
		const availableSize = availableSizes?.find(item => !item.disabled);

		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [type]);

	return {
		size,
		type,
		setSize,
		setType,
		addIngredient,
		currentItemId,
		availableSizes,
		selectedIngredients,
	};
};
