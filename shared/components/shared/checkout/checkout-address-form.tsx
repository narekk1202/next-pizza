import React from 'react';
import { Input } from '../../ui';
import { FormTextarea, FormInput } from '../form';
import { WhiteBlock } from '../white-block';

interface Props {
	className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title='3. Адрес доставки' className={className}>
			<div className='flex flex-col gap-5'>
				<FormInput name='address' className='text-base' placeholder='Адрес' />
				<FormTextarea
					rows={5}
					className='text-base'
					placeholder='Комментарии к заказу'
					name='comment'
				/>
			</div>
		</WhiteBlock>
	);
};
