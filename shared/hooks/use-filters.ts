import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSet } from "react-use";

interface PriceProps {
	priceFrom?: number;
	priceTo?: number;
}

export interface Filters {
	sizes: Set<string>;
	pizzaTypes: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceProps;
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void;
	setPizzaTypes: (value: string) => void;
	setSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams();

	// ingredient's filter

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get("ingredients")?.split(","))
	);

	// size's filter

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
		)
	);

	// pizza type's filter

	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(
			searchParams.has("pizzaTypes")
				? searchParams.get("pizzaTypes")?.split(",")
				: []
		)
	);

	// price's filter

	const [prices, setPrices] = useState<PriceProps>({
		priceFrom: Number(searchParams.get("priceFrom")) || undefined,
		priceTo: Number(searchParams.get("priceTo")) || undefined,
	});

	// update price's filter

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices(prev => ({
			...prev,
			[name]: value,
		}));
	};

	return useMemo(
		() => ({
			sizes,
			pizzaTypes,
			selectedIngredients,
			prices,
			setPrices: updatePrice,
			setPizzaTypes: togglePizzaTypes,
			setSizes: toggleSizes,
			setSelectedIngredients: toggleIngredients,
		}),
		[sizes, pizzaTypes, selectedIngredients, prices]
	);
};
