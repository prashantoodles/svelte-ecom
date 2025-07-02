<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { cart } from '$lib/stores/cart';
	
	let { children } = $props();
	
	let cartItems = $derived($cart);
	let cartCount = $derived(cart.getCount(cartItems));
</script>

<div class="min-h-screen bg-gray-50">
	<Header {cartCount}
		on:search={e => window.dispatchEvent(new CustomEvent('search', { detail: e.detail }))}
		on:cartClick={() => window.dispatchEvent(new CustomEvent('cartClick'))}
	/>
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{@render children()}
	</main>
</div>
