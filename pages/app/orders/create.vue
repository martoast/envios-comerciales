<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <NuxtLink 
                to="/app/orders" 
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
              </NuxtLink>
              <div>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.createOrder }}</h1>
                <p class="text-sm text-gray-600 mt-1">{{ t.createOrderSubtitle }}</p>
              </div>
            </div>
            
            <!-- Step indicator desktop -->
            <div class="hidden sm:flex items-center gap-2">
              <div 
                v-for="i in 2" 
                :key="i"
                :class="[
                  'w-2 h-2 rounded-full transition-all duration-300',
                  currentStep >= i ? 'bg-primary-500 w-8' : 'bg-gray-300'
                ]"
              ></div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <!-- Progress bar mobile -->
        <div class="sm:hidden mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">{{ t.step }} {{ currentStep }} {{ t.of }} 2</span>
            <span class="text-sm text-gray-500">{{ currentStep === 1 ? t.orderDetails : t.deliveryAddress }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-primary-500 h-2 rounded-full transition-all duration-300"
              :style="`width: ${currentStep * 50}%`"
            ></div>
          </div>
        </div>
  
        <!-- Error Alert -->
        <Transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="errorMessage" class="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm animate-shake">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
              </div>
              <button @click="errorMessage = ''" class="ml-3 flex-shrink-0">
                <svg class="w-5 h-5 text-red-400 hover:text-red-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </Transition>
  
        <!-- Form Steps -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Step 1: Order Details -->
          <div v-show="currentStep === 1" class="animate-fadeIn">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t.orderDetails }}</h2>
              
              <!-- Order Name -->
              <div class="mb-6">
                <label for="order_name" class="block text-sm font-semibold text-gray-900 mb-2">
                  {{ t.orderNameLabel }}
                </label>
                <input
                  v-model="form.order_name"
                  type="text"
                  id="order_name"
                  :placeholder="t.orderNamePlaceholder"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                >
                <p class="mt-2 text-sm text-gray-500">{{ t.orderNameHint }}</p>
              </div>
  
              <!-- Info Cards -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div class="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div class="flex items-start gap-3">
                    <div class="p-2 bg-blue-100 rounded-lg">
                      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-blue-900 mb-1">{{ t.howItWorksTitle }}</h3>
                      <p class="text-sm text-blue-700">{{ t.howItWorksText }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div class="flex items-start gap-3">
                    <div class="p-2 bg-green-100 rounded-lg">
                      <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-green-900 mb-1">{{ t.freeServiceTitle }}</h3>
                      <p class="text-sm text-green-700">{{ t.freeServiceText }}</p>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- PO Box Reminder -->
              <div class="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-xl p-4 border border-primary-200/50">
                <div class="flex items-start gap-3">
                  <div class="p-2 bg-primary-100 rounded-lg">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-primary-900 mb-1">{{ t.useThisAddress }}</h3>
                    <div class="text-sm text-primary-700 space-y-1">
                      <p class="font-medium">{{ user?.name }}</p>
                      <p>{{ poBoxAddress.line1 }}</p>
                      <p>{{ poBoxAddress.line2 }}</p>
                      <p>{{ poBoxAddress.line3 }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Navigation -->
            <div class="flex justify-end mt-6">
              <button
                type="button"
                @click="nextStep"
                :disabled="!form.order_name"
                class="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {{ t.continue }}
                <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>
  
          <!-- Step 2: Delivery Address -->
          <div v-show="currentStep === 2" class="animate-fadeIn">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t.deliveryAddressTitle }}</h2>
              
              <!-- Address Form -->
              <div class="space-y-4">
                <!-- Street -->
                <div>
                  <label for="street" class="block text-sm font-semibold text-gray-900 mb-2">
                    {{ t.streetLabel }}
                  </label>
                  <input
                    v-model="form.delivery_address.street"
                    type="text"
                    id="street"
                    :placeholder="t.streetPlaceholder"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                </div>
  
                <!-- Numbers -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="exterior_number" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.exteriorNumberLabel }}
                    </label>
                    <input
                      v-model="form.delivery_address.exterior_number"
                      type="text"
                      id="exterior_number"
                      :placeholder="t.exteriorNumberPlaceholder"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                  </div>
                  <div>
                    <label for="interior_number" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.interiorNumberLabel }}
                    </label>
                    <input
                      v-model="form.delivery_address.interior_number"
                      type="text"
                      id="interior_number"
                      :placeholder="t.interiorNumberPlaceholder"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                  </div>
                </div>
  
                <!-- Colonia and Municipio -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="colonia" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.coloniaLabel }}
                    </label>
                    <input
                      v-model="form.delivery_address.colonia"
                      type="text"
                      id="colonia"
                      :placeholder="t.coloniaPlaceholder"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                  </div>
                  <div>
                    <label for="municipio" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.municipioLabel }}
                    </label>
                    <input
                      v-model="form.delivery_address.municipio"
                      type="text"
                      id="municipio"
                      :placeholder="t.municipioPlaceholder"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                  </div>
                </div>
  
                <!-- Estado and Postal Code -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="estado" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.estadoLabel }}
                    </label>
                    <select
                      v-model="form.delivery_address.estado"
                      id="estado"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">{{ t.selectEstado }}</option>
                      <option v-for="estado in mexicanStates" :key="estado" :value="estado">
                        {{ estado }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="postal_code" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.postalCodeLabel }}
                    </label>
                    <input
                      v-model="form.delivery_address.postal_code"
                      type="text"
                      id="postal_code"
                      :placeholder="t.postalCodePlaceholder"
                      maxlength="5"
                      pattern="[0-9]{5}"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                  </div>
                </div>
  
                <!-- Referencias -->
                <div>
                  <label for="referencias" class="block text-sm font-semibold text-gray-900 mb-2">
                    {{ t.referenciasLabel }}
                  </label>
                  <textarea
                    v-model="form.delivery_address.referencias"
                    id="referencias"
                    rows="3"
                    :placeholder="t.referenciasPlaceholder"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                  ></textarea>
                </div>
  
                <!-- Rural Checkbox -->
                <div class="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <label class="flex items-start gap-3 cursor-pointer">
                    <input
                      v-model="form.is_rural"
                      type="checkbox"
                      class="mt-1 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    >
                    <div class="flex-1">
                      <span class="text-sm font-semibold text-gray-900">{{ t.ruralAreaLabel }}</span>
                      <p class="text-sm text-gray-600 mt-1">{{ t.ruralAreaDescription }}</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
  
            <!-- Navigation -->
            <div class="flex justify-between mt-6">
              <button
                type="button"
                @click="previousStep"
                class="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-300"
              >
                <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
                </svg>
                {{ t.back }}
              </button>
              
              <button
                type="submit"
                :disabled="loading || !isFormValid"
                class="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span v-if="!loading">{{ t.createOrderButton }}</span>
                <span v-else>{{ t.creatingOrder }}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Define page meta
  definePageMeta({
    layout: 'app',
    middleware: ['auth', 'customer']
  })
  
  // Nuxt imports
  const { $customFetch } = useNuxtApp()
  const { $toast } = useNuxtApp()

  const user = useUser().value
  
  // Use the language composable
  const { t: createTranslations } = useLanguage()
  
  // State
  const currentStep = ref(1)
  const loading = ref(false)
  const errorMessage = ref('')
  
  // Form data
  const form = ref({
    order_name: '',
    delivery_address: {
      street: '',
      exterior_number: '',
      interior_number: '',
      colonia: '',
      municipio: '',
      estado: '',
      postal_code: '',
      referencias: ''
    },
    is_rural: false
  })
  
  // PO Box Address
  const poBoxAddress = computed(() => ({
    line1: `PC-${user?.id || 'XXXX'}`,
    line2: '1234 E Aviation Blvd, Suite 200',
    line3: 'El Segundo, CA 90245, USA'
  }))
  
  // Mexican states
  const mexicanStates = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
    'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Guanajuato',
    'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit',
    'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
    'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ]
  
  // Translations
  const translations = {
    createOrder: {
      es: 'Crear Nueva Orden',
      en: 'Create New Order'
    },
    createOrderSubtitle: {
      es: 'Configura tu orden de consolidación',
      en: 'Set up your consolidation order'
    },
    step: {
      es: 'Paso',
      en: 'Step'
    },
    of: {
      es: 'de',
      en: 'of'
    },
    orderDetails: {
      es: 'Detalles de la Orden',
      en: 'Order Details'
    },
    deliveryAddress: {
      es: 'Dirección de Entrega',
      en: 'Delivery Address'
    },
    orderNameLabel: {
      es: 'Nombre de la Orden',
      en: 'Order Name'
    },
    orderNamePlaceholder: {
      es: 'Ej: Compras de Navidad',
      en: 'Ex: Christmas Shopping'
    },
    orderNameHint: {
      es: 'Dale un nombre descriptivo a tu orden para identificarla fácilmente',
      en: 'Give your order a descriptive name to easily identify it'
    },
    howItWorksTitle: {
      es: '¿Qué sigue después?',
      en: 'What happens next?'
    },
    howItWorksText: {
      es: 'Compra en tus tiendas favoritas de USA usando tu dirección USA. Cuando lleguen tus paquetes, los consolidamos y te los enviamos a Mexico.',
      en: 'Shop your favorite US stores using your provided USA address. When your packages arrive, we consolidate them into one box and ship them to you.'
    },
    freeServiceTitle: {
      es: 'Solo Pagas el Envío',
      en: 'You Only Pay Shipping'
    },
    freeServiceText: {
      es: 'Crear órdenes es gratis. Pagas únicamente cuando tus paquetes estén listos para enviar a México (3-5 días hábiles con rastreo completo).',
      en: 'Creating orders is free. You only pay when your packages are ready to ship to Mexico (3-5 business days with full tracking).'
    },
    useThisAddress: {
      es: 'Usa esta dirección en tus compras:',
      en: 'Use this address for your purchases:'
    },
    continue: {
      es: 'Continuar',
      en: 'Continue'
    },
    back: {
      es: 'Atrás',
      en: 'Back'
    },
    deliveryAddressTitle: {
      es: 'Dirección de Entrega en México',
      en: 'Delivery Address in Mexico'
    },
    streetLabel: {
      es: 'Calle',
      en: 'Street'
    },
    streetPlaceholder: {
      es: 'Nombre de la calle',
      en: 'Street name'
    },
    exteriorNumberLabel: {
      es: 'Número Exterior',
      en: 'Exterior Number'
    },
    exteriorNumberPlaceholder: {
      es: '123',
      en: '123'
    },
    interiorNumberLabel: {
      es: 'Número Interior',
      en: 'Interior Number'
    },
    interiorNumberPlaceholder: {
      es: 'Opcional',
      en: 'Optional'
    },
    coloniaLabel: {
      es: 'Colonia',
      en: 'Neighborhood'
    },
    coloniaPlaceholder: {
      es: 'Nombre de la colonia',
      en: 'Neighborhood name'
    },
    municipioLabel: {
      es: 'Municipio/Delegación',
      en: 'Municipality'
    },
    municipioPlaceholder: {
      es: 'Municipio o delegación',
      en: 'Municipality'
    },
    estadoLabel: {
      es: 'Estado',
      en: 'State'
    },
    selectEstado: {
      es: 'Selecciona un estado',
      en: 'Select a state'
    },
    postalCodeLabel: {
      es: 'Código Postal',
      en: 'Postal Code'
    },
    postalCodePlaceholder: {
      es: '12345',
      en: '12345'
    },
    referenciasLabel: {
      es: 'Referencias',
      en: 'References'
    },
    referenciasPlaceholder: {
      es: 'Entre calles, puntos de referencia, color de la casa, etc.',
      en: 'Between streets, landmarks, house color, etc.'
    },
    ruralAreaLabel: {
      es: 'Zona Rural',
      en: 'Rural Area'
    },
    ruralAreaDescription: {
      es: 'Marca esta casilla si tu dirección está en una zona rural. Puede aplicar un cargo adicional.',
      en: 'Check this box if your address is in a rural area. Additional charges may apply.'
    },
    createOrderButton: {
      es: 'Crear Orden',
      en: 'Create Order'
    },
    creatingOrder: {
      es: 'Creando orden...',
      en: 'Creating order...'
    },
    orderCreatedSuccess: {
      es: '¡Orden creada exitosamente!',
      en: 'Order created successfully!'
    },
    orderCreatedSuccessWithNumber: {
      es: '¡Orden {orderNumber} creada exitosamente!',
      en: 'Order {orderNumber} created successfully!'
    },
    viewOrder: {
      es: 'Ver orden',
      en: 'View order'
    },
    retry: {
      es: 'Reintentar',
      en: 'Retry'
    },
    generalError: {
      es: 'Ocurrió un error. Por favor, intenta de nuevo.',
      en: 'An error occurred. Please try again.'
    }
  }
  
  // Get reactive translations
  const t = createTranslations(translations)
  
  // Computed
  const isFormValid = computed(() => {
    if (currentStep.value === 1) {
      return form.value.order_name.trim() !== ''
    }
    
    const addr = form.value.delivery_address
    return addr.street && addr.exterior_number && addr.colonia && 
           addr.municipio && addr.estado && addr.postal_code && 
           /^\d{5}$/.test(addr.postal_code)
  })
  
  // Methods
  const nextStep = () => {
    if (currentStep.value < 2) {
      currentStep.value++
    }
  }
  
  const previousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }
  
  const handleSubmit = async () => {
    if (!isFormValid.value) return
  
    loading.value = true
    errorMessage.value = ''
  
    try {
      const response = await $customFetch('/orders', {
        method: 'POST',
        body: form.value
      })
  
      if (response.success) {
        // Show success toast with order number
        $toast.success(
          t.value.orderCreatedSuccessWithNumber.replace('{orderNumber}', response.data.order_number),
          {
            duration: 5000,
            action: {
              label: t.value.viewOrder,
              callback: () => navigateTo(`/app/orders/${response.data.id}`)
            }
          }
        )
        
        // Redirect to order detail page after a short delay
        setTimeout(() => {
          navigateTo(`/app/orders/${response.data.id}`)
        }, 1500)
      }
    } catch (error) {
      console.error('Error creating order:', error)
      
      // Show error toast
      const errorMsg = error.data?.message || t.value.generalError
      $toast.error(errorMsg, {
        duration: 6000,
        action: {
          label: t.value.retry,
          callback: () => handleSubmit()
        }
      })
      
      // Also show inline error for visibility
      errorMessage.value = errorMsg
    } finally {
      loading.value = false
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
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out;
  }
  
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
  </style>