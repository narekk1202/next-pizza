import { cn } from "@/shared/lib/utils";
import { Category } from "@prisma/client";
import React from "react";
import { Categories } from "./categories";
import { Container } from "./container";
import { SortPopup } from "./sort-popup";

interface Props {
	className?: string;
	categories: Category[];
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
	return (
		<div
			className={cn(
				"sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
				className
			)}
		>
			<Container className='flex items-center justify-between'>
				<Categories className='mt-3' items={categories} />
				<SortPopup />
			</Container>
		</div>
	);
};
