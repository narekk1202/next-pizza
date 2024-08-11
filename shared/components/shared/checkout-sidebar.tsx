import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import React from 'react';
import { Button, Skeleton } from '../ui';
import { CheckoutItemDetails } from './checkout-item-details';
import { WhiteBlock } from './white-block';

interface Props {
	totalPrice: number;
	totalAmount: number;
	vatPrice: number;
	deliveryPrice: number;
	loading?: boolean;
	className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({
	totalPrice,
	totalAmount,
	vatPrice,
	loading,
	deliveryPrice,
}) => {
	return (
		<WhiteBlock className='p-6 sticky top-4'>
			<div className='flex flex-col gap-1'>
				<span className='text-xl'>Итого:</span>
				{loading ? (
					<Skeleton className='w-48 h-11' />
				) : (
					<span className='h-11 text-[34px] font-extrabold'>
						{totalPrice} ₽
					</span>
				)}
			</div>

			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Package size={18} className='mr-2 text-gray-300' />
						Стоимость корзины:
					</div>
				}
				value={loading ? <Skeleton className='w-28 h-6' /> : `${totalAmount} ₽`}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Percent size={18} className='mr-2 text-gray-300' />
						Налоги:
					</div>
				}
				value={loading ? <Skeleton className='w-28 h-6' /> : `${vatPrice} ₽`}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Truck size={18} className='mr-2 text-gray-300' />
						Доставка:
					</div>
				}
				value={
					loading ? <Skeleton className='w-28 h-6' /> : `${deliveryPrice} ₽`
				}
			/>

			<Button
				loading={loading}
				type='submit'
				className='w-full h-14 rounded-2xl mt-6 text-base font-bold'
			>
				Перейти к оплате
				<ArrowRight className='w-5 ml-2' />
			</Button>
		</WhiteBlock>
	);
};
