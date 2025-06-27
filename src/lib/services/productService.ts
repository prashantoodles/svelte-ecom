export interface Product {
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
}

const API_BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts(): Promise<Product[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/products`);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const products = await response.json();
		return products;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw new Error('Failed to fetch products. Please try again later.');
	}
}

export async function fetchProductById(id: number): Promise<Product> {
	try {
		const response = await fetch(`${API_BASE_URL}/products/${id}`);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const product = await response.json();
		return product;
	} catch (error) {
		console.error('Error fetching product:', error);
		throw new Error('Failed to fetch product details. Please try again later.');
	}
}

export async function fetchCategories(): Promise<string[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/products/categories`);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const categories = await response.json();
		return categories;
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw new Error('Failed to fetch categories. Please try again later.');
	}
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const products = await response.json();
		return products;
	} catch (error) {
		console.error('Error fetching products by category:', error);
		throw new Error('Failed to fetch products. Please try again later.');
	}
} 