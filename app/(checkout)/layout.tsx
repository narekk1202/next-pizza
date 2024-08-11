import { Container, Header } from '@/shared/components/shared';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Next Pizza | Корзина',
};

export default function CheckoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='min-h-screen bg-[#F4F1EE]'>
			<Container>
				<Suspense>
					<Header
						className='border-b-gray-200'
						hasSearch={false}
						hasCart={false}
					/>
				</Suspense>
				{children}
			</Container>
		</main>
	);
}
