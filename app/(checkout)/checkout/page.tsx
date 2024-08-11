'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { createOrder } from '@/app/actions';
import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm,
	CheckoutSidebar,
	Container,
	Title,
} from '@/shared/components/shared';
import {
	checkoutFormSchema,
	CheckoutFormValues,
} from '@/shared/components/shared/checkout/checkout-form-schema';
import { useCart } from '@/shared/hooks';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Api } from '@/shared/services/api-client'

const VAT = 15;
const DELIVERY_PRICE = 250;

export default function Checkout() {
	const [submitting, setSubmitting] = useState(false);
	const cartStore = useCart();
	const { data: session } = useSession();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});

	const vatPrice = (cartStore.totalAmount * VAT) / 100;
	const totalPrice = cartStore.totalAmount + DELIVERY_PRICE + vatPrice;

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		cartStore.updateItemQuantity(id, newQuantity);
	};

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true);

			const url = await createOrder(data);

			toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
				icon: '✅',
			});

			if (url) {
				location.href = url;
			}
		} catch (err) {
			console.log(err);
			setSubmitting(false);
			toast.error('Не удалось создать заказ', {
				icon: '❌',
			});
		}
	};

	useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

	return (
		<Container className='mt-10'>
			<Title
				text='Оформление заказа'
				className='font-extrabold mb-8 text-[36px]'
			/>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						{/* Left */}
						<div className='flex flex-col gap-10 flex-1 mb-20'>
							<CheckoutCart
								items={cartStore.items}
								loading={cartStore.loading}
								onClickCountButton={onClickCountButton}
								removeCartItem={cartStore.removeCartItem}
							/>
							<CheckoutPersonalForm
								className={
									cartStore.loading ? 'opacity-40 pointer-events-none' : ''
								}
							/>
							<CheckoutAddressForm
								className={
									cartStore.loading ? 'opacity-40 pointer-events-none' : ''
								}
							/>
						</div>

						{/* Right */}
						<div className='w-[450px]'>
							<CheckoutSidebar
								totalPrice={totalPrice}
								totalAmount={cartStore.totalAmount}
								vatPrice={vatPrice}
								deliveryPrice={DELIVERY_PRICE}
								loading={cartStore.loading || submitting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
