<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div class="text-center">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 animate-fadeIn">
              {{ t.pricingTitle }}
            </h1>
            <p class="mt-2 text-lg text-gray-600 animate-fadeIn" style="animation-delay: 0.1s">
              {{ t.pricingSubtitle }}
            </p>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
  
        <!-- Pricing Cards -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div 
            v-for="(box, index) in availableBoxes" 
            :key="box.id"
            class="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 hover:shadow-lg transition-all duration-300 animate-fadeIn"
            :style="`animation-delay: ${(index + 2) * 0.1}s`"
          >
            <!-- Popular badge for medium box -->
            <div v-if="box.type === 'medium'" class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-500 text-white shadow-lg">
                {{ t.mostPopular }}
              </span>
            </div>
  
            <!-- Icon and Title -->
            <div class="text-center mb-6">
              <div :class="[
                'inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4',
                getBoxColor(box.type).bgColor
              ]">
                <svg class="w-8 h-8" :class="getBoxColor(box.type).iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ box.name }}</h3>
              <p class="text-gray-600 text-sm">{{ box.description }}</p>
            </div>
  
            <!-- Price -->
            <div class="text-center mb-6">
              <div class="text-4xl font-extrabold text-gray-900 mb-1">
                ${{ box.price }}
                <span class="text-lg font-medium text-gray-500">{{ box.currency }}</span>
              </div>
              <p class="text-sm text-gray-500">{{ t.perShipment }}</p>
            </div>
  
            <!-- Features -->
            <div class="space-y-4 mb-8">
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0">
                  <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ t.maxDimensions }}</p>
                  <p class="text-xs text-gray-500">{{ box.dimensions }}</p>
                </div>
              </div>
              
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0">
                  <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ t.volumetricWeight }}</p>
                  <p class="text-xs text-gray-500">~{{ box.volumetric_weight }}kg</p>
                </div>
              </div>
              
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0">
                  <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ t.fastShipping }}</p>
                  <p class="text-xs text-gray-500">{{ t.fastShippingDetails }}</p>
                </div>
              </div>
              
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0">
                  <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ t.fullTracking }}</p>
                  <p class="text-xs text-gray-500">{{ t.fullTrackingDetails }}</p>
                </div>
              </div>
            </div>
  
            <!-- CTA Button -->
            <NuxtLink 
              :to="`/app/orders/create?box=${box.id}`"
              :class="[
                'block w-full py-3 px-4 rounded-xl font-semibold text-center transition-all duration-300',
                box.type === 'medium' 
                  ? 'bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              ]"
            >
              {{ t.selectBox }}
            </NuxtLink>
          </div>
        </div>
  
        <!-- Additional Costs Section -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center animate-fadeIn" style="animation-delay: 0.5s">
            {{ t.additionalCosts }}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- IVA Information -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.6s">
              <div class="flex items-start gap-4">
                <div class="p-3 bg-yellow-50 rounded-xl">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 mb-2">{{ t.ivaTitle }}</h3>
                  <p class="text-sm text-gray-600 mb-3">{{ t.ivaDescription }}</p>
                  <div class="bg-yellow-50 rounded-lg p-3">
                    <p class="text-sm font-medium text-yellow-800">{{ t.ivaExample }}</p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Rural Surcharge -->
            <div v-if="ruralSurcharge" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.7s">
              <div class="flex items-start gap-4">
                <div class="p-3 bg-green-50 rounded-xl">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 mb-2">{{ t.ruralSurchargeTitle }}</h3>
                  <p class="text-sm text-gray-600 mb-3">{{ t.ruralSurchargeDescription }}</p>
                  <div class="bg-green-50 rounded-lg p-3">
                    <p class="text-sm font-medium text-green-800">
                      +${{ ruralSurcharge.price }} {{ ruralSurcharge.currency }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- CTA Section -->
        <div class="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-8 border border-primary-200/50 text-center animate-fadeIn mb-12" style="animation-delay: 0.8s">
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
  
        <!-- FAQ Section -->
        <div class="mt-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center animate-fadeIn" style="animation-delay: 0.9s">
            {{ t.frequentlyAsked }}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
              :style="`animation-delay: ${(index + 10) * 0.1}s`"
            >
              <h3 class="font-semibold text-gray-900 mb-3">{{ faq.question }}</h3>
              <p class="text-sm text-gray-600">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  // Define page meta
  definePageMeta({
    layout: 'app',
    middleware: ['auth', 'customer']
  })
  
  // Nuxt imports
  const { $customFetch } = useNuxtApp()
  
  // Use the language composable
  const { t: createTranslations } = useLanguage()
  
  // State
  const availableBoxes = ref([])
  const ruralSurcharge = ref(null)
  const loadingProducts = ref(true)
  
  // Translations
  const translations = {
    pricingTitle: {
      es: 'Precios Transparentes',
      en: 'Transparent Pricing'
    },
    pricingSubtitle: {
      es: 'Elige la caja perfecta para tus compras. Sin costos ocultos.',
      en: 'Choose the perfect box for your purchases. No hidden costs.'
    },
    loadingPricing: {
      es: 'Cargando precios...',
      en: 'Loading pricing...'
    },
    mostPopular: {
      es: 'Más Popular',
      en: 'Most Popular'
    },
    perShipment: {
      es: 'por envío',
      en: 'per shipment'
    },
    maxDimensions: {
      es: 'Dimensiones máximas',
      en: 'Maximum dimensions'
    },
    volumetricWeight: {
      es: 'Peso volumétrico',
      en: 'Volumetric weight'
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
    additionalCosts: {
      es: 'Costos Adicionales',
      en: 'Additional Costs'
    },
    ivaTitle: {
      es: 'IVA (16%)',
      en: 'Import Tax (16%)'
    },
    ivaDescription: {
      es: 'Se aplica sobre el valor declarado de tus productos. Es un impuesto oficial de México.',
      en: 'Applied to the declared value of your products. This is an official Mexican tax.'
    },
    ivaExample: {
      es: 'Ejemplo: $100 USD en productos = $16 USD de IVA',
      en: 'Example: $100 USD in products = $16 USD import tax'
    },
    ruralSurchargeTitle: {
      es: 'Cargo por Zona Rural',
      en: 'Rural Area Surcharge'
    },
    ruralSurchargeDescription: {
      es: 'Cargo adicional para entregas en zonas rurales o de difícil acceso.',
      en: 'Additional charge for deliveries to rural or hard-to-reach areas.'
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
    frequentlyAsked: {
      es: 'Preguntas Frecuentes',
      en: 'Frequently Asked Questions'
    }
  }
  
  // Get reactive translations
  const t = createTranslations(translations)
  
  // Computed
  const getBoxColor = (type) => {
    const colors = {
      small: {
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600'
      },
      medium: {
        bgColor: 'bg-primary-50',
        iconColor: 'text-primary-600'
      },
      large: {
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600'
      }
    }
    return colors[type] || colors.small
  }
  
  const faqs = computed(() => [
    {
      question: t.value.pricingTitle === 'Precios Transparentes' 
        ? '¿Qué incluye el precio de la caja?'
        : 'What does the box price include?',
      answer: t.value.pricingTitle === 'Precios Transparentes'
        ? 'Incluye consolidación de paquetes, empaque seguro, y envío desde USA hasta México con rastreo completo.'
        : 'Includes package consolidation, secure packaging, and shipping from USA to Mexico with full tracking.'
    },
    {
      question: t.value.pricingTitle === 'Precios Transparentes'
        ? '¿Cuándo se cobra el IVA?'
        : 'When is the import tax charged?',
      answer: t.value.pricingTitle === 'Precios Transparentes'
        ? 'El IVA se cobra al momento de crear la orden, basado en el valor declarado de tus productos.'
        : 'The import tax is charged when creating the order, based on the declared value of your products.'
    },
    {
      question: t.value.pricingTitle === 'Precios Transparentes'
        ? '¿Puedo cambiar el tamaño de caja después?'
        : 'Can I change the box size later?',
      answer: t.value.pricingTitle === 'Precios Transparentes'
        ? 'Sí, puedes cambiar a una caja más grande si es necesario. Solo pagas la diferencia de precio.'
        : 'Yes, you can upgrade to a larger box if needed. You only pay the price difference.'
    },
    {
      question: t.value.pricingTitle === 'Precios Transparentes'
        ? '¿Hay límite en el número de paquetes?'
        : 'Is there a limit on the number of packages?',
      answer: t.value.pricingTitle === 'Precios Transparentes'
        ? 'No hay límite siempre que quepan en las dimensiones de la caja seleccionada.'
        : 'No limit as long as they fit within the dimensions of the selected box.'
    }
  ])
  
  // Methods
  const fetchProducts = async () => {
    try {
      loadingProducts.value = true
      const response = await $customFetch('/products')
      
      availableBoxes.value = response.data
      ruralSurcharge.value = response.rural_surcharge
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