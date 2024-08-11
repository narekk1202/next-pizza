'use client';

import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import React, { Suspense } from 'react';
import { Input } from '../ui';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { RangeSlider } from './range-slider';
import { Title } from './title';

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { ingredients, loading } = useIngredients();
	const filters = useFilters();

	useQueryFilters(filters);

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0]);
		filters.setPrices('priceTo', prices[1]);
	};

	const items = ingredients.map(item => ({
		value: String(item.id),
		text: item.name,
	}));

	return (
		<Suspense>
			<div className={cn('', className)}>
				<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />
				{/* upper checkboxes */}
				<CheckboxFiltersGroup
					title='Размеры'
					name='size'
					className='mb-5'
					selected={filters.sizes}
					onClickCheckbox={filters.setSizes}
					items={[
						{ text: '20 см', value: '20' },
						{ text: '30 см', value: '30' },
						{ text: '40 см', value: '40' },
					]}
				/>

				<CheckboxFiltersGroup
					title='Тип теста'
					name='pizzaTypes'
					className='mb-5'
					onClickCheckbox={filters.setPizzaTypes}
					selected={filters.pizzaTypes}
					items={[
						{ text: 'Тонкое', value: '1' },
						{ text: 'Традиционное', value: '2' },
					]}
				/>

				{/* price filter */}
				<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
					<p className='font-bold mb-3'>Цена от и до:</p>
					<div className='flex gap-3 mb-5'>
						<Input
							type='number'
							placeholder='0'
							min={0}
							max={1000}
							value={String(filters.prices.priceFrom)}
							onChange={e =>
								filters.setPrices('priceFrom', Number(e.target.value))
							}
						/>
						<Input
							type='number'
							placeholder='1000'
							min={100}
							max={1000}
							value={String(filters.prices.priceTo)}
							onChange={e =>
								filters.setPrices('priceTo', Number(e.target.value))
							}
						/>
					</div>

					<RangeSlider
						min={0}
						max={1000}
						step={10}
						value={[
							filters.prices.priceFrom || 0,
							filters.prices.priceTo || 1000,
						]}
						onValueChange={updatePrices}
					/>
				</div>

				<CheckboxFiltersGroup
					limit={6}
					name='ingredients'
					title='Ингредиенты'
					className='mt-5'
					items={items}
					defaultItems={items.slice(0, 6)}
					loading={loading}
					onClickCheckbox={filters.setSelectedIngredients}
					selected={filters.selectedIngredients}
				/>
			</div>
		</Suspense>
	);
};
