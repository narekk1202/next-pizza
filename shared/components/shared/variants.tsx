"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";

export type Variant = {
	name: string;
	value: string;
	disabled?: boolean;
};

interface Props {
	className?: string;
	defaultValue?: string;
	value?: Variant["value"];
	items: readonly Variant[];
	onClick?: (value: Variant["value"]) => void;
}

export const Variants: React.FC<Props> = ({
	items,
	value,
	onClick,
	className,
}) => {
	return (
		<div
			className={cn(
				"flex justify-between bg-[#f3f3f7] rounded-xl p-1 select-none",
				className
			)}
		>
			{items.map(item => (
				<button
					key={item.name}
					onClick={() => onClick?.(item.value)}
					className={cn(
						"flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-300 text-sm",
						{
							"bg-white shadow": item.value === value,
							"text-gray-500 opacity-50 pointer-events-none": item.disabled,
						}
					)}
				>
					{item.name}
				</button>
			))}
		</div>
	);
};
