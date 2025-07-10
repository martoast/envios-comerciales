<template>
    <section id="calculator" class="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8 sm:mb-12 lg:mb-16 max-w-3xl mx-auto">
          <span class="text-xs sm:text-sm font-semibold text-primary-500 uppercase tracking-wider">
            {{ t.calculatorTagline }}
          </span>
          <h2 class="mt-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            {{ t.calculatorTitle }}
          </h2>
          <p class="mt-4 text-base sm:text-lg text-gray-600 px-4 sm:px-0">
            {{ t.calculatorSubtitle }}
          </p>
        </div>
        
        <!-- Calculator Card -->
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg border border-gray-100 overflow-hidden">
            <div class="p-6 sm:p-8 lg:p-10">
              <!-- Input Grid -->
              <div class="space-y-6 sm:space-y-8">
                <!-- Dimensions Section -->
                <div>
                  <h4 class="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    <CubeIcon class="w-5 h-5 text-primary-500" />
                    {{ t.boxDimensions }}
                  </h4>
                  
                  <!-- Dimension Inputs -->
                  <div class="grid grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <label for="length" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        {{ t.length }}
                      </label>
                      <input 
                        v-model.number="dimensions.length" 
                        type="number" 
                        id="length" 
                        placeholder="0" 
                        class="w-full px-3 py-2.5 sm:p-3 text-sm sm:text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      >
                    </div>
                    <div>
                      <label for="width" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        {{ t.width }}
                      </label>
                      <input 
                        v-model.number="dimensions.width" 
                        type="number" 
                        id="width" 
                        placeholder="0" 
                        class="w-full px-3 py-2.5 sm:p-3 text-sm sm:text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      >
                    </div>
                    <div>
                      <label for="height" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        {{ t.height }}
                      </label>
                      <input 
                        v-model.number="dimensions.height" 
                        type="number" 
                        id="height" 
                        placeholder="0" 
                        class="w-full px-3 py-2.5 sm:p-3 text-sm sm:text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      >
                    </div>
                  </div>
                  
                  <!-- Unit Toggle -->
                  <div class="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span class="text-xs sm:text-sm font-medium text-gray-700">{{ t.unit }}:</span>
                    <div class="inline-flex bg-gray-50 rounded-lg p-1 border border-gray-200">
                      <button
                        @click="currentUnit = 'cm'"
                        :class="['px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200', 
                                 currentUnit === 'cm' ? 'bg-primary-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900']"
                      >
                        cm
                      </button>
                      <button
                        @click="currentUnit = 'in'"
                        :class="['px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200', 
                                 currentUnit === 'in' ? 'bg-primary-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900']"
                      >
                        {{ t.inches }}
                      </button>
                    </div>
                  </div>
                </div>
      
                <!-- Weight Section -->
                <div>
                  <h4 class="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    <ScaleIcon class="w-5 h-5 text-primary-500" />
                    {{ t.actualWeight }}
                  </h4>
                  <div class="flex gap-3">
                    <div class="flex-1">
                      <label for="weight" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        {{ t.weight }}
                      </label>
                      <input 
                        v-model.number="weight" 
                        type="number" 
                        id="weight" 
                        placeholder="0" 
                        class="w-full px-3 py-2.5 sm:p-3 text-sm sm:text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      >
                    </div>
                    <div class="flex items-end">
                      <div class="px-4 py-2.5 sm:py-3 bg-gray-100 rounded-lg text-gray-700 font-medium text-sm sm:text-base">
                        kg
                      </div>
                    </div>
                  </div>
                  <p class="mt-2 text-xs sm:text-sm text-gray-500">{{ t.weightHelp }}</p>
                </div>
      
                <!-- Rural Delivery Option -->
                <div class="bg-amber-50 rounded-lg border border-amber-200 p-4">
                  <label class="flex items-start sm:items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      v-model="isRural" 
                      class="mt-0.5 sm:mt-0 w-5 h-5 text-primary-500 rounded border-gray-300 focus:ring-2 focus:ring-primary-500"
                    >
                    <div class="flex-1">
                      <span class="font-medium text-gray-900 text-sm sm:text-base">{{ t.ruralDelivery }}</span>
                      <span class="block sm:inline sm:ml-2 text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-0">
                        {{ t.ruralFee }}
                      </span>
                    </div>
                  </label>
                </div>
      
                <!-- Calculate Button -->
                <button 
                  @click="calculatePrice" 
                  class="w-full px-6 py-3.5 sm:py-4 rounded-full bg-primary-500 text-white font-semibold text-sm sm:text-base lg:text-lg 
                         shadow-md hover:shadow-lg hover:bg-primary-600 transform hover:-translate-y-0.5 transition-all duration-200 
                         flex items-center justify-center gap-2.5"
                >
                  <CalculatorIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                  {{ t.calculateBoxPrice }}
                </button>
              </div>
            </div>
      
            <!-- Result Section -->
            <div v-if="calculatorResult.show" 
                 :class="['border-t animate-fadeIn', 
                          calculatorResult.type === 'success' 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-red-50 border-red-200']">
              <div class="p-6 sm:p-8">
                <!-- Title -->
                <h3 class="text-xl sm:text-2xl font-bold text-center mb-6" v-html="calculatorResult.title"></h3>
                
                <!-- Weight Details Grid -->
                <div v-if="calculatorResult.type === 'success'" 
                     class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 max-w-2xl mx-auto">
                  <div class="bg-white rounded-lg p-4 text-center shadow-sm">
                    <p class="text-xs sm:text-sm text-gray-600 mb-1">{{ t.actualWeightLabel }}</p>
                    <p class="text-lg sm:text-xl font-bold text-gray-900">{{ calculatorResult.actualWeight }} kg</p>
                  </div>
                  <div class="bg-white rounded-lg p-4 text-center shadow-sm">
                    <p class="text-xs sm:text-sm text-gray-600 mb-1">{{ t.volumetricWeightLabel }}</p>
                    <p class="text-lg sm:text-xl font-bold text-gray-900">{{ calculatorResult.volumetricWeight }} kg</p>
                  </div>
                  <div class="bg-white rounded-lg p-4 text-center shadow-sm border-2 border-primary-200">
                    <p class="text-xs sm:text-sm text-gray-600 mb-1">{{ t.chargeableWeightLabel }}</p>
                    <p class="text-lg sm:text-xl font-bold text-primary-500">{{ calculatorResult.chargeableWeight }} kg</p>
                  </div>
                </div>
      
                <!-- Price Display -->
                <div v-if="calculatorResult.type === 'success'" class="text-center mb-6">
                  <div class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    ${{ calculatorResult.price }} USD
                  </div>
                  <div class="text-base sm:text-lg text-gray-600">
                    {{ t.approx }} ${{ calculatorResult.priceMXN }} MXN
                  </div>
                  <p v-if="calculatorResult.subtext" 
                     class="text-xs sm:text-sm text-gray-500 mt-2" 
                     v-html="calculatorResult.subtext"></p>
                </div>
      
                <!-- Message -->
                <p v-if="calculatorResult.message" 
                   class="text-center text-sm sm:text-base text-gray-700 mb-6 px-4" 
                   v-html="calculatorResult.message"></p>
      
                <!-- Info Box -->
                <div v-if="calculatorResult.showInfo" 
                     class="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                  <p class="text-xs sm:text-sm text-primary-800" v-html="t.priceNote"></p>
                </div>
      
                <!-- Contact Button -->
                <div class="text-center">
                  <a 
                    :href="calculatorResult.contactLink" 
                    target="_blank" 
                    class="inline-flex px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-primary-500 text-white font-semibold 
                           text-sm sm:text-base lg:text-lg shadow-md hover:shadow-lg hover:bg-primary-600 
                           transform hover:-translate-y-0.5 transition-all duration-200 items-center gap-2.5"
                  >
                    <ChatBubbleLeftRightIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                    {{ t.contactWhatsApp }}
                  </a>
                </div>
              </div>
            </div>
      
            <!-- Pricing Reference Table -->
            <div class="border-t border-gray-200 p-6 sm:p-8">
              <h4 class="text-base sm:text-lg font-semibold text-center mb-6 text-gray-900">
                {{ t.pricingReference }}
              </h4>
              <div class="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
                <div class="inline-block min-w-full align-middle">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th class="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">
                          {{ t.boxType }}
                        </th>
                        <th class="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">
                          {{ t.weightRange }}
                        </th>
                        <th class="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">
                          {{ t.priceUSD }}
                        </th>
                        <th class="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">
                          {{ t.priceMXN }}
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr v-for="(tier, index) in pricingTiers" :key="index" class="hover:bg-gray-50">
                        <td class="px-3 py-4 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                          {{ tier.name }}
                        </td>
                        <td class="px-3 py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                          {{ tier.weightRange }}
                        </td>
                        <td class="px-3 py-4 text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                          ${{ tier.priceUSD }}
                        </td>
                        <td class="px-3 py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                          {{ t.approx }} ${{ tier.priceMXN }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p class="mt-4 text-xs sm:text-sm text-gray-500 text-center">
                {{ t.volumetricFormula }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'

  import {
    CubeIcon,
    ScaleIcon,
    CalculatorIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline'
  
  // Use language composable
  const { t: createTranslations, language } = useLanguage()
  
  // State
  const dimensions = ref({ length: 0, width: 0, height: 0 })
  const weight = ref(0)
  const currentUnit = ref('cm')
  const isRural = ref(false)
  const calculatorResult = ref({
    show: false,
    type: '',
    title: '',
    price: 0,
    priceMXN: '',
    actualWeight: 0,
    volumetricWeight: 0,
    chargeableWeight: 0,
    message: '',
    subtext: '',
    contactLink: '',
    showInfo: false
  })
  
  // Translations
  const translations = {
    calculatorTagline: {
      es: 'CALCULADORA DE ENVÍOS',
      en: 'SHIPPING CALCULATOR'
    },
    calculatorTitle: {
      es: 'Calcula el Costo de tu Caja Consolidada',
      en: 'Calculate Your Consolidated Box Cost'
    },
    calculatorSubtitle: {
      es: 'Ingresa las dimensiones y peso de tu caja para obtener un precio estimado. Cobramos por peso real o volumétrico, el que sea mayor.',
      en: 'Enter your box dimensions and weight for an exact price. We charge based on actual or volumetric weight, whichever is greater.'
    },
    boxDimensions: {
      es: 'Dimensiones de la Caja',
      en: 'Box Dimensions'
    },
    length: {
      es: 'Largo',
      en: 'Length'
    },
    width: {
      es: 'Ancho',
      en: 'Width'
    },
    height: {
      es: 'Alto',
      en: 'Height'
    },
    unit: {
      es: 'Unidad',
      en: 'Unit'
    },
    inches: {
      es: 'pulgadas',
      en: 'inches'
    },
    actualWeight: {
      es: 'Peso Real de la Caja',
      en: 'Actual Box Weight'
    },
    weight: {
      es: 'Peso',
      en: 'Weight'
    },
    weightHelp: {
      es: 'Ingresa el peso total de tu caja con todos los productos',
      en: 'Enter the total weight of your box with all products'
    },
    ruralDelivery: {
      es: 'Entrega en zona rural',
      en: 'Rural area delivery'
    },
    ruralFee: {
      es: '(+$20 USD / $360 MXN)',
      en: '(+$20 USD / $360 MXN)'
    },
    calculateBoxPrice: {
      es: 'Calcular Precio de Envío',
      en: 'Calculate Shipping Price'
    },
    actualWeightLabel: {
      es: 'Peso Real',
      en: 'Actual Weight'
    },
    volumetricWeightLabel: {
      es: 'Peso Volumétrico',
      en: 'Volumetric Weight'
    },
    chargeableWeightLabel: {
      es: 'Peso a Cobrar',
      en: 'Chargeable Weight'
    },
    approx: {
      es: 'Aprox.',
      en: 'Approx.'
    },
    priceNote: {
      es: 'Los precios no incluyen 16% de IVA. El tipo de cambio es aproximado y puede variar.',
      en: 'Prices do not include 16% VAT. Exchange rate is approximate and may vary.'
    },
    contactWhatsApp: {
      es: 'Continuar por WhatsApp',
      en: 'Continue on WhatsApp'
    },
    pricingReference: {
      es: 'Tabla de Precios de Referencia',
      en: 'Reference Pricing Table'
    },
    boxType: {
      es: 'Tipo',
      en: 'Type'
    },
    weightRange: {
      es: 'Rango de Peso',
      en: 'Weight Range'
    },
    priceUSD: {
      es: 'USD',
      en: 'USD'
    },
    priceMXN: {
      es: 'MXN',
      en: 'MXN'
    },
    volumetricFormula: {
      es: 'Peso volumétrico = (Largo × Ancho × Alto en cm) ÷ 5000',
      en: 'Volumetric weight = (Length × Width × Height in cm) ÷ 5000'
    },
    fillAllFields: {
      es: 'Por favor, ingresa todas las dimensiones y el peso',
      en: 'Please enter all dimensions and weight'
    },
    yourEstimate: {
      es: 'Tu Cotización',
      en: 'Your Estimate'
    },
    basedOnCategory: {
      es: 'Categoría',
      en: 'Category'
    },
    tooHeavy: {
      es: 'Cotización Personalizada Requerida',
      en: 'Custom Quote Required'
    },
    overWeightLimit: {
      es: 'Para cajas de más de 60 kg, necesitamos crear una cotización personalizada. Contáctanos para más detalles.',
      en: 'For boxes over 60 kg, we need to create a custom quote. Contact us for more details.'
    },
    chargedByVolumetric: {
      es: 'Se cobra por peso volumétrico ya que excede el peso real.',
      en: 'Charged by volumetric weight as it exceeds actual weight.'
    },
    chargedByActual: {
      es: 'Se cobra por peso real.',
      en: 'Charged by actual weight.'
    }
  }
  
  // Get reactive translations
  const t = createTranslations(translations)
  
  // Pricing tiers
  const pricingTiers = computed(() => {
    return language.value === 'es' ? [
      { name: 'Pequeña', weightRange: 'Hasta 10 kg', priceUSD: '110', priceMXN: '1,980' },
      { name: 'Mediana', weightRange: '11-25 kg', priceUSD: '190', priceMXN: '3,420' },
      { name: 'Grande', weightRange: '26-40 kg', priceUSD: '275', priceMXN: '4,950' },
      { name: 'XL', weightRange: '41-60 kg', priceUSD: '350', priceMXN: '6,300' },
      { name: 'Rural', weightRange: 'Cargo adicional', priceUSD: '20', priceMXN: '360' }
    ] : [
      { name: 'Small', weightRange: 'Up to 10 kg', priceUSD: '110', priceMXN: '1,980' },
      { name: 'Medium', weightRange: '11-25 kg', priceUSD: '190', priceMXN: '3,420' },
      { name: 'Large', weightRange: '26-40 kg', priceUSD: '275', priceMXN: '4,950' },
      { name: 'XL', weightRange: '41-60 kg', priceUSD: '350', priceMXN: '6,300' },
      { name: 'Rural', weightRange: 'Additional fee', priceUSD: '20', priceMXN: '360' }
    ]
  })
  
  // Calculate price function
  const calculatePrice = () => {
    const l = dimensions.value.length
    const w = dimensions.value.width
    const h = dimensions.value.height
    const actualWeight = weight.value
  
    // Validation
    if (!l || !w || !h || !actualWeight || l <= 0 || w <= 0 || h <= 0 || actualWeight <= 0) {
      calculatorResult.value = {
        show: true,
        type: 'error',
        title: t.value.fillAllFields,
        message: '',
        price: 0,
        priceMXN: '0',
        actualWeight: 0,
        volumetricWeight: 0,
        chargeableWeight: 0,
        subtext: '',
        contactLink: '',
        showInfo: false
      }
      return
    }
  
    // Convert to cm if needed
    const toCm = (val) => currentUnit.value === 'in' ? val * 2.54 : val
    const lengthCm = toCm(l)
    const widthCm = toCm(w)
    const heightCm = toCm(h)
  
    // Calculate volumetric weight
    const volumetricWeight = (lengthCm * widthCm * heightCm) / 5000
    const chargeableWeight = Math.max(actualWeight, volumetricWeight)
  
    // Determine price tier
    let basePrice = 0
    let tierName = ''
    
    if (chargeableWeight <= 10) {
      basePrice = 110
      tierName = language.value === 'es' ? 'Caja Pequeña' : 'Small Box'
    } else if (chargeableWeight <= 25) {
      basePrice = 190
      tierName = language.value === 'es' ? 'Caja Mediana' : 'Medium Box'
    } else if (chargeableWeight <= 40) {
      basePrice = 275
      tierName = language.value === 'es' ? 'Caja Grande' : 'Large Box'
    } else if (chargeableWeight <= 60) {
      basePrice = 350
      tierName = language.value === 'es' ? 'Caja XL' : 'XL Box'
    } else {
      // Over 60kg - custom quote
      const contactLink = language.value === 'es' 
        ? `https://wa.me/16195591910?text=Hola!%20Necesito%20cotización%20para%20caja%20de%20${chargeableWeight.toFixed(2)}kg`
        : `https://wa.me/16195591910?text=Hi!%20I%20need%20a%20quote%20for%20a%20${chargeableWeight.toFixed(2)}kg%20box`
      
      calculatorResult.value = {
        show: true,
        type: 'error',
        title: t.value.tooHeavy,
        message: t.value.overWeightLimit,
        price: 0,
        priceMXN: '0',
        actualWeight: actualWeight,
        volumetricWeight: volumetricWeight.toFixed(2),
        chargeableWeight: chargeableWeight.toFixed(2),
        subtext: '',
        contactLink: contactLink,
        showInfo: false
      }
      return
    }
  
    // Add rural fee if selected
    const ruralFee = isRural.value ? 20 : 0
    const totalPrice = basePrice + ruralFee
    const totalPriceMXN = totalPrice * 18 // Approximate exchange rate
  
    // Create WhatsApp message
    const ruralText = isRural.value ? (language.value === 'es' ? ' (Zona Rural)' : ' (Rural Area)') : ''
    const contactMessage = language.value === 'es' 
      ? `Hola! Quiero enviar una ${tierName} - Peso: ${chargeableWeight.toFixed(2)}kg${ruralText} - Precio: $${totalPrice} USD`
      : `Hi! I want to ship a ${tierName} - Weight: ${chargeableWeight.toFixed(2)}kg${ruralText} - Price: $${totalPrice} USD`
  
    calculatorResult.value = {
      show: true,
      type: 'success',
      title: `${t.value.yourEstimate}: <strong>${tierName}</strong>`,
      price: totalPrice,
      priceMXN: totalPriceMXN.toLocaleString('es-MX'),
      actualWeight: actualWeight,
      volumetricWeight: volumetricWeight.toFixed(2),
      chargeableWeight: chargeableWeight.toFixed(2),
      message: chargeableWeight > actualWeight ? t.value.chargedByVolumetric : t.value.chargedByActual,
      subtext: isRural.value ? t.value.ruralFee : '',
      contactLink: `https://wa.me/16195591910?text=${encodeURIComponent(contactMessage)}`,
      showInfo: true
    }
  }
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
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  /* Primary color variables */
  .bg-primary-50 { background-color: #eff6ff; }
  .bg-primary-200 { background-color: #bfdbfe; }
  .bg-primary-500 { background-color: #2E6BB7; }
  .bg-primary-600 { background-color: #2563eb; }
  .text-primary-500 { color: #2E6BB7; }
  .border-primary-200 { border-color: #bfdbfe; }
  .border-primary-500 { border-color: #2E6BB7; }
  .ring-primary-500 { --tw-ring-color: #2E6BB7; }
  .hover\:bg-primary-600:hover { background-color: #2563eb; }
  .hover\:shadow-lg:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .hover\:-translate-y-1:hover {
    transform: translateY(-0.25rem);
  }
  .focus\:ring-2:focus {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  }
  .focus\:ring-primary-500:focus {
    --tw-ring-color: #2E6BB7;
  }
  .focus\:border-transparent:focus {
    border-color: transparent;
  }
  </style>