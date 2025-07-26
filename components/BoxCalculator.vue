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

          <!-- 3. Declared Value -->
          <div class="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 class="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
              <div class="p-2 bg-yellow-100 rounded-lg">
                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              {{ t.step3Title }}
            </h3>
            
            <div class="mb-4">
              <p class="text-sm text-gray-700 mb-3">{{ t.declaredValueDescription }}</p>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                <input 
                  v-model.number="declaredValue"
                  type="number" 
                  id="declared_value" 
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                  class="pl-8 w-full px-4 py-3 text-lg rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">USD</span>
              </div>
            </div>
            
            <!-- IVA Preview -->
            <div v-if="declaredValue > 0" class="bg-white rounded-lg p-4 border border-yellow-200">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">{{ t.ivaPreview }}:</span>
                <span class="font-semibold text-gray-900">
                  ${{ formatPrice(ivaDisplayAmount) }}
                </span>
              </div>
              <div v-if="declaredValue > 0" class="text-xs text-gray-500 text-right mt-1">
                (${{ formatPrice(ivaAlternateAmount, true) }})
              </div>
            </div>
          </div>

          <!-- 4. Rural Delivery -->
          <div class="bg-green-50 rounded-xl p-6 border border-green-200">
            <label class="flex items-start gap-4 cursor-pointer">
              <input 
                type="checkbox" 
                v-model="isRural" 
                class="mt-1 w-5 h-5 text-primary-500 rounded border-gray-300 focus:ring-2 focus:ring-primary-500"
              >
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <div class="p-2 bg-green-100 rounded-lg">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <span class="font-medium text-gray-900 text-lg">{{ t.ruralDelivery }}</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ t.ruralDescription }}</p>
                <p v-if="ruralSurcharge" class="text-sm font-medium text-green-700">
                  +{{ formatPrice(getRuralSurchargeAmount()) }}
                </p>
              </div>
            </label>
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
      <div v-if="calculatorResult.show" 
           :class="['border-t animate-slideDown', 
                    calculatorResult.canFit 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200']">
        <div class="p-6 sm:p-8">
          <!-- Result Header -->
          <div class="text-center mb-6">
            <div v-if="calculatorResult.canFit" class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div v-else class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ calculatorResult.title }}</h3>
            <p v-if="calculatorResult.subtitle" class="text-gray-600">{{ calculatorResult.subtitle }}</p>
          </div>

          <!-- Box Recommendation -->
          <div v-if="calculatorResult.canFit && calculatorResult.recommendedBox" class="mb-6">
            <div class="bg-white rounded-xl p-6 border-2 border-primary-200 shadow-sm">
              <div class="flex items-center gap-4 mb-4">
                <div class="hidden md:block p-3 bg-primary-100 rounded-xl">
                  <img src="/logo.svg" alt="Box" class="w-12 h-12 flex-shrink-0">
                </div>
                <div>
                  <h4 class="text-xl font-semibold text-gray-900">{{ getBoxTranslations(calculatorResult.recommendedBox).name }}</h4>
                  <p class="text-sm text-gray-600">{{ getBoxTranslations(calculatorResult.recommendedBox).description }}</p>
                </div>
              </div>
              
              <!-- Box Details -->
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="bg-gray-50 rounded-lg p-3">
                  <p class="text-xs text-gray-600 mb-1">{{ t.maxDimensions }}</p>
                  <p class="font-medium text-gray-900">{{ calculatorResult.recommendedBox.dimensions }}</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-3">
                  <p class="text-xs text-gray-600 mb-1">{{ t.maxWeight }}</p>
                  <p class="font-medium text-gray-900">{{ calculatorResult.recommendedBox.max_weight }}kg</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Cost Breakdown -->
          <div v-if="calculatorResult.canFit" class="mb-6">
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <h4 class="font-semibold text-gray-900 mb-4">{{ t.costBreakdown }}</h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">{{ getBoxTranslations(calculatorResult.recommendedBox).name }}</span>
                  <span class="font-medium text-gray-900">${{ formatPrice(calculatorResult.boxPriceDisplay) }}</span>
                </div>
                <div v-if="declaredValue >= 50" class="flex justify-between items-center">
                  <span class="text-gray-600">{{ t.ivaLabel }} (16%)</span>
                  <span class="font-medium text-gray-900">${{ formatPrice(ivaDisplayAmount) }}</span>
                </div>
                <div v-if="isRural && ruralSurcharge" class="flex justify-between items-center">
                  <span class="text-gray-600">{{ t.ruralSurcharge }}</span>
                  <span class="font-medium text-gray-900">${{ formatPrice(getRuralSurchargeAmount()) }}</span>
                </div>
                <div class="border-t pt-3">
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold text-gray-900">{{ t.total }}</span>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-primary-600">${{ formatPrice(calculatorResult.totalCostDisplay) }}</div>
                      <div class="text-sm text-gray-500">≈ ${{ formatPrice(calculatorResult.totalCostAlternate, true) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <!-- Success State - Create Order Button -->
            <NuxtLink 
              v-if="calculatorResult.canFit && calculatorResult.recommendedBox"
              :to="`/app/orders/create?box=${calculatorResult.recommendedBox.id}`"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              {{ t.createOrderWithBox }}
            </NuxtLink>
            
            <!-- Error State - WhatsApp Contact Button -->
            <a 
              v-if="!calculatorResult.canFit"
              :href="t.ctaFooterLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              {{ t.contactWhatsApp }}
            </a>
            
            <!-- Calculate Again Button (for both states) -->
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
import { ref, computed, onMounted, watch } from 'vue'

// Nuxt imports
const { $customFetch } = useNuxtApp()

// Use the language composable
const { t: createTranslations, language } = useLanguage()

// Exchange rate constant
const exchangeRate = 18

// State
const dimensions = ref({ length: 0, width: 0, height: 0 })
const weight = ref(0)
const declaredValue = ref(0)
const currentUnit = ref('cm')
const isRural = ref(false)
const availableBoxes = ref([])
const ruralSurcharge = ref(null)
const loadingProducts = ref(true)

const calculatorResult = ref({
  show: false,
  canFit: false,
  title: '',
  subtitle: '',
  recommendedBox: null,
  boxPrice: 0,
  boxPriceDisplay: 0,
  totalCost: 0,
  totalCostDisplay: 0,
  totalCostAlternate: 0,
  volumetricWeight: 0,
  chargeableWeight: 0
})

// Translations
const translations = {
  calculatorTitle: {
    es: 'Calculadora de Envío',
    en: 'Shipping Calculator'
  },
  calculatorSubtitle: {
    es: 'Ingresa los detalles de tu envío para obtener una cotización exacta',
    en: 'Enter your shipment details to get an exact quote'
  },
  loadingBoxes: {
    es: 'Cargando opciones de cajas...',
    en: 'Loading box options...'
  },
  step1Title: {
    es: '1. Dimensiones de la Caja',
    en: '1. Box Dimensions'
  },
  step2Title: {
    es: '2. Peso Total',
    en: '2. Total Weight'
  },
  step3Title: {
    es: '3. Valor Declarado',
    en: '3. Declared Value'
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
  declaredValueDescription: {
    es: 'Valor total de todos los productos para calcular el IVA (16%)',
    en: 'Total value of all products to calculate import tax (16%)'
  },
  ivaPreview: {
    es: 'IVA estimado (16%)',
    en: 'Estimated import tax (16%)'
  },
  ruralDelivery: {
    es: 'Entrega en zona rural',
    en: 'Rural area delivery'
  },
  ruralDescription: {
    es: 'Mi dirección está en una zona rural o de difícil acceso',
    en: 'My address is in a rural or hard-to-reach area'
  },
  calculateButton: {
    es: 'Calcular Envío',
    en: 'Calculate Shipping'
  },
  perfectFit: {
    es: '¡Perfecto! Tu envío cabe en:',
    en: 'Perfect! Your shipment fits in:'
  },
  doesNotFit: {
    es: 'Tu envío no cabe en nuestras cajas estándar',
    en: 'Your shipment does not fit in our standard boxes'
  },
  contactForQuote: {
    es: 'Contáctanos para una cotización personalizada',
    en: 'Contact us for a custom quote'
  },
  maxDimensions: {
    es: 'Dimensiones máximas',
    en: 'Maximum dimensions'
  },
  maxWeight: {
    es: 'Peso máximo',
    en: 'Maximum weight'
  },
  costBreakdown: {
    es: 'Desglose de costos',
    en: 'Cost breakdown'
  },
  ivaLabel: {
    es: 'IVA',
    en: 'Import Tax'
  },
  ruralSurcharge: {
    es: 'Cargo zona rural',
    en: 'Rural surcharge'
  },
  total: {
    es: 'Total',
    en: 'Total'
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
  createOrderWithBox: {
    es: 'Crear Envio con esta Caja',
    en: 'Create Order with this Box'
  },
  calculateAgain: {
    es: 'Calcular de Nuevo',
    en: 'Calculate Again'
  },
  ctaFooterLink: {
    es: 'https://wa.me/16195591910?text=Hola!%20Quiero%20mi%20cotizaci%C3%B3n%20personalizada%20ahora.',
    en: 'https://wa.me/16195591910?text=Hi!%20I%20want%20my%20custom%20quote%20now.'
  },
  contactWhatsApp: {
    es: 'Contactar por WhatsApp',
    en: 'Contact via WhatsApp'
  },
  // Product translations using EXACT names from API
  'Extra Small Box': {
    es: 'Caja Extra Pequeña',
    en: 'Extra Small Box'
  },
  'Small Box': {
    es: 'Caja Pequeña',
    en: 'Small Box'
  },
  'Medium Box': {
    es: 'Caja Mediana',
    en: 'Medium Box'
  },
  'Large Box': {
    es: 'Caja Grande',
    en: 'Large Box'
  },
  'Extra Large Box': {
    es: 'Caja Extra Grande',
    en: 'Extra Large Box'
  },

  // Add these product translations to your translations object
  extraSmallBoxName: {
    es: 'Caja Extra Pequeña',
    en: 'Extra Small Box'
  },
  extraSmallBoxDescription: {
    es: 'Ideal para: Joyería, Documentos importantes, Electrónicos u otros artículos valiosos compactos y ligeros.',
    en: 'Best for: Jewelry, Important documents, Electronics or other compact lightweight valuables.'
  },
  smallBoxName: {
    es: 'Caja Pequeña',
    en: 'Small Box'
  },
  smallBoxDescription: {
    es: 'Ideal para: Libros, Cosméticos, Electrónicos, Suplementos y otros accesorios pequeños.',
    en: 'Best for: Books, Cosmetics, Electronics, Supplements and other small accessories.'
  },
  mediumBoxName: {
    es: 'Caja Mediana',
    en: 'Medium Box'
  },
  mediumBoxDescription: {
    es: 'Ideal para: Ropa, Tenis, Bolsas de mano, Libros, Artículos o Equipo deportivo',
    en: 'Best for: Clothing, Sneakers, Handbags, Books, Sports Gear or Equipment'
  },
  largeBoxName: {
    es: 'Caja Grande',
    en: 'Large Box'
  },
  largeBoxDescription: {
    es: 'Ideal para: Compras al mayoreo, Electrodomésticos de cocina, Artículos de decoración o consolas de videojuegos y accesorios grandes.',
    en: 'Best for: Bulk purchases, Kitchen Appliances, Home Decor items, or gaming consoles or large accessories.'
  },
  extraLargeBoxName: {
    es: 'Caja Extra Grande',
    en: 'Extra Large Box'
  },
  extraLargeBoxDescription: {
    es: 'Ideal para: Muebles pequeños, Electrodomésticos grandes, Equipo de gimnasio o Pedidos consolidados grandes.',
    en: 'Best for: Small Furniture, Large Home Appliances, Gym Equipment or Large Consolidated orders.'
  },
}

// Get reactive translations
const t = createTranslations(translations)

// Computed
const canCalculate = computed(() => {
  return dimensions.value.length > 0 && 
         dimensions.value.width > 0 && 
         dimensions.value.height > 0 && 
         weight.value > 0 && 
         declaredValue.value > 0
})

const ivaAmountUSD = computed(() => {
  return declaredValue.value >= 50 ? declaredValue.value * 0.16 : 0
})

const ivaAmountMXN = computed(() => {
  return ivaAmountUSD.value * exchangeRate
})

// Display amounts based on language
const ivaDisplayAmount = computed(() => {
  return language.value === 'es' ? ivaAmountMXN.value : ivaAmountUSD.value
})

const ivaAlternateAmount = computed(() => {
  return language.value === 'es' ? ivaAmountUSD.value : ivaAmountMXN.value
})

// Methods
const formatPrice = (amount, isAlternate = false) => {
  const isSpanish = language.value === 'es'
  
  // Determine currency based on context
  let currency
  if (isAlternate) {
    currency = isSpanish ? 'USD' : 'MXN'
  } else {
    currency = isSpanish ? 'MXN' : 'USD'
  }
  
  return `${amount.toFixed(2)} ${currency}`
}

const getRuralSurchargeAmount = () => {
  if (!ruralSurcharge.value) return 0
  
  const isSpanish = language.value === 'es'
  const isMXN = ruralSurcharge.value.currency === 'MXN'
  
  if (isSpanish) {
    // Show in MXN for Spanish
    return isMXN ? ruralSurcharge.value.price : ruralSurcharge.value.price * exchangeRate
  } else {
    // Show in USD for English
    return isMXN ? ruralSurcharge.value.price / exchangeRate : ruralSurcharge.value.price
  }
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
    ruralSurcharge.value = response.rural_surcharge
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

  // Calculate volumetric weight using formula: (L × W × H) ÷ 5000
  const volumetricWeight = (lengthCm * widthCm * heightCm) / 5000
  const chargeableWeight = Math.max(weight.value, volumetricWeight)

  // Find suitable box - check if package dimensions fit within box dimensions
  const suitableBox = availableBoxes.value.find(box => {
    // Parse box dimensions (format: "42x27x32cm")
    const boxDims = box.dimensions.split('x').map(d => parseInt(d.replace('cm', '')))
    
    // Sort package dimensions to match with sorted box dimensions
    const packageDims = [lengthCm, widthCm, heightCm].sort((a, b) => b - a)
    const sortedBoxDims = boxDims.sort((a, b) => b - a)
    
    // Check if package fits (each dimension must be smaller than corresponding box dimension)
    const dimensionsFit = packageDims[0] <= sortedBoxDims[0] && 
                         packageDims[1] <= sortedBoxDims[1] && 
                         packageDims[2] <= sortedBoxDims[2]
    
    // Check weight limit
    const weightFits = chargeableWeight <= parseFloat(box.max_weight)
    
    return dimensionsFit && weightFits
  })

  if (suitableBox) {
    const isSpanish = language.value === 'es'
    
    // Box price is in MXN from the API
    const boxPriceMXN = suitableBox.price
    const boxPriceUSD = boxPriceMXN / exchangeRate
    
    // Rural fee - convert if needed
    const ruralFeeMXN = isRural.value && ruralSurcharge.value ? 
      (ruralSurcharge.value.currency === 'MXN' ? ruralSurcharge.value.price : ruralSurcharge.value.price * exchangeRate) : 0
    const ruralFeeUSD = ruralFeeMXN / exchangeRate
    
    // Calculate totals in both currencies
    const totalCostMXN = boxPriceMXN + ivaAmountMXN.value + ruralFeeMXN
    const totalCostUSD = boxPriceUSD + ivaAmountUSD.value + ruralFeeUSD

    calculatorResult.value = {
      show: true,
      canFit: true,
      title: t.value.perfectFit,
      subtitle: '',
      recommendedBox: suitableBox,
      boxPrice: boxPriceMXN,
      boxPriceDisplay: isSpanish ? boxPriceMXN : boxPriceUSD,
      totalCost: totalCostMXN,
      totalCostDisplay: isSpanish ? totalCostMXN : totalCostUSD,
      totalCostAlternate: isSpanish ? totalCostUSD : totalCostMXN,
      volumetricWeight: volumetricWeight,
      chargeableWeight: chargeableWeight
    }
  } else {
    calculatorResult.value = {
      show: true,
      canFit: false,
      title: t.value.doesNotFit,
      subtitle: t.value.contactForQuote,
      recommendedBox: null,
      boxPrice: 0,
      boxPriceDisplay: 0,
      totalCost: 0,
      totalCostDisplay: 0,
      totalCostAlternate: 0,
      volumetricWeight: volumetricWeight,
      chargeableWeight: chargeableWeight
    }
  }
}

const resetCalculator = () => {
  dimensions.value = { length: 0, width: 0, height: 0 }
  weight.value = 0
  declaredValue.value = 0
  isRural.value = false
  calculatorResult.value.show = false
}

// Lifecycle
onMounted(() => {
  fetchProducts()
})

// Watch for language changes and recalculate if results are showing
watch(language, () => {
  if (calculatorResult.value.show && canCalculate.value) {
    calculateShipping()
  }
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