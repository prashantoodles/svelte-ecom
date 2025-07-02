<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchProducts, type Product } from '$lib/services/productService';
  import { goto } from '$app/navigation';

  let categories: string[] = [];
  let products: Product[] = [];
  let selectedCategory: string | null = null;
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    loading = true;
    try {
      products = await fetchProducts();
      categories = Array.from(new Set(products.map(p => p.category)));
    } catch (err) {
      error = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      loading = false;
    }
  });

  $: filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;
</script>

<svelte:head>
  <title>Categories - Ecom</title>
</svelte:head>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h1 class="text-3xl font-bold mb-8">Categories</h1>
  <div class="mb-8 flex flex-wrap gap-2">
    <button
      class="px-4 py-2 mr-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      on:click={() => selectedCategory = null}
      class:selected={!selectedCategory}
    >
      All
    </button>
    {#each categories as category}
      <button
        class="px-4 py-2 mr-2 rounded bg-gray-200 hover:bg-blue-600 hover:text-white"
        class:selected={selectedCategory === category}
        on:click={() => selectedCategory = category}
      >
        {category}
      </button>
    {/each}
  </div>
  {#if loading}
    <div>Loading...</div>
  {:else if error}
    <div class="text-red-500">{error}</div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {#each filteredProducts as product}
        <div class="border rounded-lg p-4 bg-white shadow" on:click={() => goto(`/product/${product.id}`)}>
          <img src={product.image} alt={product.title} class="h-32 w-full object-contain mb-2" />
          <h2 class="font-semibold text-lg mb-1">{product.title}</h2>
          <p class="text-gray-600 mb-2">{product.category}</p>
          <p class="font-bold text-blue-600 mb-2">${product.price.toFixed(2)}</p>
        </div>
      {/each}
    </div>
  {/if}
</section> 