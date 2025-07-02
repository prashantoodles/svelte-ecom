<script lang="ts">
import { cart } from '$lib/stores/cart';
import { derived } from 'svelte/store';

const cartItems = cart;
const total = derived(cart, $cart => $cart.reduce((sum, item) => sum + item.price * item.quantity, 0));

function increment(item) {
  cart.updateQuantity(item.id, item.quantity + 1);
}
function decrement(item) {
  if (item.quantity > 1) cart.updateQuantity(item.id, item.quantity - 1);
}
function remove(item) {
  cart.removeItem(item.id);
}
</script>

<svelte:head>
  <title>Your Cart - Ecom</title>
</svelte:head>

<section class="max-w-3xl mx-auto py-12">
  <h1 class="text-3xl font-bold mb-8">Your Cart</h1>
  {#if $cartItems.length === 0}
    <p class="text-gray-600">Your cart is empty.</p>
  {:else}
    <div class="space-y-6">
      {#each $cartItems as item (item.id)}
        <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <div class="flex items-center space-x-4">
            <img src={item.image} alt={item.title} class="w-16 h-16 object-cover rounded" />
            <div>
              <h2 class="font-semibold">{item.title}</h2>
              <p class="text-gray-500">${item.price.toFixed(2)}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button on:click={() => decrement(item)} class="px-2 py-1 bg-gray-200 rounded">-</button>
            <span>{item.quantity}</span>
            <button on:click={() => increment(item)} class="px-2 py-1 bg-gray-200 rounded">+</button>
          </div>
          <button on:click={() => remove(item)} class="text-red-500 hover:underline ml-4">Remove</button>
        </div>
      {/each}
    </div>
    <div class="mt-8 flex justify-between items-center">
      <span class="text-xl font-bold">Total: ${$total.toFixed(2)}</span>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">Checkout</button>
    </div>
  {/if}
</section> 