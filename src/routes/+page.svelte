<script lang="ts">
	import { onMount } from 'svelte';
	import ProductGrid from '$lib/components/ProductGrid.svelte';
	import { fetchProducts, type Product } from '$lib/services/productService.ts';
	import { cart } from '$lib/stores/cart.ts';
	import { goto } from '$app/navigation';
	
	let products: Product[] = [];
	let loading = true;
	let error: string | null = null;
	let filteredProducts: Product[] = [];
	let searchQuery = '';
	
	onMount(async () => {
		await loadProducts();
	});
	
	async function loadProducts() {
		loading = true;
		error = null;
		
		try {
			products = await fetchProducts();
			filteredProducts = products;
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}
	
	function handleSearch(event: CustomEvent) {
		const query = event.detail.query.toLowerCase();
		searchQuery = query;
		
		if (!query.trim()) {
			filteredProducts = products;
		} else {
			filteredProducts = products.filter(product =>
				product.title.toLowerCase().includes(query) ||
				product.description.toLowerCase().includes(query) ||
				product.category.toLowerCase().includes(query)
			);
		}
	}
	
	function handleAddToCart(event: CustomEvent) {
		const { product } = event.detail;
		cart.addItem({
			id: product.id,
			title: product.title,
			price: product.price,
			image: product.image
		});
	}
	
	function handleRetry() {
		loadProducts();
	}
	
	function handleHeaderSearch(event: CustomEvent) {
		handleSearch(event);
	}
	
	function handleHeaderCartClick() {
		goto('/cart');
	}
</script>

<svelte:head>
	<title>Ecom - Your Online Store</title>
	<meta name="description" content="Discover amazing products at great prices" />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mb-12 rounded-lg">
	<div class="text-center">
		<h1 class="text-4xl md:text-6xl font-bold mb-4">Welcome to Ecom</h1>
		<p class="text-xl md:text-2xl mb-8 opacity-90">Discover amazing products at unbeatable prices</p>
		<div class="flex justify-center space-x-4">
			<a
				href="#products"
				class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
			>
				Shop Now
			</a>
			<a
				href="/categories"
				class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
			>
				Browse Categories
			</a>
		</div>
	</div>
</section>

<!-- Search Section -->
<section class="mb-8">
	<div class="max-w-2xl mx-auto">
		<div class="relative">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search products..."
				class="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
				on:input={() => handleSearch({ detail: { query: searchQuery } })}
			/>
			<button class="absolute right-3 top-1/2 transform -translate-y-1/2" aria-label="Search">
				<svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</button>
		</div>
	</div>
</section>

<!-- Products Section -->
<section id="products">
	<div class="mb-8">
		<h2 class="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
		<p class="text-gray-600">Discover our handpicked selection of premium products</p>
	</div>
	
	<ProductGrid
		products={filteredProducts}
		{loading}
		{error}
		on:addToCart={handleAddToCart}
		on:retry={handleRetry}
	/>
</section>

<!-- Features Section -->
<section class="mt-16 py-12 bg-white rounded-lg">
	<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
		<div class="text-center">
			<div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
				<svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
				</svg>
			</div>
			<h3 class="text-xl font-semibold mb-2">Free Shipping</h3>
			<p class="text-gray-600">Free shipping on orders over $50</p>
		</div>
		
		<div class="text-center">
			<div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
				<svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<h3 class="text-xl font-semibold mb-2">Quality Guarantee</h3>
			<p class="text-gray-600">30-day money-back guarantee</p>
		</div>
		
		<div class="text-center">
			<div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
				<svg class="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
				</svg>
			</div>
			<h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
			<p class="text-gray-600">Round-the-clock customer support</p>
		</div>
	</div>
</section>

<svelte:window on:search={handleHeaderSearch} on:cartClick={handleHeaderCartClick} />
