<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fetchProductById, type Product } from '$lib/services/productService';
	import { cart } from '$lib/stores/cart';
	
	let product: Product | null = null;
	let loading = true;
	let error: string | null = null;
	let quantity = 1;
	
	$: productId = parseInt($page.params.id);
	
	onMount(async () => {
		if (productId) {
			await loadProduct();
		}
	});
	
	async function loadProduct() {
		loading = true;
		error = null;
		
		try {
			product = await fetchProductById(productId);
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}
	
	function addToCart() {
		if (product) {
			for (let i = 0; i < quantity; i++) {
				cart.addItem({
					id: product.id,
					title: product.title,
					price: product.price,
					image: product.image
				});
			}
		}
	}
	
	function incrementQuantity() {
		quantity = Math.min(quantity + 1, 10);
	}
	
	function decrementQuantity() {
		quantity = Math.max(quantity - 1, 1);
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

<svelte:head>
	<title>{product ? `${product.title} - Ecom` : 'Product - Ecom'}</title>
	<meta name="description" content={product?.description || 'Product details'} />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<!-- Breadcrumb -->
	<nav class="flex mb-8" aria-label="Breadcrumb">
		<ol class="inline-flex items-center space-x-1 md:space-x-3">
			<li class="inline-flex items-center">
				<a href="/" class="text-gray-700 hover:text-blue-600">
					<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
					</svg>
					Home
				</a>
			</li>
			<li>
				<div class="flex items-center">
					<svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
					</svg>
					<a href="/products" class="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">Products</a>
				</div>
			</li>
			<li aria-current="page">
				<div class="flex items-center">
					<svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
					</svg>
					<span class="ml-1 text-gray-500 md:ml-2">Product Details</span>
				</div>
			</li>
		</ol>
	</nav>

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
			<a
				href="/"
				class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
			>
				Back to Home
			</a>
		</div>
	{:else if product}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<!-- Product Image -->
			<div class="space-y-4">
				<div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
					<img
						src={product.image}
						alt={product.title}
						class="h-full w-full object-cover object-center"
					/>
				</div>
			</div>

			<!-- Product Info -->
			<div class="space-y-6">
				<!-- Category Badge -->
				<div>
					<span class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
						{product.category}
					</span>
				</div>

				<!-- Title -->
				<h1 class="text-3xl font-bold text-gray-900">{product.title}</h1>

				<!-- Rating -->
				<div class="flex items-center space-x-2">
					<div class="flex text-yellow-400 text-lg">
						{renderStars(product.rating.rate)}
					</div>
					<span class="text-gray-600">
						{product.rating.rate} ({product.rating.count} reviews)
					</span>
				</div>

				<!-- Price -->
				<div class="text-3xl font-bold text-gray-900">
					${product.price.toFixed(2)}
				</div>

				<!-- Description -->
				<div class="space-y-2">
					<h3 class="text-lg font-semibold text-gray-900">Description</h3>
					<p class="text-gray-600 leading-relaxed">{product.description}</p>
				</div>

				<!-- Quantity Selector -->
				<div class="space-y-2">
					<label for="quantity" class="block text-sm font-medium text-gray-700">
						Quantity
					</label>
					<div class="flex items-center space-x-3">
						<button
							type="button"
							on:click={decrementQuantity}
							class="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
							aria-label="Decrease quantity"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
							</svg>
						</button>
						<input
							type="number"
							id="quantity"
							bind:value={quantity}
							min="1"
							max="10"
							class="w-16 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							type="button"
							on:click={incrementQuantity}
							class="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
							aria-label="Increase quantity"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
							</svg>
						</button>
					</div>
				</div>

				<!-- Add to Cart Button -->
				<button
					on:click={addToCart}
					class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
					</svg>
					<span>Add to Cart ({quantity})</span>
				</button>

				<!-- Product Features -->
				<div class="border-t border-gray-200 pt-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
					<ul class="space-y-2 text-gray-600">
						<li class="flex items-center">
							<svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Free shipping on orders over $50
						</li>
						<li class="flex items-center">
							<svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							30-day money-back guarantee
						</li>
						<li class="flex items-center">
							<svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Secure payment processing
						</li>
						<li class="flex items-center">
							<svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							24/7 customer support
						</li>
					</ul>
				</div>
			</div>
		</div>
	{/if}
</div> 