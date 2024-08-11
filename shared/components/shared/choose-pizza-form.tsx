"use client";

import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { usePizzaOptions } from "@/shared/hooks";
import { getPizzaDetails } from "@/shared/lib/";
import { cn } from "@/shared/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import React from "react";
import { Button } from "../ui";
import { IngredientCard } from "./ingredient";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Variants } from "./variants";

interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	loading: boolean;
	onSubmit: (itemId: number, ingredients: number[]) => void;
	className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	name,
	items,
	imageUrl,
	ingredients,
	className,
	onSubmit,
	loading,
}) => {
	const {
		size,
		type,
		setSize,
		setType,
		currentItemId,
		availableSizes,
		addIngredient,
		selectedIngredients,
	} = usePizzaOptions(items);

	const { textDetails, totalPrice } = getPizzaDetails(
		size,
		type,
		items,
		ingredients,
		selectedIngredients
	);

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients));
		}
	};

	return (
		<div className={cn("flex flex-1", className)}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className='w-[490px] bg-[#f7f6f5] p-7'>
				<Title text={name} size='md' className='font-extrabold mb-1' />

				<p className='text-gray-400'>{textDetails}</p>

				<div className='flex flex-col gap-4 mt-5'>
					<Variants
						items={availableSizes}
						value={String(size)}
						onClick={value => setSize(Number(value) as PizzaSize)}
					/>

					<Variants
						items={pizzaTypes}
						value={String(type)}
						onClick={value => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
					<div className='grid grid-cols-3 gap-3'>
						{ingredients.map(ingredient => (
							<IngredientCard
								key={ingredient.id}
								name={ingredient.name}
								price={ingredient.price}
								imageUrl={ingredient.imageUrl}
								onClick={() => addIngredient(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					onClick={handleClickAdd}
					loading={loading}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
				>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
