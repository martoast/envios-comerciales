<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8" :class="backgroundColor">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div v-if="showHeader" class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          {{ t.pricingTitle }}
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          {{ t.pricingSubtitle }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loadingProducts" class="flex items-center justify-center py-16">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4">
          <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="text-gray-500">{{ t.loadingPricing }}</p>
      </div>

      <!-- Pricing Content -->
      <div v-else>
        <!-- Mobile: Stacked Cards -->
        <div class="block md:hidden space-y-4 mb-12">
          <div 
            v-for="(box, index) in availableBoxes" 
            :key="box.id"
            class="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 animate-fadeIn"
            :style="`animation-delay: ${(index + 2) * 0.1}s`"
          >
           

            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <!-- <div :class="[
                  'inline-flex items-center justify-center w-12 h-12 rounded-xl',
                  getBoxColor(box.type).bgColor
                ]">
                  <svg class="w-6 h-6" :class="getBoxColor(box.type).iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z"/>
                  </svg>
                </div> -->
                <div>
                  <h3 class="font-bold text-gray-900">{{ getBoxTranslations(box).name }}</h3>
                  <p class="text-sm text-gray-500">{{ box.dimensions }}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-primary-600">{{ formatPrice(getDisplayPrice(box)) }}</div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 mb-4">
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-sm font-medium text-gray-900">{{ t.maxDimensions }}</div>
                <div class="text-xs text-gray-600">{{ box.dimensions }}</div>
              </div>
              <div v-if="box.max_weight" class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-sm font-medium text-gray-900">{{ t.maxWeight }}</div>
                <div class="text-xs text-gray-600">{{ box.max_weight }}kg</div>
              </div>
            </div>

            <button
              @click="handleBoxSelection(box)"
              :class="[
                'block w-full py-3 px-4 rounded-xl font-semibold text-center transition-all duration-300',
                box.type === 'medium' 
                  ? 'bg-primary-500 text-white shadow-lg hover:bg-primary-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              ]"
            >
              {{ t.selectBox }}
            </button>
          </div>
        </div>

        <!-- Desktop: Beautiful Table Layout -->
        <div class="hidden md:block mb-12">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <!-- Table Header -->
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <div class="grid grid-cols-6 gap-4 items-center">
                <div class="col-span-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ t.boxType }}</h3>
                </div>
                <div class="text-center">
                  <h3 class="text-sm font-medium text-gray-700">{{ t.dimensions }}</h3>
                </div>
                <div class="text-center">
                  <h3 class="text-sm font-medium text-gray-700">{{ t.maxWeight }}</h3>
                </div>
                <div class="text-center">
                  <h3 class="text-sm font-medium text-gray-700">{{ t.price }}</h3>
                </div>
                <div class="text-center">
                  <h3 class="text-sm font-medium text-gray-700">{{ t.action }}</h3>
                </div>
              </div>
            </div>

            <!-- Table Rows -->
            <div class="divide-y divide-gray-100">
              <div 
                v-for="(box, index) in availableBoxes" 
                :key="box.id"
                class="relative px-6 py-6 hover:bg-gray-50 transition-colors duration-200 animate-fadeIn"
                :style="`animation-delay: ${(index + 2) * 0.1}s`"
              >
                

                <div class="grid grid-cols-6 gap-4 items-center">
                  <!-- Box Info -->
                  <div class="col-span-2 flex items-center gap-4">
                    <!-- <div :class="[
                      'inline-flex items-center justify-center w-14 h-14 rounded-xl',
                      getBoxColor(box.type).bgColor
                    ]">
                      <svg class="w-7 h-7" :class="getBoxColor(box.type).iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z"/>
                      </svg>
                    </div> -->
                    <div>
                      <h4 class="text-lg font-semibold text-gray-900">{{ getBoxTranslations(box).name }}</h4>
                      <p class="text-sm text-gray-600 max-w-xs">{{ getBoxTranslations(box).description }}</p>
                    </div>
                  </div>

                  <!-- Dimensions -->
                  <div class="text-center">
                    <div class="text-sm font-medium text-gray-900">{{ box.dimensions }}</div>
                    <div class="text-xs text-gray-500">L × W × H</div>
                  </div>

                  <!-- Max Weight -->
                  <div class="text-center">
                    <div v-if="box.max_weight" class="text-sm font-medium text-gray-900">{{ box.max_weight }}kg</div>
                    <div v-else class="text-sm text-gray-400">-</div>
                  </div>

                  <!-- Price -->
                  <div class="text-center">
                    <div class="text-2xl font-bold text-primary-600">{{ formatPrice(getDisplayPrice(box)) }}</div>
                  </div>

                  <!-- Action -->
                  <div class="text-center">
                    <button
                      @click="handleBoxSelection(box)"
                      class="inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 bg-primary-500 text-white shadow-md hover:bg-primary-600 hover:shadow-lg"
                    >
                      {{ t.select }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Section (optional) -->
        <div v-if="showFeatures" class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div class="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-xl mb-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ t.fastShipping }}</h3>
            <p class="text-sm text-gray-600">{{ t.fastShippingDetails }}</p>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ t.fullTracking }}</h3>
            <p class="text-sm text-gray-600">{{ t.fullTrackingDetails }}</p>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-dark-50 rounded-xl mb-4">
              <svg class="w-6 h-6 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ t.securePackaging }}</h3>
            <p class="text-sm text-gray-600">{{ t.securePackagingDetails }}</p>
          </div>
        </div>

        <!-- CTA Section (optional) -->
        <div v-if="showCTA" class="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-8 border border-primary-200/50 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ t.readyToStart }}</h2>
          <p class="text-gray-600 mb-6 max-w-2xl mx-auto">{{ t.readyToStartDescription }}</p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/app/orders/create"
              class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              {{ t.createOrder }}
            </NuxtLink>
            
            <NuxtLink 
              to="/app/pricing/calculator"
              class="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl shadow-sm hover:shadow-md border border-primary-200 transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              {{ t.priceCalculator }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Props
