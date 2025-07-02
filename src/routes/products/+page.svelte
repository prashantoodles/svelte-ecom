<script lang="ts">
  import ProductGrid from '$lib/components/ProductGrid.svelte';
  import { fetchProducts, type Product } from '$lib/services/productService';
  import { onMount } from 'svelte';

  let products: Product[] = [];
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    loading = true;
    try {
      products = await fetchProducts();
    } catch (err) {
      error = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Products - Ecom</title>
</svelte:head>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h1 class="text-3xl font-bold mb-8">All Products</h1>
  <ProductGrid {products} {loading} {error} />
</section> 