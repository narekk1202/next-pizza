import { Providers } from '@/shared/components/shared/providers';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<link rel='icon' href='/logo.png' />
			</head>
			<body className={nunito.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
