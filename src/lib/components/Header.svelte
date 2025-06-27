<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	let searchQuery = '';
	let cartCount = 0;
	
	function handleSearch() {
		dispatch('search', { query: searchQuery });
	}
	
	function handleCartClick() {
		dispatch('cartClick');
	}
</script>

<header class="bg-white shadow-md sticky top-0 z-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo and Brand -->
			<div class="flex items-center">
				<h1 class="text-2xl font-bold text-gray-900">Ecom</h1>
			</div>
			
			<!-- Navigation -->
			<nav class="hidden md:flex space-x-8">
				<a href="/" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
				<a href="/products" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Products</a>
				<a href="/categories" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Categories</a>
				<a href="/about" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
			</nav>
			
			<!-- Search Bar -->
			<div class="flex-1 max-w-lg mx-8">
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						on:keydown={(e) => e.key === 'Enter' && handleSearch()}
						placeholder="Search products..."
						class="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					<button
						on:click={handleSearch}
						class="absolute inset-y-0 left-0 pl-3 flex items-center"
					>
						<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</button>
				</div>
			</div>
			
			<!-- Cart and User Actions -->
			<div class="flex items-center space-x-4">
				<button
					on:click={handleCartClick}
					class="relative p-2 text-gray-700 hover:text-gray-900"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
					</svg>
					{#if cartCount > 0}
						<span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
							{cartCount}
						</span>
					{/if}
				</button>
				
				<button class="text-gray-700 hover:text-gray-900">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</header> 