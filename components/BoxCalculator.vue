<template>
  <div id="calculator" class="w-full max-w-lg mx-auto px-4 py-6">
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-5">
        <h2 class="text-xl font-bold text-white">{{ t.title }}</h2>
        <p class="text-primary-100 text-sm mt-1">{{ t.subtitle }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="loadingProducts" class="p-8 text-center">
        <svg class="animate-spin h-8 w-8 text-primary-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <!-- Main Form -->
      <div v-else class="p-6 space-y-5">
        <!-- Weight Input with Unit Toggle -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            {{ t.weightLabel }}
          </label>
          
          <!-- Weight Unit Toggle Pills -->
          <div class="flex justify-center mb-3">
            <div class="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                @click="weightUnit = 'kg'"
                :class="['px-4 py-2 text-sm font-medium rounded-md transition-all duration-200', 
                         weightUnit === 'kg' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900']"
              >
                {{ t.kilograms }}
              </button>
              <button
                @click="weightUnit = 'lb'"
                :class="['px-4 py-2 text-sm font-medium rounded-md transition-all duration-200', 
                         weightUnit === 'lb' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900']"
              >
                {{ t.pounds }}
              </button>
            </div>
          </div>
          
          <!-- Weight Input -->
          <div class="relative">
            <input 
              v-model.number="weight" 
              type="number" 
              step="0.1"
              placeholder="0" 
              @keyup.enter="calculate"
              class="w-full px-4 py-3 pr-12 text-lg font-medium rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            >
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium pointer-events-none">
              {{ weightUnit }}
            </div>
          </div>
        </div>

        <!-- Optional Dimensions Toggle -->
        <div class="flex items-center gap-3">
          <input 
            id="show-dimensions" 
            type="checkbox" 
            v-model="showDimensions"
            class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
          >
          <label for="show-dimensions" class="text-sm text-gray-600 cursor-pointer select-none">
            {{ t.addDimensions }}
          </label>
        </div>

        <!-- Dimensions (Optional) -->
        <div v-if="showDimensions" class="space-y-4 pt-2 animate-slideDown">
          <!-- Unit Toggle for Dimensions -->
          <div class="flex justify-end">
            <div class="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                @click="dimensionUnit = 'cm'"
                :class="['px-3 py-1.5 text-sm font-medium rounded-md transition-all', 
                         dimensionUnit === 'cm' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900']"
              >
                cm
              </button>
              <button
                @click="dimensionUnit = 'in'"
                :class="['px-3 py-1.5 text-sm font-medium rounded-md transition-all', 
                         dimensionUnit === 'in' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900']"
              >
                in
              </button>
            </div>
          </div>

          <!-- Dimension Inputs Grid -->
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">{{ t.length }}</label>
              <input 
                v-model.number="dimensions.length" 
                type="number" 
                step="0.1"
                placeholder="0" 
                class="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">{{ t.width }}</label>
              <input 
                v-model.number="dimensions.width" 
                type="number" 
                step="0.1"
                placeholder="0" 
                class="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">{{ t.height }}</label>
              <input 
                v-model.number="dimensions.height" 
                type="number" 
                step="0.1"
                placeholder="0" 
                class="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
          </div>
        </div>

        <!-- Calculate Button -->
        <button 
          @click="calculate"
          :disabled="!canCalculate || calculating"
          class="w-full py-3 px-4 bg-primary-500 text-white font-semibold rounded-lg shadow-md hover:bg-primary-600 hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
        >
          <span v-if="!calculating">{{ t.calculateButton }}</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ t.calculating }}
          </span>
        </button>

        <!-- Result -->
        <transition name="fade">
          <div v-if="result" class="mt-6 pt-6 border-t border-gray-200">
            <!-- Success Result -->
            <div v-if="result.box" class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-600">{{ t.recommendedBox }}</h3>
                <span v-if="result.usedDimensions" class="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                  {{ t.withDimensions }}
                </span>
              </div>
              
              <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4">
                <div class="text-center">
                  <div class="text-lg font-semibold text-gray-900 mb-1">
                    {{ getBoxName(result.box) }}
                  </div>
                  <div class="text-3xl font-bold text-primary-600">
                    ${{ result.box.price.toFixed(2) }}
                    <span class="text-lg font-normal text-gray-600">{{ result.box.currency }}</span>
                  </div>
                  
                  <!-- <div v-if="result.box.description" class="text-sm text-gray-600 mt-3">
                    {{ result.box.description }}
                  </div> -->
                  
                  <!-- Specs Grid -->
                  <div class="grid grid-cols-2 gap-3 mt-4 text-xs">
                    <div v-if="result.box.max_weight" class="bg-white/70 rounded-lg p-2">
                      <div class="text-gray-500">{{ t.maxWeight }}</div>
                      <div class="font-semibold text-gray-900">{{ result.box.max_weight }} kg</div>
                    </div>
                    <div v-if="result.box.max_length" class="bg-white/70 rounded-lg p-2">
                      <div class="text-gray-500">{{ t.maxSize }}</div>
                      <div class="font-semibold text-gray-900">
                        {{ result.box.max_length }}×{{ result.box.max_width }}×{{ result.box.max_height }} cm
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- CTA Button -->
              <NuxtLink 
                to="/app/orders/create"
                class="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-all"
              >
                {{ t.createOrder }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
            </div>

            <!-- Error Result -->
            <div v-else-if="result.error" class="bg-red-50 rounded-xl p-4">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                <div>
                  <div class="text-sm font-medium text-red-800">{{ t.error }}</div>
                  <div class="text-sm text-red-600 mt-1">{{ result.error }}</div>
                </div>
              </div>
            </div>
          </div>
        </transition>
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

// State
const weight = ref(null)
const weightUnit = ref('kg')
const dimensions = ref({ length: null, width: null, height: null })
const dimensionUnit = ref('cm')
const showDimensions = ref(false)
const products = ref([])
const loadingProducts = ref(true)
const calculating = ref(false)
const result = ref(null)

// Translations
const translations = {
  title: {
    es: 'Calculadora de Envío',
    en: 'Shipping Calculator'
  },
  subtitle: {
    es: 'Obtén un estimado instantáneo',
    en: 'Get an instant estimate'
  },
  weightLabel: {
    es: 'Peso del paquete',
    en: 'Package weight'
  },
  kilograms: {
    es: 'Kilogramos (kg)',
    en: 'Kilograms (kg)'
  },
  pounds: {
    es: 'Libras (lb)',
    en: 'Pounds (lb)'
  },
  addDimensions: {
    es: 'Añadir dimensiones para mayor precisión',
    en: 'Add dimensions for better accuracy'
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
  calculateButton: {
    es: 'Calcular Precio',
    en: 'Calculate Price'
  },
  calculating: {
    es: 'Calculando...',
    en: 'Calculating...'
  },
  recommendedBox: {
    es: 'Caja Recomendada',
    en: 'Recommended Box'
  },
  withDimensions: {
    es: 'Con dimensiones',
    en: 'With dimensions'
  },
  maxWeight: {
    es: 'Peso máx.',
    en: 'Max weight'
  },
  maxSize: {
    es: 'Tamaño máx.',
    en: 'Max size'
  },
  createOrder: {
    es: 'Crear Orden',
    en: 'Create Order'
  },
  error: {
    es: 'No se pudo calcular',
    en: 'Could not calculate'
  },
  errorNoBox: {
    es: 'No hay una caja disponible para este peso/tamaño. Contacta soporte para opciones.',
    en: 'No box available for this weight/size. Contact support for options.'
  }
}

// Get reactive translations
const t = createTranslations(translations)

// Computed
const canCalculate = computed(() => {
  return weight.value && weight.value > 0
})

const consolidatedProducts = computed(() => {
  return products.value
    .filter(product => product.consolidated === 'true')
    .sort((a, b) => a.price - b.price)
})

// Methods
const getBoxName = (box) => {
  const name = box.name.toLowerCase()
  
  if (name.includes('extra small') || name.includes('xs')) {
    return language.value === 'es' ? 'Caja Extra Pequeña' : 'Extra Small Box'
  } else if (name.includes('small') && !name.includes('extra')) {
    return language.value === 'es' ? 'Caja Pequeña' : 'Small Box'
  } else if (name.includes('medium')) {
    return language.value === 'es' ? 'Caja Mediana' : 'Medium Box'
  } else if (name.includes('large') && !name.includes('extra')) {
    return language.value === 'es' ? 'Caja Grande' : 'Large Box'
  } else if (name.includes('extra large') || name.includes('xl')) {
    return language.value === 'es' ? 'Caja Extra Grande' : 'Extra Large Box'
  }
  
  // Fallback based on weight
  const maxWeight = parseFloat(box.max_weight)
  if (maxWeight <= 5) {
    return language.value === 'es' ? 'Caja Extra Pequeña' : 'Extra Small Box'
  } else if (maxWeight <= 10) {
    return language.value === 'es' ? 'Caja Pequeña' : 'Small Box'
  } else if (maxWeight <= 25) {
    return language.value === 'es' ? 'Caja Mediana' : 'Medium Box'
  } else if (maxWeight <= 40) {
    return language.value === 'es' ? 'Caja Grande' : 'Large Box'
  } else {
    return language.value === 'es' ? 'Caja Extra Grande' : 'Extra Large Box'
  }
}

const fetchProducts = async () => {
  try {
    loadingProducts.value = true
    const response = await $customFetch('/products')
    
    // Filter only consolidated products
    const consolidated = response.data.filter(product => product.consolidated === 'true')
    
    // Remove duplicates by product ID
    const uniqueProducts = []
    const seenIds = new Set()
    
    for (const product of consolidated) {
      if (!seenIds.has(product.id)) {
        seenIds.add(product.id)
        uniqueProducts.push(product)
      }
    }
    
    products.value = uniqueProducts
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loadingProducts.value = false
  }
}

const calculate = () => {
  if (!canCalculate.value) return
  
  calculating.value = true
  result.value = null
  
  // Simulate calculation delay for better UX
  setTimeout(() => {
    // Convert weight to kg if needed
    const weightInKg = weightUnit.value === 'lb' ? weight.value * 0.453592 : weight.value
    
    let suitableBoxes = []
    let usedDimensions = false
    
    // Check if dimensions are provided and valid
    const hasDimensions = showDimensions.value && 
                          dimensions.value.length > 0 && 
                          dimensions.value.width > 0 && 
                          dimensions.value.height > 0
    
    if (hasDimensions) {
      // Convert dimensions to cm if needed
      const toCm = (val) => dimensionUnit.value === 'in' ? val * 2.54 : val
      const lengthCm = toCm(dimensions.value.length)
      const widthCm = toCm(dimensions.value.width)
      const heightCm = toCm(dimensions.value.height)
      
      suitableBoxes = consolidatedProducts.value.filter(box => {
        const fitsWeight = !box.max_weight || weightInKg <= parseFloat(box.max_weight)
        const fitsLength = !box.max_length || lengthCm <= parseFloat(box.max_length)
        const fitsWidth = !box.max_width || widthCm <= parseFloat(box.max_width)
        const fitsHeight = !box.max_height || heightCm <= parseFloat(box.max_height)
        
        return fitsWeight && fitsLength && fitsWidth && fitsHeight
      })
      
      usedDimensions = true
    } else {
      // Filter by weight only
      suitableBoxes = consolidatedProducts.value.filter(box => {
        return !box.max_weight || weightInKg <= parseFloat(box.max_weight)
      })
    }
    
    if (suitableBoxes.length > 0) {
      result.value = {
        box: suitableBoxes[0], // Cheapest suitable box
        usedDimensions: usedDimensions
      }
    } else {
      result.value = {
        error: language.value === 'es' ? 
          'No hay una caja disponible para este peso/tamaño. Contacta soporte para opciones.' :
          'No box available for this weight/size. Contact support for options.'
      }
    }
    
    calculating.value = false
  }, 300)
}

// Lifecycle
onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideDown {
  animation: slideDown 0.3s ease-out;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Remove number input arrows */
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

/* Mobile-first responsive adjustments */
@media (max-width: 640px) {
  #calculator {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>