import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      // Hot Deals - 5 Products to start
      {
        id: 1,
        name: 'Apple AirPods Pro (2nd Generation)',
        description: 'Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio',
        price: 199.99,
        originalPrice: 249.99,
        discount: 20,
        category: 'electronics',
        amazonLink: 'https://amazon.com/apple-airpods-pro',
        rating: 4.8,
        reviews: 12453,
        isHotDeal: true,
        inStock: true,
        image: null,
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      {
        id: 2,
        name: 'Nike Air Max 270',
        description: 'Mens Running Shoes, Breathable Mesh Upper, Comfortable Cushioning',
        price: 129.99,
        originalPrice: 180.00,
        discount: 28,
        category: 'shoes',
        amazonLink: 'https://amazon.com/nike-air-max-270',
        rating: 4.6,
        reviews: 8921,
        isHotDeal: true,
        inStock: true,
        image: null,
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      {
        id: 3,
        name: 'Instant Pot Duo 7-in-1',
        description: 'Electric Pressure Cooker, Sterilizer, Slow Cooker, Rice Cooker, 8 Quart',
        price: 79.99,
        originalPrice: 139.99,
        discount: 43,
        category: 'home',
        amazonLink: 'https://amazon.com/instant-pot-duo',
        rating: 4.7,
        reviews: 45678,
        isHotDeal: true,
        inStock: true,
        image: null,
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      {
        id: 4,
        name: 'Levi\'s 501 Original Fit Jeans',
        description: 'Classic straight leg jeans, button fly, iconic styling',
        price: 49.99,
        originalPrice: 79.99,
        discount: 38,
        category: 'fashion',
        amazonLink: 'https://amazon.com/levis-501-jeans',
        rating: 4.5,
        reviews: 3421,
        isHotDeal: true,
        inStock: true,
        image: null,
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      {
        id: 5,
        name: 'Fenty Beauty Pro Filt\'r Foundation',
        description: 'Soft Matte Longwear Foundation, 50 Shades Available',
        price: 38.00,
        originalPrice: 45.00,
        discount: 16,
        category: 'beauty',
        amazonLink: 'https://amazon.com/fenty-beauty-foundation',
        rating: 4.8,
        reviews: 9876,
        isHotDeal: true,
        inStock: true,
        image: null,
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: '2025-01-15T10:00:00Z'
      }
    ]
  }),

  getters: {
    // Get all hot deal products
    hotDeals: (state) => {
      return state.products.filter(product => product.isHotDeal)
    },

    // Search products
    searchProducts: (state) => (query) => {
      if (!query) return state.products
      const searchTerm = query.toLowerCase().trim()
      return state.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      )
    },

    // Get product by ID
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    },

    // Get total products count
    totalProducts: (state) => state.products.length
  },

  actions: {
    // Add a new product
    addProduct(product) {
      const newProduct = {
        id: this.products.length + 1,
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      this.products.push(newProduct)
      return newProduct
    },

    // Update a product
    updateProduct(id, updates) {
      const index = this.products.findIndex(p => p.id === id)
      if (index !== -1) {
        this.products[index] = {
          ...this.products[index],
          ...updates,
          updatedAt: new Date().toISOString()
        }
        return this.products[index]
      }
      return null
    },

    // Delete a product
    deleteProduct(id) {
      const index = this.products.findIndex(p => p.id === id)
      if (index !== -1) {
        this.products.splice(index, 1)
        return true
      }
      return false
    }
  }
})