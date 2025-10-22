<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div class="flex items-center gap-4">
            <NuxtLink 
              :to="`/app/admin/packages/${route.params.id}`" 
              class="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.editPackage }}</h1>
              <p class="text-sm text-gray-500 mt-1">{{ packageItem?.product_name || t.loading }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl">
            <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
  
        <!-- Edit Form -->
        <div v-else-if="packageItem" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fadeIn">
          <form @submit.prevent="handleUpdate" class="space-y-6">
            <!-- Product Information Section -->
            <div>
              <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                {{ t.productInformation }}
              </h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Product Name -->
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.productName }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.product_name"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="t.productNamePlaceholder"
                  >
                </div>
  
                <!-- Product URL -->
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.productUrl }}
                  </label>
                  <input
                    v-model="form.product_url"
                    type="url"
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="t.productUrlPlaceholder"
                  >
                </div>
  
                <!-- Retailer -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.retailer }}
                  </label>
                  <input
                    v-model="form.retailer"
                    type="text"
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="t.retailerPlaceholder"
                  >
                </div>
  
                <!-- Quantity -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.quantity }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="form.quantity"
                    type="number"
                    min="1"
                    max="999"
                    required
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="t.quantityPlaceholder"
                  >
                </div>
  
                <!-- Declared Value -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.declaredValue }}
                  </label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      v-model.number="form.declared_value"
                      type="number"
                      step="0.01"
                      min="0"
                      max="99999.99"
                      class="w-full pl-8 pr-12 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      :placeholder="t.declaredValuePlaceholder"
                    >
                    <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">USD</span>
                  </div>
                  <p class="mt-1 text-xs text-gray-500">{{ t.declaredValueHint }}</p>
                </div>
              </div>
            </div>
  
            <!-- Tracking Information Section -->
            <div>
              <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
                {{ t.trackingInformation }}
              </h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Tracking Number -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.trackingNumber }}
                  </label>
                  <input
                    v-model="form.tracking_number"
                    type="text"
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="t.trackingNumberPlaceholder"
                  >
                </div>
  
                <!-- Carrier -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.carrier }}
                  </label>
                  <select
                    v-model="form.carrier"
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">{{ t.selectCarrier }}</option>
                    <option value="ups">UPS</option>
                    <option value="fedex">FedEx</option>
                    <option value="usps">USPS</option>
                    <option value="amazon">Amazon</option>
                    <option value="dhl">DHL</option>
                    <option value="estafeta">Estafeta</option>
                    <option value="lasership">LaserShip</option>
                    <option value="other">{{ t.other }}</option>
                  </select>
                </div>
  
                <!-- Tracking URL -->
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.trackingUrl }}
                  </label>
                  <input
                    v-model="form.tracking_url"
                    type="url"
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="t.trackingUrlPlaceholder"
                  >
                </div>
              </div>
            </div>
  
            <!-- Physical Details Section -->
            <div>
              <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                </svg>
                {{ t.physicalDetails }}
              </h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Arrived Status -->
                <div class="sm:col-span-2">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      v-model="form.arrived"
                      type="checkbox"
                      class="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    >
                    <span class="text-sm font-medium text-gray-700">{{ t.packageArrived }}</span>
                  </label>
                  <p class="mt-1 ml-8 text-xs text-gray-500">{{ t.packageArrivedHint }}</p>
                </div>
  
                <!-- Weight -->
                <div v-if="form.arrived">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.weight }}
                  </label>
                  <div class="relative">
                    <input
                      v-model.number="form.weight"
                      type="number"
                      step="0.01"
                      min="0.01"
                      max="999.99"
                      class="w-full pr-12 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      :placeholder="t.weightPlaceholder"
                    >
                    <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">kg</span>
                  </div>
                </div>
  
                <!-- Dimensions -->
                <div v-if="form.arrived">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.dimensions }}
                  </label>
                  <div class="grid grid-cols-3 gap-2">
                    <input
                      v-model.number="form.dimensions.length"
                      type="number"
                      step="1"
                      min="1"
                      max="999"
                      class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="L"
                    >
                    <input
                      v-model.number="form.dimensions.width"
                      type="number"
                      step="1"
                      min="1"
                      max="999"
                      class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="W"
                    >
                    <input
                      v-model.number="form.dimensions.height"
                      type="number"
                      step="1"
                      min="1"
                      max="999"
                      class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="H"
                    >
                  </div>
                  <p class="mt-1 text-xs text-gray-500">{{ t.dimensionsHint }}</p>
                </div>
              </div>
            </div>
  
            <!-- Warning Message -->
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <div>
                  <p class="text-sm font-medium text-amber-900">{{ t.updateWarning }}</p>
                  <p class="text-sm text-amber-700 mt-1">{{ t.updateWarningDesc }}</p>
                </div>
              </div>
            </div>
  
            <!-- Form Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                :disabled="saving"
                class="flex-1 px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!saving">{{ t.saveChanges }}</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ t.saving }}
                </span>
              </button>
              <NuxtLink
                :to="`/app/admin/packages/${route.params.id}`"
                class="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all text-center"
              >
                {{ t.cancel }}
              </NuxtLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // Define page meta
  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin']
  })
  
  // Nuxt imports
  const { $customFetch, $toast } = useNuxtApp()
  const route = useRoute()
  const router = useRouter()
  
  // Use language composable
  const { t: createTranslations } = useLanguage()
  
  // State
  const packageItem = ref(null)
  const loading = ref(true)
  const saving = ref(false)
  
  const form = ref({
    product_name: '',
    product_url: '',
    retailer: '',
    quantity: 1,
    declared_value: null,
    tracking_number: '',
    carrier: '',
    tracking_url: '',
    arrived: false,
    weight: null,
    dimensions: {
      length: null,
      width: null,
      height: null
    }
  })
  
  // Translations
  const translations = {
    editPackage: {
      es: 'Editar Paquete',
      en: 'Edit Package'
    },
    loading: {
      es: 'Cargando...',
      en: 'Loading...'
    },
    productInformation: {
      es: 'Información del Producto',
      en: 'Product Information'
    },
    productName: {
      es: 'Nombre del Producto',
      en: 'Product Name'
    },
    productNamePlaceholder: {
      es: 'Ej: Laptop Dell XPS 13',
      en: 'Ex: Dell XPS 13 Laptop'
    },
    productUrl: {
      es: 'URL del Producto',
      en: 'Product URL'
    },
    productUrlPlaceholder: {
      es: 'https://www.ejemplo.com/producto',
      en: 'https://www.example.com/product'
    },
    retailer: {
      es: 'Tienda',
      en: 'Retailer'
    },
    retailerPlaceholder: {
      es: 'Ej: Amazon, Best Buy',
      en: 'Ex: Amazon, Best Buy'
    },
    quantity: {
      es: 'Cantidad',
      en: 'Quantity'
    },
    quantityPlaceholder: {
      es: '1',
      en: '1'
    },
    declaredValue: {
      es: 'Valor Declarado',
      en: 'Declared Value'
    },
    declaredValuePlaceholder: {
      es: '0.00',
      en: '0.00'
    },
    declaredValueHint: {
      es: 'Precio pagado por unidad en USD. Usado para calcular el IVA.',
      en: 'Price paid per unit in USD. Used to calculate VAT.'
    },
    trackingInformation: {
      es: 'Información de Rastreo',
      en: 'Tracking Information'
    },
    trackingNumber: {
      es: 'Número de Rastreo',
      en: 'Tracking Number'
    },
    trackingNumberPlaceholder: {
      es: '1Z999AA10123456784',
      en: '1Z999AA10123456784'
    },
    carrier: {
      es: 'Transportista',
      en: 'Carrier'
    },
    selectCarrier: {
      es: 'Seleccionar transportista',
      en: 'Select carrier'
    },
    other: {
      es: 'Otro',
      en: 'Other'
    },
    trackingUrl: {
      es: 'URL de Rastreo',
      en: 'Tracking URL'
    },
    trackingUrlPlaceholder: {
      es: 'https://www.ups.com/track?...',
      en: 'https://www.ups.com/track?...'
    },
    physicalDetails: {
      es: 'Detalles Físicos',
      en: 'Physical Details'
    },
    packageArrived: {
      es: 'El paquete ha llegado',
      en: 'Package has arrived'
    },
    packageArrivedHint: {
      es: 'Marca esta casilla cuando el paquete llegue a nuestro almacén',
      en: 'Check this when the package arrives at our warehouse'
    },
    weight: {
      es: 'Peso',
      en: 'Weight'
    },
    weightPlaceholder: {
      es: '1.5',
      en: '1.5'
    },
    dimensions: {
      es: 'Dimensiones (cm)',
      en: 'Dimensions (cm)'
    },
    dimensionsHint: {
      es: 'Largo x Ancho x Alto en centímetros',
      en: 'Length x Width x Height in centimeters'
    },
    updateWarning: {
      es: 'Cambios Importantes',
      en: 'Important Changes'
    },
    updateWarningDesc: {
      es: 'Los cambios en el valor declarado recalcularán el IVA total de la orden.',
      en: 'Changes to declared value will recalculate the total VAT for the order.'
    },
    saveChanges: {
      es: 'Guardar Cambios',
      en: 'Save Changes'
    },
    saving: {
      es: 'Guardando...',
      en: 'Saving...'
    },
    cancel: {
      es: 'Cancelar',
      en: 'Cancel'
    },
    successMessage: {
      es: 'Paquete actualizado exitosamente',
      en: 'Package updated successfully'
    },
    errorMessage: {
      es: 'Error al actualizar el paquete',
      en: 'Error updating package'
    }
  }
  
  const t = createTranslations(translations)
  
  // Methods
  const fetchPackage = async () => {
    loading.value = true
    try {
      const response = await $customFetch(`/admin/packages/${route.params.id}`)
      packageItem.value = response.data
      
      // Populate form with package data
      form.value = {
        product_name: packageItem.value.product_name || '',
        product_url: packageItem.value.product_url || '',
        retailer: packageItem.value.retailer || '',
        quantity: packageItem.value.quantity || 1,
        declared_value: packageItem.value.declared_value || null,
        tracking_number: packageItem.value.tracking_number || '',
        carrier: packageItem.value.carrier || '',
        tracking_url: packageItem.value.tracking_url || '',
        arrived: packageItem.value.arrived || false,
        weight: packageItem.value.weight || null,
        dimensions: packageItem.value.dimensions || {
          length: null,
          width: null,
          height: null
        }
      }
    } catch (error) {
      console.error('Error fetching package:', error)
      $toast.error('Error loading package details')
      await router.push('/app/admin/packages')
    } finally {
      loading.value = false
    }
  }
  
  const handleUpdate = async () => {
    saving.value = true
    try {
      // Prepare data for submission
      const updateData = {
        product_name: form.value.product_name,
        product_url: form.value.product_url || null,
        retailer: form.value.retailer || null,
        quantity: form.value.quantity,
        declared_value: form.value.declared_value || null,
        tracking_number: form.value.tracking_number || null,
        carrier: form.value.carrier || null,
        tracking_url: form.value.tracking_url || null,
        arrived: form.value.arrived
      }
  
      // Only include weight if arrived is true
      if (form.value.arrived && form.value.weight) {
        updateData.weight = form.value.weight
      }
  
      // Only include dimensions if all values are provided
      if (form.value.arrived && 
          form.value.dimensions.length && 
          form.value.dimensions.width && 
          form.value.dimensions.height) {
        updateData.dimensions = form.value.dimensions
      }
  
      await $customFetch(`/admin/packages/${route.params.id}`, {
        method: 'PUT',
        body: updateData
      })
  
      $toast.success(t.value.successMessage)
      await router.push(`/app/admin/packages/${route.params.id}`)
    } catch (error) {
      console.error('Error updating package:', error)
      $toast.error(t.value.errorMessage)
    } finally {
      saving.value = false
    }
  }
  
  // Fetch data on mount
  onMounted(() => {
    fetchPackage()
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