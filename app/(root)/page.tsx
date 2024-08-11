import {
	Container,
	Filters,
	ProductsGroupLists,
	Stories,
	Title,
	TopBar,
} from "@/shared/components/shared";
import { findPizzas } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/find-pizzas";
import { Suspense } from "react";

export default async function Home({
	searchParams,
}: {
	searchParams: GetSearchParams;
}) {
	const categories = await findPizzas(searchParams);

	return (
		<>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>
			<TopBar
				categories={categories.filter(category => category.products.length > 0)}
			/>

			<Stories />

			<Container className='pb-14 mt-10'>
				<div className='flex gap-[80px]'>
					{/* Filters */}
					<div className='w-[250px]'>
						<Suspense>
							<Filters />
						</Suspense>
					</div>

					{/* Products */}
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categories.map(
								category =>
									category.products.length > 0 && (
										<ProductsGroupLists
											key={category.id}
											title={category.name}
											categoryId={category.id}
											items={category.products}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
