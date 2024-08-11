import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { getCartItemDetails } from '@/shared/lib';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import React from 'react';
import { CartItem, CheckoutItemSkeleton } from '..';
import { WhiteBlock } from '../white-block';

interface Props {
	items: CartStateItem[];
	onClickCountButton: (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => void;
	removeCartItem: (id: number) => void;
	loading?: boolean;
	className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
	className,
	items,
	loading,
	onClickCountButton,
	removeCartItem,
}) => {
	return (
		<WhiteBlock title='1. Корзина' className={className}>
			<div className='flex flex-col gap-5'>
				{loading &&
					[...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)}

				{!loading && items.map(item => (
					<CartItem
						key={item.id}
						id={item.id}
						imageUrl={item.imageUrl}
						details={getCartItemDetails(
							item.ingredients,
							item.pizzaType as PizzaType,
							item.pizzaSize as PizzaSize
						)}
						name={item.name}
						price={item.price}
						quantity={item.quantity}
						disabled={item.disabled}
						onClickCountButton={type =>
							onClickCountButton(item.id, item.quantity, type)
						}
						onClickRemove={() => removeCartItem(item.id)}
					/>
				))}
			</div>
		</WhiteBlock>
	);
};
