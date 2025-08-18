<template>
  <div id="calculator" class="max-w-md mx-auto lg:max-w-2xl">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
      <!-- Loading State -->
      <div v-if="loadingProducts" class="p-6 text-center">
        <div class="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-xl mb-3">
          <svg class="animate-spin h-6 w-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="text-gray-500 text-sm">{{ t.loadingBoxes }}</p>
      </div>

      <!-- Multi-Step Form -->
      <div v-else>
        <!-- Progress Bar -->
        <div class="bg-gray-50 px-4 py-3 border-b">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-medium text-gray-600">{{ t.step }} {{ currentStep }} {{ t.of }} 4</span>
            <span class="text-xs text-gray-500">{{ Math.round((currentStep / 4) * 100) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-1.5">
            <div class="bg-primary-500 h-1.5 rounded-full transition-all duration-300 ease-out" :style="{ width: (currentStep / 4) * 100 + '%' }"></div>
          </div>
        </div>

        <!-- Header -->
        <div class="px-4 py-6 text-center border-b">
          <h2 class="text-xl font-bold text-gray-900 mb-1">{{ t.calculatorTitle }}</h2>
          <p class="text-sm text-gray-600">{{ getCurrentStepTitle() }}</p>
        </div>

        <!-- Step 1: Shipment Type -->
        <div v-if="currentStep === 1" class="p-4 space-y-4">
          <div class="space-y-3">
            <button
              @click="selectShipmentType(false)"
              :class="['w-full p-4 rounded-xl border-2 transition-all duration-200 text-left',
                       !isConsolidated ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300']"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-semibold text-gray-900">{{ t.singleShipment }}</h3>
                  </div>
                  <p class="text-sm text-gray-600">{{ t.singleShipmentDesc }}</p>
                </div>
                <div :class="['w-5 h-5 rounded-full border-2 flex items-center justify-center',
                             !isConsolidated ? 'border-primary-500 bg-primary-500' : 'border-gray-300']">
                  <div v-if="!isConsolidated" class="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </button>

            <button
              @click="selectShipmentType(true)"
              :class="['w-full p-4 rounded-xl border-2 transition-all duration-200 text-left',
                       isConsolidated ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300']"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-semibold text-gray-900">{{ t.consolidatedShipment }}</h3>
                  </div>
                  <p class="text-sm text-gray-600">{{ t.consolidatedShipmentDesc }}</p>
                </div>
                <div :class="['w-5 h-5 rounded-full border-2 flex items-center justify-center',
                             isConsolidated ? 'border-primary-500 bg-primary-500' : 'border-gray-300']">
                  <div v-if="isConsolidated" class="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </button>
          </div>

          <button 
            @click="nextStep" 
            :disabled="shipmentTypeSelected === null"
            class="w-full py-3 px-4 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ t.continue }}
          </button>
        </div>

        <!-- Step 2: Dimensions -->
        <div v-if="currentStep === 2" class="p-4 space-y-4">
          <!-- Unit Toggle -->
          <div class="flex justify-center">
            <div class="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                @click="currentUnit = 'cm'"
                :class="['px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200', 
                         currentUnit === 'cm' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600']"
              >
                cm
              </button>
              <button
                @click="currentUnit = 'in'"
                :class="['px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200', 
                         currentUnit === 'in' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600']"
              >
                {{ t.inches }}
              </button>
            </div>
          </div>

          <!-- Dimension Inputs -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.length }}
              </label>
              <input 
                v-model.number="dimensions.length" 
                type="number" 
                placeholder="0" 
                class="w-full px-4 py-3 text-lg rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.width }}
              </label>
              <input 
                v-model.number="dimensions.width" 
                type="number" 
                placeholder="0" 
                class="w-full px-4 py-3 text-lg rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.height }}
              </label>
              <input 
                v-model.number="dimensions.height" 
                type="number" 
                placeholder="0" 
                class="w-full px-4 py-3 text-lg rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex gap-3 pt-2">
            <button 
              @click="prevStep"
              class="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
            >
              {{ t.back }}
            </button>
            <button 
              @click="nextStep" 
              :disabled="!dimensionsValid"
              class="flex-1 py-3 px-4 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ t.continue }}
            </button>
          </div>
        </div>

        <!-- Step 3: Weight -->
        <div v-if="currentStep === 3" class="p-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.weight }}
            </label>
            <div class="relative">
              <input 
                v-model.number="weight" 
                type="number" 
                placeholder="0" 
                class="w-full px-4 py-3 pr-12 text-lg rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                kg
              </div>
            </div>
            <p class="mt-2 text-sm text-gray-600">{{ t.weightHelp }}</p>
          </div>

          <!-- Navigation -->
          <div class="flex gap-3 pt-2">
            <button 
              @click="prevStep"
              class="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
            >
              {{ t.back }}
            </button>
            <button 
              @click="nextStep" 
              :disabled="!weightValid"
              class="flex-1 py-3 px-4 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ t.calculate }}
            </button>
          </div>
        </div>

        <!-- Step 4: Results -->
        <div v-if="currentStep === 4" class="space-y-0">
          <!-- Consolidated Box Result -->
          <div v-if="isConsolidated && calculatorResult.recommendedBox" class="p-4">
            <div class="text-center mb-4">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900">{{ t.recommendedBox }}</h3>
            </div>

            <div class="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-4 mb-4">
              <div class="text-center">
                <div class="text-xl font-bold text-gray-900 mb-1">
                  {{ getLocalizedBoxName(calculatorResult.recommendedBox) }}
                </div>
                <div class="text-2xl font-bold text-primary-600 mb-2">
                  ${{ calculatorResult.recommendedBox.price.toFixed(2) }} MXN
                </div>
                <div class="text-sm text-gray-600 mb-3">
                  {{ getLocalizedBoxDescription(calculatorResult.recommendedBox) }}
                </div>
                
                <!-- Box Specifications -->
                <div class="grid grid-cols-1 gap-2 text-sm">
                  <div class="flex justify-between items-center py-1">
                    <span class="text-gray-600">{{ t.maxWeight }}:</span>
                    <span class="font-semibold text-gray-900">{{ calculatorResult.recommendedBox.max_weight }} kg</span>
                  </div>
                  <div class="flex justify-between items-center py-1">
                    <span class="text-gray-600">{{ t.maxDimensions }}:</span>
                    <span class="font-semibold text-gray-900">
                      {{ calculatorResult.recommendedBox.max_length }}×{{ calculatorResult.recommendedBox.max_width }}×{{ calculatorResult.recommendedBox.max_height }} cm
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <p class="text-xs text-gray-500 text-center mb-4">{{ t.estimateNote }}</p>
          </div>

          <!-- Single Shipment Result -->
          <div v-if="!isConsolidated" class="p-4">
            <div class="text-center mb-4">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900">{{ t.estimatedCost }}</h3>
            </div>

            <div class="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-4 mb-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-primary-600 mb-3">
                  ${{ calculatorResult.price.toFixed(2) }} MXN
                </div>
                
                <!-- Weight Details -->
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">{{ t.volumetricWeight }}:</span>
                    <span class="font-semibold text-gray-900">{{ calculatorResult.volumetricWeight }} kg</span>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">{{ t.priceRange }}:</span>
                    <span class="font-semibold text-gray-900">{{ calculatorResult.weightRange }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p class="text-xs text-gray-500 text-center mb-4">{{ t.estimateNote }}</p>
          </div>

          <!-- Error State -->
          <div v-if="calculatorResult.error" class="p-4">
            <div class="bg-red-50 rounded-xl p-4 text-center">
              <div class="text-red-600 mb-2">
                <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <div class="text-sm font-semibold text-red-800 mb-1">{{ t.noBoxFound }}</div>
              <p class="text-xs text-red-700">{{ calculatorResult.error }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="p-4 bg-gray-50 space-y-3">
            <NuxtLink 
              to="/app/orders/create"
              class="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 transition-all duration-300"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              {{ t.createOrder }}
            </NuxtLink>
            
            <button 
              @click="resetCalculator"
              class="w-full py-3 px-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300"
            >
              {{ t.calculateAgain }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Nuxt imports
const { $customFetch } = useNuxtApp()

// Use the language composable
const { t: createTranslations, language } = useLanguage()

// State
const currentStep = ref(1)
const shipmentTypeSelected = ref(null)
const dimensions = ref({ length: 0, width: 0, height: 0 })
const weight = ref(0)
const currentUnit = ref('cm')
const isConsolidated = ref(false)
const allProducts = ref([])
const loadingProducts = ref(true)

const calculatorResult = ref({
  show: false,
  price: 0,
  volumetricWeight: 0,
  chargeableWeight: 0,
  weightRange: '',
  recommendedBox: null,
  error: null
})

// Local product translations
const localizedProducts = {
  // Consolidated boxes with translations
  consolidated: {
    'prod_SgwXYuOdRPHoei': {
      name: {
        es: 'Caja Extra Pequeña',
        en: 'Extra Small Box'
      },
      description: {
        es: 'Perfecta para joyería, documentos, electrónicos pequeños o accesorios ligeros.',
        en: 'Perfect for jewelry, documents, small electronics, or lightweight accessories.'
      }
    },
    'prod_SgwZNvuTLb4AeF': {
      name: {
        es: 'Caja Pequeña',
        en: 'Small Box'
      },
      description: {
        es: 'Perfecta para compras pequeñas como electrónicos, cosméticos o accesorios.',
        en: 'Perfect for small purchases like electronics, cosmetics, or accessories.'
      }
    },
    'prod_SgwbiQCQncbSsq': {
      name: {
        es: 'Caja Mediana',
        en: 'Medium Box'
      },
      description: {
        es: 'Ideal para ropa, zapatos o múltiples artículos pequeños.',
        en: 'Ideal for clothing hauls, shoes, or multiple small items.'
      }
    },
    'prod_SgwdK1PNcDIxRD': {
      name: {
        es: 'Caja Grande',
        en: 'Large Box'
      },
      description: {
        es: 'Excelente para compras al por mayor, artículos para el hogar o electrónicos grandes.',
        en: 'Great for bulk purchases, home goods, or large electronics.'
      }
    },
    'prod_Sgwj5tGJr3luOk': {
      name: {
        es: 'Caja Extra Grande',
        en: 'Extra Large Box'
      },
      description: {
        es: 'Ideal para electrodomésticos grandes, muebles, pedidos al por mayor o envíos familiares.',
        en: 'Ideal for large appliances, furniture, bulk orders, or family-sized shipments.'
      }
    }
  }
}

// Translations
const translations = {
  calculatorTitle: {
    es: 'Calculadora de Envío',
    en: 'Shipping Calculator'
  },
  step: {
    es: 'Paso',
    en: 'Step'
  },
  of: {
    es: 'de',
    en: 'of'
  },
  loadingBoxes: {
    es: 'Cargando...',
    en: 'Loading...'
  },
  singleShipment: {
    es: 'Envío Individual',
    en: 'Single Shipment'
  },
  singleShipmentDesc: {
    es: 'Precio basado en peso volumétrico. Ideal para productos individuales.',
    en: 'Price based on volumetric weight. Ideal for individual products.'
  },
  consolidatedShipment: {
    es: 'Envío Consolidado',
    en: 'Consolidated Shipment'
  },
  consolidatedShipmentDesc: {
    es: 'Tu pedido se enviará en una de nuestras cajas predefinidas.',
    en: 'Your order will be shipped in one of our predefined boxes.'
  },
  continue: {
    es: 'Continuar',
    en: 'Continue'
  },
  back: {
    es: 'Atrás',
    en: 'Back'
  },
  calculate: {
    es: 'Calcular',
    en: 'Calculate'
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
  estimatedCost: {
    es: 'Costo Estimado',
    en: 'Estimated Cost'
  },
  recommendedBox: {
    es: 'Caja Recomendada',
    en: 'Recommended Box'
  },
  maxWeight: {
    es: 'Peso Máximo',
    en: 'Max Weight'
  },
  maxDimensions: {
    es: 'Dimensiones Máx.',
    en: 'Max Dimensions'
  },
  volumetricWeight: {
    es: 'Peso Volumétrico',
    en: 'Volumetric Weight'
  },
  chargeableWeight: {
    es: 'Peso Cobrable',
    en: 'Chargeable Weight'
  },
  priceRange: {
    es: 'Rango de Precio',
    en: 'Price Range'
  },
  estimateNote: {
    es: 'Este es un estimado. Costos adicionales pueden aplicar.',
    en: 'This is an estimate. Additional fees may apply.'
  },
  noBoxFound: {
    es: 'No se encontró una caja adecuada',
    en: 'No suitable box found'
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
const dimensionsValid = computed(() => {
  return dimensions.value.length > 0 && 
         dimensions.value.width > 0 && 
         dimensions.value.height > 0
})

const weightValid = computed(() => {
  return weight.value > 0
})

const consolidatedProducts = computed(() => {
  return allProducts.value
    .filter(product => product.consolidated === 'true')
    .sort((a, b) => a.price - b.price)
})

const weightProducts = computed(() => {
  return allProducts.value
    .filter(product => product.consolidated === null && product.min_weight && product.max_weight)
    .sort((a, b) => parseFloat(a.min_weight) - parseFloat(b.min_weight))
})

// Methods
const getCurrentStepTitle = () => {
  const titles = {
    1: language.value === 'es' ? 'Selecciona el tipo de envío' : 'Select shipment type',
    2: language.value === 'es' ? 'Ingresa las dimensiones' : 'Enter dimensions',
    3: language.value === 'es' ? 'Ingresa el peso' : 'Enter weight',
    4: language.value === 'es' ? 'Tu estimado está listo' : 'Your estimate is ready'
  }
  return titles[currentStep.value] || ''
}

const getLocalizedBoxName = (box) => {
  const localized = localizedProducts.consolidated[box.id]
  if (localized && localized.name[language.value]) {
    return localized.name[language.value]
  }
  return box.name
}

const getLocalizedBoxDescription = (box) => {
  const localized = localizedProducts.consolidated[box.id]
  if (localized && localized.description[language.value]) {
    return localized.description[language.value]
  }
  return box.description
}

const selectShipmentType = (consolidated) => {
  isConsolidated.value = consolidated
  shipmentTypeSelected.value = consolidated
}

const nextStep = () => {
  if (currentStep.value < 4) {
    if (currentStep.value === 3) {
      calculateShipping()
    }
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const fetchProducts = async () => {
  try {
    loadingProducts.value = true
    const response = await $customFetch('/products')
    allProducts.value = response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loadingProducts.value = false
  }
}

const calculateConsolidatedShipping = () => {
  const toCm = (val) => currentUnit.value === 'in' ? val * 2.54 : val
  const lengthCm = toCm(dimensions.value.length)
  const widthCm = toCm(dimensions.value.width)
  const heightCm = toCm(dimensions.value.height)

  const suitableBoxes = consolidatedProducts.value.filter(box => {
    const fitsWeight = weight.value <= parseFloat(box.max_weight)
    const fitsLength = lengthCm <= parseFloat(box.max_length)
    const fitsWidth = widthCm <= parseFloat(box.max_width)
    const fitsHeight = heightCm <= parseFloat(box.max_height)
    
    return fitsWeight && fitsLength && fitsWidth && fitsHeight
  })

  if (suitableBoxes.length === 0) {
    calculatorResult.value = {
      show: true,
      error: language.value === 'es' ? 
        'Las dimensiones o peso exceden nuestras cajas disponibles. Por favor contacta soporte.' :
        'Dimensions or weight exceed our available boxes. Please contact support.',
      recommendedBox: null,
      price: 0
    }
    return
  }

  const recommendedBox = suitableBoxes[0]

  calculatorResult.value = {
    show: true,
    recommendedBox: recommendedBox,
    price: parseFloat(recommendedBox.price),
    error: null
  }
}

const calculateSingleShipping = () => {
  const toCm = (val) => currentUnit.value === 'in' ? val * 2.54 : val
  const lengthCm = toCm(dimensions.value.length)
  const widthCm = toCm(dimensions.value.width)
  const heightCm = toCm(dimensions.value.height)

  const volumetricWeight = (lengthCm * widthCm * heightCm) / 5000
  const roundedVolumetricWeight = Math.round(volumetricWeight * 100) / 100
  
  let chargeableWeight = Math.max(weight.value, roundedVolumetricWeight)
  
  if (chargeableWeight < 1) {
    chargeableWeight = 1
  }

  const matchingProduct = weightProducts.value.find(product => {
    return chargeableWeight >= parseFloat(product.min_weight) && 
           chargeableWeight <= parseFloat(product.max_weight)
  })

  let priceMXN = 0
  let weightRange = ''
  
  if (matchingProduct) {
    priceMXN = parseFloat(matchingProduct.price)
    weightRange = `${matchingProduct.min_weight}-${matchingProduct.max_weight} kg`
  } else {
    const highestTier = weightProducts.value[weightProducts.value.length - 1]
    if (highestTier && chargeableWeight > parseFloat(highestTier.max_weight)) {
      priceMXN = parseFloat(highestTier.price)
      weightRange = `>${highestTier.max_weight} kg`
    } else {
      priceMXN = 980
      weightRange = '1-3 kg'
    }
  }

  calculatorResult.value = {
    show: true,
    price: priceMXN,
    volumetricWeight: roundedVolumetricWeight.toFixed(2),
    chargeableWeight: chargeableWeight.toFixed(2),
    weightRange: weightRange,
    recommendedBox: null,
    error: null
  }
}

const calculateShipping = () => {
  if (isConsolidated.value) {
    calculateConsolidatedShipping()
  } else {
    calculateSingleShipping()
  }
}

const resetCalculator = () => {
  currentStep.value = 1
  shipmentTypeSelected.value = null
  dimensions.value = { length: 0, width: 0, height: 0 }
  weight.value = 0
  calculatorResult.value.show = false
  calculatorResult.value.error = null
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