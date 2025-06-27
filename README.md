# Ecom - Modern E-commerce Website

A modern, responsive e-commerce website built with SvelteKit and Tailwind CSS, featuring product listings, search functionality, and shopping cart management.

## Features

- 🛍️ **Product Catalog**: Browse products from the Fake Store API
- 🔍 **Search Functionality**: Search products by title, description, or category
- 🛒 **Shopping Cart**: Add/remove items with quantity management
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- ⚡ **Fast Performance**: Built with SvelteKit for optimal performance
- 🎨 **Modern UI**: Clean, modern interface with smooth animations
- 🌟 **Product Ratings**: Display product ratings and reviews
- 📂 **Category Filtering**: Filter products by category (ready for implementation)

## Tech Stack

- **Frontend Framework**: SvelteKit 5
- **Styling**: Tailwind CSS 4
- **TypeScript**: Full type safety
- **API**: Fake Store API (https://fakestoreapi.com)
- **State Management**: Svelte stores
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecom
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Header.svelte          # Main navigation header
│   │   ├── ProductCard.svelte     # Individual product display
│   │   └── ProductGrid.svelte     # Product grid layout
│   ├── services/
│   │   └── productService.ts      # API service functions
│   └── stores/
│       └── cart.ts               # Shopping cart state management
├── routes/
│   ├── +layout.svelte            # Main layout wrapper
│   └── +page.svelte              # Home page with products
└── app.css                       # Global styles and utilities
```

## API Integration

The application uses the [Fake Store API](https://fakestoreapi.com) to fetch product data. The API provides:

- Product listings with images, prices, and descriptions
- Product categories
- Product ratings and reviews
- Individual product details

## Key Components

### Header Component
- Navigation menu
- Search functionality
- Shopping cart indicator
- User account access

### Product Card Component
- Product image with hover effects
- Product title and description
- Price display
- Star rating system
- Add to cart button
- Category badges

### Product Grid Component
- Responsive grid layout
- Loading states
- Error handling
- Empty state management

## Shopping Cart Features

- Add products to cart
- Update quantities
- Remove items
- Cart total calculation
- Persistent cart state (localStorage ready)

## Styling

The project uses Tailwind CSS for styling with custom utilities:

- Responsive design breakpoints
- Custom color schemes
- Hover and focus states
- Smooth transitions and animations
- Line clamping for text overflow

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check
- `npm run lint` - Lint code
- `npm run format` - Format code

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- SvelteKit best practices

## Future Enhancements

- [ ] Product detail pages
- [ ] Category filtering
- [ ] User authentication
- [ ] Checkout process
- [ ] Order management
- [ ] Wishlist functionality
- [ ] Product reviews
- [ ] Admin dashboard
- [ ] Payment integration
- [ ] Inventory management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Fake Store API](https://fakestoreapi.com) for providing product data
- [SvelteKit](https://kit.svelte.dev/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
