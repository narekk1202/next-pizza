"use client";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/shared/components/ui/sheet";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui";
import { CartDrawerItem } from "./cart-drawer-item";
import { Title } from "./title";

interface Props {
	className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	const cartStore = useCart();
	const [redirecting, setRedirecting] = useState(false);

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: "plus" | "minus"
	) => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		cartStore.updateItemQuantity(id, newQuantity);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
				<div
					className={cn(
						"flex flex-col h-full",
						!cartStore.totalAmount && "justify-center"
					)}
				>
					{cartStore.totalAmount > 0 && (
						<SheetHeader>
							<SheetTitle>
								В корзине:{" "}
								<span className='font-bold'>
									{cartStore.items.length} товара
								</span>
							</SheetTitle>
						</SheetHeader>
					)}

					{!cartStore.totalAmount && (
						<div className='flex flex-col items-center justify-center w-72 mx-auto'>
							<Image
								src='/assets/images/empty-box.png'
								alt='empty-cart'
								width={120}
								height={120}
							/>
							<Title
								size='sm'
								text='Корзина пуста'
								className='text-center font-bold my-2'
							/>

							<SheetClose>
								<Button className='w-56 h-12 text-base' size='lg'>
									<ArrowLeft className='w-5 mr-2' />
									Вернуться назад
								</Button>
							</SheetClose>
						</div>
					)}

					{cartStore.totalAmount > 0 && (
						<>
							<div className='-mx-6 mt-3 overflow-auto flex-1'>
								{cartStore.items.map(item => (
									<div key={item.id} className='mb-2'>
										<CartDrawerItem
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
											onClickCountButton={type =>
												onClickCountButton(item.id, item.quantity, type)
											}
											onClickRemove={() => cartStore.removeCartItem(item.id)}
											disabled={item.disabled}
										/>
									</div>
								))}
							</div>
							<SheetFooter className='-mx-6 bg-white p-8'>
								<div className='w-full'>
									<div className='flex mb-4'>
										<span className='flex flex-1 text-lg text-neutral-500'>
											Итого
											<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'></div>
										</span>

										<span className='font-bold text-lg'>
											{cartStore.totalAmount} ₽
										</span>
									</div>

									<Link href='/checkout'>
										<Button
											onClick={() => setRedirecting(true)}
											loading={redirecting}
											type='submit'
											className='w-full h-12 text-base'
										>
											Оформить заказ <ArrowRight className='w-5 ml-2' />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};
