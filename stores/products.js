import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      // Dyson Vacuums
      {
        id: 1,
        name: 'Dyson V15 Detect Plus Cordless Vacuum',
        description: 'La iluminación revela polvo, 240 AW, 3 modos de alimentación, hasta 60 minutos, limpia profundamente suelos duros y alfombras, desenreda el pelo',
        price: 799.00,
        originalPrice: 849.99,
        discount: 6,
        category: 'home',
        amazonLink: 'https://www.amazon.com/-/es/dp/B0CT97D9R2?linkCode=sl2&tag=onamzerickm0e-20&creativeASIN=B0CT97D9R2&asc_item-id=amzn1.ideas.3U0AID6UXMTPY&ref_=as_li_ss_tl_asin&th=1',
        rating: 4.8,
        reviews: 0,
        isHotDeal: true,
        inStock: true,
        image: '/products/dyson1.jpg',
        createdAt: '2025-10-19T10:00:00Z',
        updatedAt: '2025-10-19T10:00:00Z'
      },
      {
        id: 2,
        name: 'Dyson V8 Plus Cordless Vacuum',
        description: 'Limpia suelos duros y alfombras, desenreda, se convierte en portátil, 115 AW, 2 modos de alimentación, hasta 40 minutos',
        price: 439.99,
        originalPrice: 539.99,
        discount: 19,
        category: 'home',
        amazonLink: 'https://www.amazon.com/-/es/dp/B0CT9552BL?linkCode=sl2&tag=onamzerickm0e-20&creativeASIN=B0CT9552BL&asc_item-id=amzn1.ideas.3U0AID6UXMTPY&ref_=as_li_ss_tl_asin',
        rating: 4.7,
        reviews: 0,
        isHotDeal: true,
        inStock: true,
        image: '/products/dyson2.jpg',
        createdAt: '2025-10-19T10:00:00Z',
        updatedAt: '2025-10-19T10:00:00Z'
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