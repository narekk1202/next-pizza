import { z } from 'zod';

export const passwordSchema = z
	.string()
	.min(6, { message: 'Минимальная длина пароля 6 символов' });

export const formLoginSchema = z.object({
	email: z.string().email({ message: 'Некорректная почта' }),
	password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema.merge(
	z.object({
		fullName: z
			.string()
			.min(4, { message: 'Минимальная длина имени 4 символа' }),

		confirmPassword: passwordSchema,
	})
).refine((data) => data.password === data.confirmPassword, {
	message: 'Пароли не совпадают',
	path: ['confirmPassword'],
})


export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;