const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true
  },
  showFeatures: {
    type: Boolean,
    default: true
  },
  showCTA: {
    type: Boolean,
    default: true
  },
  backgroundColor: {
    type: String,
    default: 'bg-transparent'
  }
})

// Emits - removed since we don't need them

// Nuxt imports
const { $customFetch } = useNuxtApp()

// Use the language composable
const { t: createTranslations, language } = useLanguage()

// Exchange rate constant
const exchangeRate = 18

// State
const availableBoxes = ref([])
const loadingProducts = ref(true)

// Methods
const handleBoxSelection = (box) => {
  navigateTo(`/app/orders/create?box=${box.id}`)
}

const getDisplayPrice = (box) => {
  // Box prices are in MXN from the API
  const priceMXN = box.price
  const priceUSD = priceMXN / exchangeRate
  
  // Return USD for English, MXN for Spanish
  return language.value === 'en' ? priceUSD : priceMXN
}

const formatPrice = (amount) => {
  const currency = language.value === 'en' ? 'USD' : 'MXN'
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`
}

// Translations
const translations = {
  pricingTitle: {
    es: 'Precios por caja',
    en: 'Pricing per box'
  },
  pricingSubtitle: {
    es: 'Elige la caja perfecta para tu envio. Sin costos ocultos.',
    en: 'Choose the perfect box for your shipping. No hidden costs.'
  },
  loadingPricing: {
    es: 'Cargando precios...',
    en: 'Loading pricing...'
  },
  mostPopular: {
    es: 'Más Popular',
    en: 'Most Popular'
  },
  maxDimensions: {
    es: 'Dimensiones máximas',
    en: 'Maximum dimensions'
  },
  maxWeight: {
    es: 'Peso máximo',
    en: 'Maximum weight'
  },
  fastShipping: {
    es: 'Envío rápido',
    en: 'Fast shipping'
  },
  fastShippingDetails: {
    es: '3-5 días hábiles',
    en: '3-5 business days'
  },
  fullTracking: {
    es: 'Rastreo completo',
    en: 'Full tracking'
  },
  fullTrackingDetails: {
    es: 'Desde USA hasta tu puerta',
    en: 'From USA to your door'
  },
  selectBox: {
    es: 'Seleccionar Caja',
    en: 'Select Box'
  },
  select: {
    es: 'Elegir',
    en: 'Select'
  },
  boxType: {
    es: 'Tipo de Caja',
    en: 'Box Type'
  },
  dimensions: {
    es: 'Dimensiones',
    en: 'Dimensions'
  },
  price: {
    es: 'Precio',
    en: 'Price'
  },
  action: {
    es: 'Acción',
    en: 'Action'
  },
  securePackaging: {
    es: 'Empaque Seguro',
    en: 'Secure Packaging'
  },
  securePackagingDetails: {
    es: 'Protección completa para tus productos',
    en: 'Complete protection for your products'
  },
  readyToStart: {
    es: '¿Listo para Empezar?',
    en: 'Ready to Start?'
  },
  readyToStartDescription: {
    es: 'Crea tu primera orden o usa nuestra calculadora para estimar los costos exactos de tu envío.',
    en: 'Create your first order or use our calculator to estimate the exact costs of your shipment.'
  },
  createOrder: {
    es: 'Crear Orden',
    en: 'Create Order'
  },
  priceCalculator: {
    es: 'Calculadora de Precios',
    en: 'Price Calculator'
  },
  // Product translations
  smallBoxName: {
    es: 'Caja Pequeña',
    en: 'Small Box'
  },
  smallBoxDescription: {
    es: 'Perfecta para compras pequeñas como electrónicos, cosméticos o accesorios.',
    en: 'Perfect for small purchases like electronics, cosmetics, or accessories.'
  },
  mediumBoxName: {
    es: 'Caja Mediana',
    en: 'Medium Box'
  },
  mediumBoxDescription: {
    es: 'Ideal para ropa, zapatos o múltiples artículos pequeños.',
    en: 'Ideal for clothing, shoes, or multiple small items.'
  },
  largeBoxName: {
    es: 'Caja Grande',
    en: 'Large Box'
  },
  largeBoxDescription: {
    es: 'Perfecta para compras grandes, artículos para el hogar o electrónicos grandes.',
    en: 'Great for bulk purchases, home goods, or large electronics.'
  },
  extraSmallBoxName: {
    es: 'Caja Extra Pequeña',
    en: 'Extra Small Box'
  },
  extraSmallBoxDescription: {
    es: 'Perfecta para joyas, documentos, electrónicos pequeños o accesorios ligeros.',
    en: 'Perfect for jewelry, documents, small electronics, or lightweight accessories.'
  },
  extraLargeBoxName: {
    es: 'Caja Extra Grande',
    en: 'Extra Large Box'
  },
  extraLargeBoxDescription: {
    es: 'Ideal para electrodomésticos grandes, muebles, pedidos al mayoreo o envíos familiares.',
    en: 'Ideal for large appliances, furniture, bulk orders, or family-sized shipments.'
  }
}

// Get reactive translations
const t = createTranslations(translations)

// Methods
const getBoxColor = (type) => {
  const colors = {
    'extra-small': {
      bgColor: 'bg-slate-50',
      iconColor: 'text-slate-600'
    },
    small: {
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600'
    },
    medium: {
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    large: {
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    'extra-large': {
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    }
  }
  return colors[type] || colors.small
}

const getBoxTranslations = (box) => {
  if (!box) return { name: '', description: '' }
  
  // Map Stripe product names to our translations
  const typeMapping = {
    'Extra Small Box': {
      name: t.value.extraSmallBoxName,
      description: t.value.extraSmallBoxDescription
    },
    'Small Box': {
      name: t.value.smallBoxName,
      description: t.value.smallBoxDescription
    },
    'Medium Box': {
      name: t.value.mediumBoxName,
      description: t.value.mediumBoxDescription
    },
    'Large Box': {
      name: t.value.largeBoxName,
      description: t.value.largeBoxDescription
    },
    'Extra Large Box': {
      name: t.value.extraLargeBoxName,
      description: t.value.extraLargeBoxDescription
    }
  }
  
  return typeMapping[box.name] || {
    name: box.name,
    description: box.description
  }
}

const fetchProducts = async () => {
  try {
    loadingProducts.value = true
    const response = await $customFetch('/products')
    
    availableBoxes.value = response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loadingProducts.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchProducts()
})

// Watch for language changes to trigger re-render of prices
watch(language, () => {
  // Prices will automatically update due to reactive computed values
})
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
</style>