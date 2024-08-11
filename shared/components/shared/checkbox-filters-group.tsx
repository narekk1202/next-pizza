"use client";

import React, { useState } from "react";
import { Input, Skeleton } from "../ui";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";

type Item = FilterChecboxProps;

interface Props {
	name?: string;
	title: string;
	items: Item[];
	limit?: number;
	loading?: boolean;
	className?: string;
	defaultItems?: Item[];
	defaultValue?: string[];
	selected?: Set<string>;
	searchInputPlaceholder?: string;
	onClickCheckbox?: (id: string) => void;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	name,
	title,
	items,
	loading,
	limit = 5,
	className,
	selected,
	defaultItems,
	onClickCheckbox,
	searchInputPlaceholder = "Поиск...",
}) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	if (loading) {
		return (
			<div className={className}>
				<p className='font-bold mb-3'>{title}</p>

				{...Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
					))}

				<Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
			</div>
		);
	}

	const list = showAll
		? items.filter(item =>
				item.text.toLowerCase().includes(searchValue.toLowerCase())
		  )
		: (defaultItems || items).slice(0, limit);

	const onChangeSearcInput = (value: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(value.target.value);
	};

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{showAll && (
				<div className='mb-5'>
					<Input
						onChange={onChangeSearcInput}
						placeholder={searchInputPlaceholder}
						className='bg-gray-50 border-none'
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.map((item, index) => (
					<FilterCheckbox
						key={index}
						name={name}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={selected?.has(item.value)}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
					/>
				))}

				{items.length > limit && (
					<div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
						<button
							onClick={() => setShowAll(!showAll)}
							className='text-primary mt-3'
						>
							{showAll ? "Скрыть" : "+ Показать все"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
