<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	export let product: {
		id: number;
		title: string;
		price: number;
		description: string;
		category: string;
		image: string;
		rating: {
			rate: number;
			count: number;
		};
	};
	
	const dispatch = createEventDispatcher();
	
	function addToCart() {
		dispatch('addToCart', { product });
	}
	
	function viewProduct() {
		dispatch('viewProduct', { product });
	}
	
	// Function to render star rating
	function renderStars(rate: number) {
		const stars = [];
		const fullStars = Math.floor(rate);
		const hasHalfStar = rate % 1 !== 0;
		
		for (let i = 0; i < fullStars; i++) {
			stars.push('★');
		}
		
		if (hasHalfStar) {
			stars.push('☆');
		}
		
		const emptyStars = 5 - stars.length;
		for (let i = 0; i < emptyStars; i++) {
			stars.push('☆');
		}
		
		return stars.join('');
	}
</script>

<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
	<!-- Product Image -->
	<div class="relative h-48 overflow-hidden">
		<img
			src={product.image}
			alt={product.title}
			class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
			on:click={viewProduct}
		/>
		<div class="absolute top-2 right-2">
			<span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
				{product.category}
			</span>
		</div>
	</div>
	
	<!-- Product Info -->
	<div class="p-4">
		<h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer" on:click={viewProduct}>
			{product.title}
		</h3>
		
		<p class="text-gray-600 text-sm mb-3 line-clamp-2">
			{product.description}
		</p>
		
		<!-- Rating -->
		<div class="flex items-center mb-3">
			<div class="flex text-yellow-400 text-sm">
				{renderStars(product.rating.rate)}
			</div>
			<span class="text-gray-500 text-sm ml-2">
				({product.rating.count})
			</span>
		</div>
		
		<!-- Price and Add to Cart -->
		<div class="flex items-center justify-between">
			<span class="text-2xl font-bold text-gray-900">
				${product.price.toFixed(2)}
			</span>
			<button
				on:click={addToCart}
				class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
				</svg>
				<span>Add to Cart</span>
			</button>
		</div>
	</div>
</div> 