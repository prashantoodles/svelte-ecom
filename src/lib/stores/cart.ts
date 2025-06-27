import { writable } from 'svelte/store';

export interface CartItem {
	id: number;
	title: string;
	price: number;
	image: string;
	quantity: number;
}

function createCartStore() {
	const { subscribe, set, update } = writable<CartItem[]>([]);

	return {
		subscribe,
		addItem: (product: { id: number; title: string; price: number; image: string }) => {
			update(items => {
				const existingItem = items.find(item => item.id === product.id);
				if (existingItem) {
					return items.map(item =>
						item.id === product.id
							? { ...item, quantity: item.quantity + 1 }
							: item
					);
				} else {
					return [...items, { ...product, quantity: 1 }];
				}
			});
		},
		removeItem: (productId: number) => {
			update(items => items.filter(item => item.id !== productId));
		},
		updateQuantity: (productId: number, quantity: number) => {
			update(items =>
				items.map(item =>
					item.id === productId
						? { ...item, quantity: Math.max(0, quantity) }
						: item
				).filter(item => item.quantity > 0)
			);
		},
		clear: () => set([]),
		getTotal: (items: CartItem[]) => {
			return items.reduce((total, item) => total + (item.price * item.quantity), 0);
		},
		getCount: (items: CartItem[]) => {
			return items.reduce((count, item) => count + item.quantity, 0);
		}
	};
}

export const cart = createCartStore(); 