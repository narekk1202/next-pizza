import { CircleUser, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';

interface Props {
	onClickSignIn?: () => void;
	className?: string;
}

export const ProfileButton: React.FC<Props> = ({ onClickSignIn, className }) => {
	const { data: session } = useSession();

	return (
		<div className={className}>
			{!session ? (
				<Button onClick={onClickSignIn} variant='outline' className='flex items-center gap-3'>
					<User size={16} />
					Войти
				</Button>
			) : (
				<Link href='/profile'>
					<Button variant='secondary' className='flex items-center gap-2'>
						<CircleUser size={18} />
						Профиль
					</Button>
				</Link>
			)}
		</div>
	);
};
