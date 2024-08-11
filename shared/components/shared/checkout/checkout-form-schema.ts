import { z } from "zod";

export const checkoutFormSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: "Имя должно содержать не менее двух букв" }),
	lastName: z
		.string()
		.min(2, { message: "Фамилия должно содержать не менее двух букв" }),
	email: z.string().email({ message: "Некорректная почта" }),
	phone: z
		.string()
		.min(10, { message: "Телефон должен содержать не менее 10 цифр" }),
	address: z.string().min(5, { message: "Введите корректный адрес" }),
	comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
