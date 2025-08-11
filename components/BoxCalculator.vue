<template>
  <div id="calculator" class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
      <!-- Loading State -->
      <div v-if="loadingProducts" class="p-8 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4">
          <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="text-gray-500">{{ t.loadingBoxes }}</p>
      </div>

      <!-- Calculator Form -->
      <div v-else class="p-6 sm:p-8 lg:p-10">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{{ t.calculatorTitle }}</h2>
          <p class="text-gray-600">{{ t.calculatorSubtitle }}</p>
        </div>

        <!-- Form -->
        <div class="space-y-8">
          <!-- 1. Box Dimensions -->
          <div class="bg-gray-50 rounded-xl p-6">
            <h3 class="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
              <div class="p-2 bg-primary-100 rounded-lg">
                <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                </svg>
              </div>
              {{ t.step1Title }}
            </h3>
            
            <!-- Dimension Inputs -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label for="length" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.length }}
                </label>
                <input 
                  v-model.number="dimensions.length" 
                  type="number" 
                  id="length" 
                  placeholder="0" 
                  class="w-full px-4 py-3 text-lg rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
              </div>
              <div>
                <label for="width" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.width }}
                </label>
                <input 
                  v-model.number="dimensions.width" 
                  type="number" 
                  id="width" 
                  placeholder="0" 
                  class="w-full px-4 py-3 text-lg rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
              </div>
              <div>
                <label for="height" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.height }}
                </label>
                <input 
                  v-model.number="dimensions.height" 
                  type="number" 
                  id="height" 
                  placeholder="0" 
                  class="w-full px-4 py-3 text-lg rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
              </div>
            </div>
            
            <!-- Unit Toggle -->
            <div class="flex items-center gap-4">
              <span class="text-sm font-medium text-gray-700">{{ t.unit }}:</span>
              <div class="inline-flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                <button
                  @click="currentUnit = 'cm'"
                  :class="['px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200', 
                           currentUnit === 'cm' ? 'bg-primary-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900']"
                >
                  cm
                </button>
                <button
                  @click="currentUnit = 'in'"
                  :class="['px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200', 
                           currentUnit === 'in' ? 'bg-primary-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900']"
                >
                  {{ t.inches }}
                </button>
              </div>
            </div>
          </div>

          <!-- 2. Weight -->
          <div class="bg-gray-50 rounded-xl p-6">
            <h3 class="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
              <div class="p-2 bg-gray-100 rounded-lg">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                </svg>
              </div>
              {{ t.step2Title }}
            </h3>
            
            <div class="flex gap-4">
              <div class="flex-1">
                <label for="weight" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.weight }}
                </label>
                <input 
                  v-model.number="weight" 
                  type="number" 
                  id="weight" 
                  placeholder="0" 
                  class="w-full px-4 py-3 text-lg rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
              </div>
              <div class="flex items-end">
                <div class="px-4 py-3 bg-white rounded-xl border border-gray-200 text-gray-700 font-medium text-lg">
                  kg
                </div>
              </div>
            </div>
            <p class="mt-3 text-sm text-gray-600">{{ t.weightHelp }}</p>
          </div>

          <!-- Calculate Button -->
          <button 
            @click="calculateShipping" 
            :disabled="!canCalculate"
            class="w-full px-8 py-4 rounded-xl bg-primary-500 text-white font-semibold text-lg shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            {{ t.calculateButton }}
          </button>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="calculatorResult.show" class="border-t bg-gradient-to-b from-gray-50 to-white animate-slideDown">
        <div class="p-6 sm:p-8">
          <!-- Result Header -->
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ t.estimatedCost }}</h3>
          </div>

          <!-- Cost Display -->
          <div class="mb-6">
            <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600 mb-2">
                  ${{ formatPrice(calculatorResult.totalCostDisplay) }}
                </div>
                <div class="text-sm text-gray-500 mb-4">
                  ≈ ${{ formatPrice(calculatorResult.totalCostAlternate, true) }}
                </div>
                <p class="text-sm text-gray-600">{{ t.additionalFees }}</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/app/orders/create"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              {{ t.createOrder }}
            </NuxtLink>
            
            <button 
              @click="resetCalculator"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              {{ t.calculateAgain }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Nuxt imports
const { $customFetch } = useNuxtApp()

// Use the language composable
const { t: createTranslations, language } = useLanguage()

// Exchange rate constant
const exchangeRate = 18

// State
const dimensions = ref({ length: 0, width: 0, height: 0 })
const weight = ref(0)
const currentUnit = ref('cm')
const availableBoxes = ref([])
const loadingProducts = ref(true)

const calculatorResult = ref({
  show: false,
  totalCostDisplay: 0,
  totalCostAlternate: 0
})

// Translations
const translations = {
  calculatorTitle: {
    es: 'Calculadora de Envío',
    en: 'Shipping Calculator'
  },
  calculatorSubtitle: {
    es: 'Ingresa las dimensiones y peso para obtener un estimado',
    en: 'Enter dimensions and weight to get an estimate'
  },
  loadingBoxes: {
    es: 'Cargando...',
    en: 'Loading...'
  },
  step1Title: {
    es: 'Dimensiones',
    en: 'Dimensions'
  },
  step2Title: {
    es: 'Peso',
    en: 'Weight'
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
  weight: {
    es: 'Peso total',
    en: 'Total weight'
  },
  weightHelp: {
    es: 'Incluye el peso de la caja y todos los productos',
    en: 'Include the weight of the box and all products'
  },
  calculateButton: {
    es: 'Calcular Estimado',
    en: 'Calculate Estimate'
  },
  estimatedCost: {
    es: 'Costo Estimado',
    en: 'Estimated Cost'
  },
  additionalFees: {
    es: 'Costos adicionales pueden aplicar',
    en: 'Additional fees may apply'
  },
  createOrder: {
    es: 'Crear Orden',
    en: 'Create Order'
  },
  calculateAgain: {
    es: 'Calcular de Nuevo',
    en: 'Calculate Again'
  }
}

// Get reactive translations
const t = createTranslations(translations)

// Computed
const canCalculate = computed(() => {
  return dimensions.value.length > 0 && 
         dimensions.value.width > 0 && 
         dimensions.value.height > 0 && 
         weight.value > 0
})

// Methods
const formatPrice = (amount, isAlternate = false) => {
  const isSpanish = language.value === 'es'
  
  let currency
  if (isAlternate) {
    currency = isSpanish ? 'USD' : 'MXN'
  } else {
    currency = isSpanish ? 'MXN' : 'USD'
  }
  
  return `${amount.toFixed(2)} ${currency}`
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

const calculateShipping = () => {
  if (!canCalculate.value) return

  // Convert to cm if needed
  const toCm = (val) => currentUnit.value === 'in' ? val * 2.54 : val
  const lengthCm = toCm(dimensions.value.length)
  const widthCm = toCm(dimensions.value.width)
  const heightCm = toCm(dimensions.value.height)

  // Calculate volumetric weight
  const volumetricWeight = (lengthCm * widthCm * heightCm) / 5000
  const chargeableWeight = Math.max(weight.value, volumetricWeight)

  // Find suitable box
  const suitableBox = availableBoxes.value.find(box => {
    const boxDims = box.dimensions.split('x').map(d => parseInt(d.replace('cm', '')))
    const packageDims = [lengthCm, widthCm, heightCm].sort((a, b) => b - a)
    const sortedBoxDims = boxDims.sort((a, b) => b - a)
    
    const dimensionsFit = packageDims[0] <= sortedBoxDims[0] && 
                         packageDims[1] <= sortedBoxDims[1] && 
                         packageDims[2] <= sortedBoxDims[2]
    
    const weightFits = chargeableWeight <= parseFloat(box.max_weight)
    
    return dimensionsFit && weightFits
  })

  // Calculate price based on suitable box or use highest price as estimate
  const isSpanish = language.value === 'es'
  let boxPriceMXN = 0
  
  if (suitableBox) {
    boxPriceMXN = suitableBox.price
  } else {
    // Use the highest priced box as a base estimate
    const maxPricedBox = availableBoxes.value.reduce((max, box) => 
      box.price > max.price ? box : max, availableBoxes.value[0])
    boxPriceMXN = maxPricedBox ? maxPricedBox.price : 500 // fallback price
  }
  
  const boxPriceUSD = boxPriceMXN / exchangeRate

  calculatorResult.value = {
    show: true,
    totalCostDisplay: isSpanish ? boxPriceMXN : boxPriceUSD,
    totalCostAlternate: isSpanish ? boxPriceUSD : boxPriceMXN
  }
}

const resetCalculator = () => {
  dimensions.value = { length: 0, width: 0, height: 0 }
  weight.value = 0
  calculatorResult.value.show = false
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

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
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

.animate-slideDown {
  animation: slideDown 0.4s ease-out forwards;
}
</style>