<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <NuxtLink 
                to="/app/pricing" 
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
              </NuxtLink>
              <div>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.calculatorTitle }}</h1>
                <p class="text-sm text-gray-600 mt-1">{{ t.calculatorSubtitle }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <!-- Calculator Component -->
        <BoxCalculator />
        
        <!-- Help Section -->
        <div class="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fadeIn">
          <h2 class="text-xl font-bold text-gray-900 mb-6 text-center">{{ t.helpTitle }}</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ t.howToUse }}
              </h3>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-start gap-2">
                  <span class="text-primary-500 font-bold">1.</span>
                  {{ t.step1 }}
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary-500 font-bold">2.</span>
                  {{ t.step2 }}
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary-500 font-bold">3.</span>
                  {{ t.step3 }}
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary-500 font-bold">4.</span>
                  {{ t.step4 }}
                </li>
              </ul>
            </div>
            
            <div class="space-y-4">
              <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ t.tips }}
              </h3>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-start gap-2">
                  <span class="text-green-500">•</span>
                  {{ t.tip1 }}
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500">•</span>
                  {{ t.tip2 }}
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500">•</span>
                  {{ t.tip3 }}
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500">•</span>
                  {{ t.tip4 }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // Define page meta
  definePageMeta({
    layout: 'app',
    middleware: ['auth', 'customer']
  })
  
  // Use the language composable
  const { t: createTranslations } = useLanguage()
  
  // Translations
  const translations = {
    calculatorTitle: {
      es: 'Calculadora de Envío',
      en: 'Shipping Calculator'
    },
    calculatorSubtitle: {
      es: 'Calcula el costo exacto de tu envío a México',
      en: 'Calculate the exact cost of your shipment to Mexico'
    },
    helpTitle: {
      es: '¿Cómo usar la calculadora?',
      en: 'How to use the calculator?'
    },
    howToUse: {
      es: 'Cómo usar',
      en: 'How to use'
    },
    tips: {
      es: 'Consejos útiles',
      en: 'Helpful tips'
    },
    step1: {
      es: 'Mide tu caja o paquete con una regla o cinta métrica',
      en: 'Measure your box or package with a ruler or tape measure'
    },
    step2: {
      es: 'Pesa tu caja completa con todos los productos adentro',
      en: 'Weigh your complete box with all products inside'
    },
    step3: {
      es: 'Ingresa el valor total de todos tus productos para calcular el IVA',
      en: 'Enter the total value of all your products to calculate import tax'
    },
    step4: {
      es: 'Haz clic en "Calcular" para ver tu cotización completa',
      en: 'Click "Calculate" to see your complete quote'
    },
    tip1: {
      es: 'Usa centímetros para mayor precisión en el cálculo',
      en: 'Use centimeters for more precise calculations'
    },
    tip2: {
      es: 'El peso volumétrico puede ser mayor que el peso real',
      en: 'Volumetric weight may be higher than actual weight'
    },
    tip3: {
      es: 'Sé preciso con el valor declarado - aduana puede verificarlo',
      en: 'Be accurate with declared value - customs may verify it'
    },
    tip4: {
      es: 'Para zonas rurales, se aplica un cargo adicional de $20 USD',
      en: 'For rural areas, an additional $20 USD charge applies'
    }
  }
  
  // Get reactive translations
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
  </style>