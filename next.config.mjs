/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.dodostatic.net',
				port: '',
				pathname: '/image/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.dodostatic.net',
				port: '',
				pathname: '/static/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.inappstory.ru',
				port: '',
				pathname: '/story/**',
			},
		],
	},
};

export default nextConfig;
