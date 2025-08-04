<!-- components/Landing/Expats/UseCasesSection.vue -->
<template>
    <section class="py-20 px-5 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ t.useCasesTitle }}
          </h2>
          <p class="text-lg text-gray-600">
            {{ t.useCasesSubtitle }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(useCase, index) in useCases" :key="index" 
               class="group cursor-pointer">
            <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <div class="text-4xl mb-4">{{ useCase.emoji }}</div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">{{ useCase.title }}</h3>
              <p class="text-gray-600 mb-4">{{ useCase.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="(store, idx) in useCase.stores" :key="idx" 
                      class="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium">
                  {{ store }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const { t: createTranslations, language } = useLanguage()
  
  const translations = {
    useCasesTitle: {
      es: 'Lo que otros expats compran',
      en: 'What other expats buy'
    },
    useCasesSubtitle: {
      es: 'Miles de productos disponibles para ti',
      en: 'Thousands of products available for you'
    }
  }
  
  const t = createTranslations(translations)
  
  const useCases = computed(() => {
    return language.value === 'es' ? [
      {
        emoji: '🏠',
        title: 'Productos del hogar',
        description: 'Encuentra marcas específicas de electrodomésticos, decoración y muebles de tu país',
        stores: ['Williams Sonoma', 'Crate & Barrel', 'IKEA USA']
      },
      {
        emoji: '🍔',
        title: 'Comida y snacks favoritos',
        description: 'Esos productos que extrañas de casa, desde salsas hasta dulces especiales',
        stores: ['Trader Joe\'s', 'Whole Foods', 'Amazon']
      },
      {
        emoji: '👕',
        title: 'Ropa y marcas específicas',
        description: 'Tallas correctas y marcas que conoces y confías',
        stores: ['Gap', 'Old Navy', 'REI']
      },
      {
        emoji: '🎮',
        title: 'Electrónicos y gadgets',
        description: 'Últimos lanzamientos y mejor selección de tecnología',
        stores: ['Best Buy', 'Apple', 'B&H Photo']
      },
      {
        emoji: '💊',
        title: 'Vitaminas y suplementos',
        description: 'Marcas confiables de salud y bienestar',
        stores: ['GNC', 'Vitamin Shoppe', 'iHerb']
      },
      {
        emoji: '🎁',
        title: 'Regalos para familia',
        description: 'Envía regalos a México o recibe de tu familia en el extranjero',
        stores: ['Target', 'Etsy', 'Nordstrom']
      }
    ] : [
      {
        emoji: '🏠',
        title: 'Home products',
        description: 'Find specific brands of appliances, decor and furniture from your country',
        stores: ['Williams Sonoma', 'Crate & Barrel', 'IKEA USA']
      },
      {
        emoji: '🍔',
        title: 'Favorite foods & snacks',
        description: 'Those products you miss from home, from sauces to special treats',
        stores: ['Trader Joe\'s', 'Whole Foods', 'Amazon']
      },
      {
        emoji: '👕',
        title: 'Clothing & specific brands',
        description: 'Right sizes and brands you know and trust',
        stores: ['Gap', 'Old Navy', 'REI']
      },
      {
        emoji: '🎮',
        title: 'Electronics & gadgets',
        description: 'Latest releases and best tech selection',
        stores: ['Best Buy', 'Apple', 'B&H Photo']
      },
      {
        emoji: '💊',
        title: 'Vitamins & supplements',
        description: 'Trusted health and wellness brands',
        stores: ['GNC', 'Vitamin Shoppe', 'iHerb']
      },
      {
        emoji: '🎁',
        title: 'Gifts for family',
        description: 'Send gifts to Mexico or receive from family abroad',
        stores: ['Target', 'Etsy', 'Nordstrom']
      }
    ]
  })
  </script>