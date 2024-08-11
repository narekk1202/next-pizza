'use client';

import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';

interface Props {
	className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [focused, setFocused] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const ref = useRef(null);

	useClickAway(ref, () => {
		setFocused(false);
	});

	useDebounce(
		async () => {
			try {
				const response = await Api.products.search(searchQuery);
				setProducts(response);
			} catch (error) {
				console.log(error);
			}
		},
		300,
		[searchQuery]
	);

	const onClickItem = () => {
		setFocused(false);
		setSearchQuery('');
		setProducts([]);
	};

	return (
		<>
			{focused && (
				<div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />
			)}

			<div
				ref={ref}
				className={cn(
					'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
					className
				)}
			>
				<Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
				<input
					type='text'
					className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
					placeholder='Поиск...'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>

				{products.length > 0 && (
					<div
						className={cn(
							'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
							focused && 'visible opacity-100 top-12'
						)}
					>
						{products.map(product => (
							<Link
								key={product.id}
								onClick={onClickItem}
								href={`/product/${product.id}`}
								className='flex items-center gap-2 w-full px-3 py-2 hover:bg-primary/10'
							>
								<Image
									height={32}
									width={32}
									className='rounded-sm'
									src={product.imageUrl}
									alt={product.name}
								/>
								<span>{product.name}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	);
};
