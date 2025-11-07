import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'JBL Flip 6 Bluetooth Speaker',
        description: 'Compact Bluetooth speaker with powerful sound and waterproof design for parties and outdoors',
        price: 79.00,
        originalPrice: 129.00,
        discount: 39,
        savings: 50.00,
        category: 'Electronics',
        store: 'Amazon',
        amazonLink: 'https://www.amazon.com/JBL-Flip-Bluetooth-Waterproof-PartyBoost/dp/B09GJVTRNZ',
        rating: 4.8,
        reviews: 12450,
        isHotDeal: true,
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/61b9X5XwXVL._AC_SL1500_.jpg',
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/JBL_logo.svg/512px-JBL_logo.svg.png',
        createdAt: '2025-11-07T10:00:00Z',
        updatedAt: '2025-11-07T10:00:00Z'
      },
      {
        id: 2,
        name: 'ILIFE V3s Pro Robot Vacuum',
        description: 'Budget robot vacuum effective at picking up debris including pet hair on hard floors',
        price: 99.00,
        originalPrice: 159.00,
        discount: 38,
        savings: 60.00,
        category: 'Home & Kitchen',
        store: 'Amazon',
        amazonLink: 'https://www.amazon.com/dp/B06Y56NDF4',
        rating: 4.3,
        reviews: 28340,
        isHotDeal: true,
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/71Xop1F3QWL._AC_SL1500_.jpg',
        brandLogo: 'https://www.iliferobot.com/wp-content/uploads/2020/07/iLife-Logo.png',
        createdAt: '2025-11-07T10:00:00Z',
        updatedAt: '2025-11-07T10:00:00Z'
      },
      {
        id: 3,
        name: 'Fitbit Luxe Fitness & Wellness Tracker',
        description: 'Fashionable fitness tracker with wellness features similar to higher-end models including heart rate and sleep tracking',
        price: 157.00,
        originalPrice: 199.00,
        discount: 21,
        savings: 42.00,
        category: 'Wearables',
        store: 'Amazon',
        amazonLink: 'https://www.amazon.com/Fitbit-Wellness-Stainless-Bracelet-Included/dp/B092FF2951',
        rating: 4.4,
        reviews: 8920,
        isHotDeal: true,
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/71eforTH+GL._AC_SL1500_.jpg',
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Fitbit_logo.svg/512px-Fitbit_logo.svg.png',
        createdAt: '2025-11-07T10:00:00Z',
        updatedAt: '2025-11-07T10:00:00Z'
      },
      {
        id: 4,
        name: 'National Tree Company Pre-Lit Christmas Tree',
        description: 'Pre-lit artificial Christmas tree with lifelike branches and included smart devices for easy setup',
        price: 211.00,
        originalPrice: 329.00,
        discount: 36,
        savings: 118.00,
        category: 'Home & Kitchen',
        store: 'Amazon',
        amazonLink: 'https://www.amazon.com/National-Tree-Valley-Spruce-NRVB7-306-75/dp/B00MS7VPXY',
        rating: 4.6,
        reviews: 15670,
        isHotDeal: true,
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/81p+3Xg5ZTL._AC_SL1500_.jpg',
        brandLogo: 'https://www.nationaltree.com/on/demandware.static/-/Sites-master-catalog/default/dw0b0b0b0b/images/logo-national-tree-company.png',
        createdAt: '2025-11-07T10:00:00Z',
        updatedAt: '2025-11-07T10:00:00Z'
      },
      {
        id: 5,
        name: 'All-Clad 13-Piece Nonstick Cookware Set',
        description: '13-piece nonstick cookware set for even heating and easy cooking on stovetops and ovens',
        price: 479.00,
        originalPrice: 799.00,
        discount: 40,
        savings: 320.00,
        category: 'Kitchen',
        store: 'Amazon',
        amazonLink: 'https://www.amazon.com/All-Clad-E785SB64-Anodized-Nonstick-Cookware/dp/B01JT76L2K',
        rating: 4.7,
        reviews: 5340,
        isHotDeal: true,
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/81r3gY6hPVL._AC_SL1500_.jpg',
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/All-Clad_logo.svg/512px-All-Clad_logo.svg.png',
        createdAt: '2025-11-07T10:00:00Z',
        updatedAt: '2025-11-07T10:00:00Z'
      },
      {
        id: 6,
        name: 'Garmin Forerunner 55 GPS Running Watch',
        description: 'Affordable GPS-enabled smartwatch for tracking workouts and fitness metrics with suggested training',
        price: 149.00,
        originalPrice: 199.00,
        discount: 25,
        savings: 50.00,
        category: 'Wearables',
        store: 'Amazon',
        amazonLink: 'https://www.amazon.com/Garmin-Forerunner-Running-Suggested-Workouts/dp/B092RCLKHN',
        rating: 4.6,
        reviews: 9870,
        isHotDeal: true,
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/81Y4m2f2gDL._AC_SL1500_.jpg',
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Garmin_logo.svg/512px-Garmin_logo.svg.png',
        createdAt: '2025-11-07T10:00:00Z',
        updatedAt: '2025-11-07T10:00:00Z'
      },
      {
        id: 7,
        name: 'Sony ZV-1 II Vlog Camera',
        description: 'Compact vlogging camera with 4K video and flip-out screen for content creators and beginners',
        price: 398.00,
        originalPrice: 499.00,
        discount: 20,
        savings: 101.00,
        category: 'Electronics',
        store: 'Amazon',
        amazonLink: 'https://www.amazon.com/Sony-Camera-Content-Creators-Vloggers/dp/B0BHKKHNHM',
        rating: 4.5,
        reviews: 3240,
        isHotDeal: true,
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/81Y4m2f2gDL._AC_SL1500_.jpg',
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Sony_logo.svg/512px-Sony_logo.svg.png',
        createdAt: '2025-11-07T10:00:00Z',
        updatedAt: '2025-11-07T10:00:00Z'
      },
      {
        id: 8,
        name: 'ASICS Gel-Kayano 30 Running Shoes',
        description: 'Stability running shoe with extra support and comfort for runners on long distances',
        price: 99.00,
        originalPrice: 160.00,
        discount: 38,
        savings: 61.00,
        category: 'Sports & Outdoors',
        store: 'Amazon',
        amazonLink: 'https://www.amazon.com/ASICS-Gel-Kayano-Running-Shoes-Oatmeal/dp/B0CFNPXTD8',
        rating: 4.6,
        reviews: 7820,
        isHotDeal: true,
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/81Y4m2f2gDL._AC_SL1500_.jpg',
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/ASICS_logo.svg/512px-ASICS_logo.svg.png',
        createdAt: '2025-11-07T10:00:00Z',
        updatedAt: '2025-11-07T10:00:00Z'
      },
      {
        id: 9,
        name: 'INIU 10000mAh Portable Charger',
        description: 'Portable charger with fast charging and LCD display for multiple device recharges on the go',
        price: 20.00,
        originalPrice: 24.00,
        discount: 17,
        savings: 4.00,
        category: 'Electronics',
        store: 'Amazon',
        amazonLink: 'https://www.amazon.com/INIU-Portable-Charging-10000mAh-Tablets/dp/B09176JCKZ',
        rating: 4.7,
        reviews: 34560,
        isHotDeal: true,
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/71liF+5s4yL._AC_SL1500_.jpg',
        brandLogo: 'https://iniushop.com/cdn/shop/files/INIU_Logo_White_300x.png',
        createdAt: '2025-11-07T10:00:00Z',
        updatedAt: '2025-11-07T10:00:00Z'
      },
      {
        id: 10,
        name: 'UGG Adalee Oversized Throw Blanket',
        description: 'Oversized throw blanket made of soft faux fur for cozy winter use on couches or beds',
        price: 49.00,
        originalPrice: 59.00,
        discount: 17,
        savings: 10.00,
        category: 'Home & Kitchen',
        store: 'Amazon',
        amazonLink: 'https://www.amazon.com/UGG-Adalee-Blanket-Accent-Oyster/dp/B08KTS4KDT',
        rating: 4.8,
        reviews: 11230,
        isHotDeal: true,
        inStock: true,
        image: 'https://m.media-amazon.com/images/I/81Y4m2f2gDL._AC_SL1500_.jpg',
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/UGG_logo.svg/512px-UGG_logo.svg.png',
        createdAt: '2025-11-07T10:00:00Z',
        updatedAt: '2025-11-07T10:00:00Z'
      }
    ]
  }),

  getters: {
    hotDeals: (state) => {
      return state.products.filter(product => product.isHotDeal)
    },

    getProductsByCategory: (state) => (category) => {
      return state.products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      )
    },

    categories: (state) => {
      const cats = [...new Set(state.products.map(p => p.category))]
      return cats.sort()
    },

    searchProducts: (state) => (query) => {
      if (!query) return state.products
      const searchTerm = query.toLowerCase().trim()
      return state.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      )
    },

    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    },

    totalProducts: (state) => state.products.length,

    topDiscounts: (state) => {
      return [...state.products]
        .filter(p => p.isHotDeal)
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 3)
    },

    bestSavings: (state) => {
      return [...state.products]
        .filter(p => p.isHotDeal)
        .sort((a, b) => b.savings - a.savings)
        .slice(0, 3)
    }
  },

  actions: {
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