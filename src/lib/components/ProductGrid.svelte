<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ProductCard from './ProductCard.svelte';
	
	export let products: Array<{
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
	}> = [];
	
	export let loading = false;
	export let error: string | null = null;
	
	const dispatch = createEventDispatcher();
	
	function handleAddToCart(event: CustomEvent) {
		dispatch('addToCart', event.detail);
	}
</script>

<div class="w-full">
	{#if loading}
		<div class="flex justify-center items-center py-12">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
		</div>
	{:else if error}
		<div class="text-center py-12">
			<div class="text-red-500 text-lg mb-4">
				<svg class="h-12 w-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
				</svg>
			</div>
			<p class="text-gray-600 mb-4">{error}</p>
			<button
				on:click={() => dispatch('retry')}
				class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
			>
				Try Again
			</button>
		</div>
	{:else if products.length === 0}
		<div class="text-center py-12">
			<div class="text-gray-400 text-lg mb-4">
				<svg class="h-12 w-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
				</svg>
			</div>
			<p class="text-gray-600">No products found</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each products as product (product.id)}
				<ProductCard
					{product}
					on:addToCart={handleAddToCart}
				/>
			{/each}
		</div>
	{/if}
</div> 