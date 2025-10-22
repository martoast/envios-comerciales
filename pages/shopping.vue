<template>
  <main class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- WhatsApp Button -->
    <WhatsAppButton />

    <!-- Hot Deals Header Section -->
    

    <!-- Products Section -->
    <section class="py-12 md:py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div class="container mx-auto px-4 md:px-8 lg:px-12">
        <!-- Products Grid -->
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-amber-200 hover:border-amber-400 animate-fadeIn flex flex-col h-full"
          >
            <!-- Hot Deal Badge -->
            <div class="relative">
              <div class="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {{ product.discount }}% {{ t.off }}
              </div>
              
              <!-- Product Image -->
              <div class="relative aspect-square overflow-hidden bg-gray-100">
                <img 
                  :src="product.image" 
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                >
              </div>
            </div>

            <!-- Product Info - flex-1 makes this take remaining space -->
            <div class="p-5 flex flex-col flex-1">
              <div class="mb-2">
                <span class="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded capitalize">
                  {{ product.category }}
                </span>
              </div>
              
              <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[3rem]">
                {{ product.name }}
              </h3>
              
              <p class="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
                {{ product.description }}
              </p>

              <!-- Spacer to push content to bottom -->
              <div class="flex-1"></div>

              <!-- Pricing -->
              <div class="flex items-baseline gap-2 mb-4">
                <span class="text-2xl font-bold text-gray-900">
                  ${{ product.price }}
                </span>
                <span class="text-sm text-gray-400 line-through">
                  ${{ product.originalPrice }}
                </span>
              </div>

              <!-- CTA Button -->
              <NuxtLink
                :to="product.amazonLink"
                external
                target="_blank"
                class="block w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 text-center shadow-md hover:shadow-lg"
              >
                <span class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                  </svg>
                  {{ t.viewOnAmazon }}
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-md">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t.noProductsFound }}</h3>
          <p class="text-gray-600 mb-6">{{ t.tryDifferentSearch }}</p>
          <button
            @click="searchQuery = ''"
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all"
          >
            {{ t.clearSearch }}
          </button>
        </div>
      </div>
    </section>

    <!-- Info Banner -->
    <section class="py-12 bg-gradient-to-r from-primary-600 to-primary-700">
      <div class="container mx-auto px-4 md:px-8 lg:px-12">
        <div class="max-w-4xl mx-auto text-center text-white">
          <h3 class="text-2xl md:text-3xl font-bold mb-4">
            {{ t.infoBannerTitle }}
          </h3>
          <p class="text-lg text-primary-100 mb-6">
            {{ t.infoBannerDescription }}
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/register"
              class="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg"
            >
              {{ t.getStarted }}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/how-it-works"
              class="inline-flex items-center gap-2 px-6 py-3 bg-primary-800 text-white font-semibold rounded-xl hover:bg-primary-900 transition-all duration-300"
            >
              {{ t.learnMore }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <FooterSection />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductsStore } from '~/stores/products'
import WhatsAppButton from '~/components/Landing/WhatsAppButton.vue'
import FooterSection from '~/components/Landing/FooterSection.vue'

// Define page meta
definePageMeta({
  layout: 'default'
})

// Use language composable
const { t: createTranslations } = useLanguage()

// Use products store
const productsStore = useProductsStore()

// State
const searchQuery = ref('')

// Computed - Filter products based on search
const filteredProducts = computed(() => {
  if (!searchQuery.value || searchQuery.value.trim() === '') {
    // Show all products when no search query
    return productsStore.hotDeals
  }
  
  // Use the store's search function
  return productsStore.searchProducts(searchQuery.value)
})

// Translations
const translations = {
  searchPlaceholder: {
    es: 'Buscar productos o marcas...',
    en: 'Search products or brands...'
  },
  result: {
    es: 'resultado',
    en: 'result'
  },
  results: {
    es: 'resultados',
    en: 'results'
  },
  hotDealsSection: {
    es: 'OFERTAS CALIENTES',
    en: 'HOT DEALS'
  },
  hotDealsTitle: {
    es: '🔥 Ofertas que no puedes dejar pasar',
    en: '🔥 Deals You Can\'t Miss'
  },
  hotDealsSubtitle: {
    es: 'Descuentos increíbles actualizados diariamente',
    en: 'Amazing discounts updated daily'
  },
  off: {
    es: 'OFF',
    en: 'OFF'
  },
  viewOnAmazon: {
    es: 'Ver en Amazon',
    en: 'View on Amazon'
  },
  noProductsFound: {
    es: 'No se encontraron productos',
    en: 'No products found'
  },
  tryDifferentSearch: {
    es: 'Intenta con una búsqueda diferente',
    en: 'Try a different search'
  },
  clearSearch: {
    es: 'Limpiar Búsqueda',
    en: 'Clear Search'
  },
  infoBannerTitle: {
    es: '¿Viste algo que te gustó?',
    en: 'Found something you like?'
  },
  infoBannerDescription: {
    es: 'Crea tu cuenta gratis en Boxly y obtén tu dirección en USA. Nosotros nos encargamos del envío a México.',
    en: 'Create your free Boxly account and get your USA address. We handle shipping to Mexico for you.'
  },
  getStarted: {
    es: 'Crear Cuenta Gratis',
    en: 'Create Free Account'
  },
  learnMore: {
    es: 'Cómo Funciona',
    en: 'How It Works'
  }
}

const t = createTranslations(translations)
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>