import { Header } from '@/shared/components/shared';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Next Pizza | Главная',
};

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='min-h-screen'>
			<Suspense>
				<Header />
			</Suspense>
			{children}
		</main>
	);
}
