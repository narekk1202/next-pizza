import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import Image from 'next/image'

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  onSubmit,
  className,
  loading,
}) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <Image
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300"
          width={350}
          height={350}
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};