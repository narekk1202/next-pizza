import { useEffect } from "react";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { useCartStore } from "../store/cart";

type ReturnProps = {
	totalAmount: number;
	items: CartStateItem[];
	loading: boolean;
	updateItemQuantity: (id: number, quantity: number) => void;
	removeCartItem: (id: number) => void;
	addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
	const cartState = useCartStore();

	useEffect(() => {
		cartState.fetchCartItems();
	}, []);

	return cartState;
};
