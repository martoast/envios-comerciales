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
  
      <!-- Pricing Section Component -->
      <PricingSection 
        :show-header="false" 
        :show-features="false" 
        :show-c-t-a="true"
      />
  
      <!-- Additional Costs Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
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
  const ruralSurcharge = ref(null)
  
  // Translations
  const translations = {
    pricingTitle: {
      es: 'Precios por caja',
      en: 'Transparent Pricing'
    },
    pricingSubtitle: {
      es: 'Elige la caja perfecta para tu compras.',
      en: 'Choose the perfect box for your purchases.'
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
    frequentlyAsked: {
      es: 'Preguntas Frecuentes',
      en: 'Frequently Asked Questions'
    }
  }
  
  // Get reactive translations
  const t = createTranslations(translations)
  
  // Computed
  const faqs = computed(() => [
    {
      question: t.value.pricingTitle === 'Precios por caja' 
        ? '¿Qué incluye el precio de la caja?'
        : 'What does the box price include?',
      answer: t.value.pricingTitle === 'Precios por caja'
        ? 'Incluye consolidación de paquetes, empaque seguro, y envío desde USA hasta México con rastreo completo.'
        : 'Includes package consolidation, secure packaging, and shipping from USA to Mexico with full tracking.'
    },
    {
      question: t.value.pricingTitle === 'Precios por caja'
        ? '¿Cuándo se cobra el IVA?'
        : 'When is the import tax charged?',
      answer: t.value.pricingTitle === 'Precios por caja'
        ? 'El IVA se cobra al momento de crear la orden, basado en el valor declarado de tus productos.'
        : 'The import tax is charged when creating the order, based on the declared value of your products.'
    },
    {
      question: t.value.pricingTitle === 'Precios por caja'
        ? '¿Puedo cambiar el tamaño de caja después?'
        : 'Can I change the box size later?',
      answer: t.value.pricingTitle === 'Precios por caja'
        ? 'Sí, puedes cambiar a una caja más grande si es necesario. Solo pagas la diferencia de precio.'
        : 'Yes, you can upgrade to a larger box if needed. You only pay the price difference.'
    },
    {
      question: t.value.pricingTitle === 'Precios por caja'
        ? '¿Hay límite en el número de paquetes?'
        : 'Is there a limit on the number of packages?',
      answer: t.value.pricingTitle === 'Precios por caja'
        ? 'No hay límite siempre que quepan en las dimensiones de la caja seleccionada.'
        : 'No limit as long as they fit within the dimensions of the selected box.'
    }
  ])
  
  // Methods
  const fetchRuralSurcharge = async () => {
    try {
      const response = await $customFetch('/products')
      ruralSurcharge.value = response.rural_surcharge
    } catch (error) {
      console.error('Error fetching rural surcharge:', error)
    }
  }
  
  // Lifecycle
  onMounted(() => {
    fetchRuralSurcharge()
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