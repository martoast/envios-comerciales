<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div class="flex items-center gap-3 sm:gap-4">
            <NuxtLink 
              to="/app/admin/orders" 
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{{ t.createNewOrder }}</h1>
              <p class="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{{ t.createOrderSubtitle }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <!-- Error Alert -->
        <Transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="errorMessage" class="mb-4 sm:mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-3 sm:p-4 shadow-sm">
            <div class="flex">
              <svg class="w-5 h-5 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              <p class="ml-3 text-sm font-medium text-red-800 flex-1">{{ errorMessage }}</p>
              <button @click="errorMessage = ''" class="ml-3 flex-shrink-0">
                <svg class="w-5 h-5 text-red-400 hover:text-red-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </Transition>
  
        <!-- Create Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
          <!-- Customer Selection Card -->
          <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{{ t.selectCustomer }}</h2>
            
            <!-- Customer Search -->
            <div class="relative">
              <label for="user_search" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.customerLabel }} <span class="text-red-500">*</span>
              </label>
              
              <div class="relative">
                <input
                  v-model="userSearch"
                  @focus="showUserDropdown = true"
                  @input="filterUsers"
                  type="text"
                  id="user_search"
                  class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  :placeholder="selectedUser ? selectedUser.name + ' - ' + selectedUser.email : t.searchUserPlaceholder"
                >
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
              
              <!-- Dropdown -->
              <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div v-if="showUserDropdown && filteredUsers.length > 0" class="absolute z-20 mt-1 w-full bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 max-h-48 sm:max-h-60 overflow-auto">
                  <div
                    v-for="user in filteredUsers"
                    :key="user.id"
                    @click="selectUser(user)"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                  >
                    <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{{ user.email }} • {{ user.phone || t.noPhone }}</p>
                  </div>
                </div>
              </Transition>
            </div>
            
            <!-- Selected User Display -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div v-if="selectedUser" class="mt-3 p-3 bg-primary-50 rounded-lg border border-primary-200">
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-primary-900 truncate">{{ selectedUser.name }}</p>
                    <p class="text-xs text-primary-700 truncate">{{ selectedUser.email }}</p>
                    <p v-if="selectedUser.phone" class="text-xs text-primary-700">{{ selectedUser.phone }}</p>
                  </div>
                  <button
                    type="button"
                    @click="clearUserSelection"
                    class="ml-2 p-1 text-primary-600 hover:text-primary-700 hover:bg-primary-100 rounded transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </Transition>
          </div>
  
          <!-- Delivery Address Card -->
          <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
            <div class="flex items-center justify-between mb-4 sm:mb-6">
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">{{ t.deliveryAddressTitle }}</h2>
              
              <!-- Copy from User Button -->
              <button
                v-if="selectedUser && selectedUser.street"
                type="button"
                @click="copyUserAddress"
                class="inline-flex items-center px-2.5 sm:px-3 py-1.5 bg-primary-50 text-primary-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-primary-100 transition-colors"
              >
                <svg class="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <span class="hidden sm:inline">{{ t.copyFromUser }}</span>
                <span class="sm:hidden">{{ t.copy }}</span>
              </button>
            </div>
            
            <div class="space-y-3 sm:space-y-4">
              <!-- Street -->
              <div>
                <label for="street" class="block text-sm font-medium text-gray-700 mb-1.5">
                  {{ t.streetLabel }} <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.delivery_address.street"
                  type="text"
                  id="street"
                  :placeholder="t.streetPlaceholder"
                  class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>
  
              <!-- Numbers Grid -->
              <div class="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label for="exterior_number" class="block text-sm font-medium text-gray-700 mb-1.5">
                    {{ t.exteriorNumberLabel }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.delivery_address.exterior_number"
                    type="text"
                    id="exterior_number"
                    :placeholder="t.exteriorNumberPlaceholder"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                </div>
                <div>
                  <label for="interior_number" class="block text-sm font-medium text-gray-700 mb-1.5">
                    {{ t.interiorNumberLabel }}
                  </label>
                  <input
                    v-model="form.delivery_address.interior_number"
                    type="text"
                    id="interior_number"
                    :placeholder="t.interiorNumberPlaceholder"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                </div>
              </div>
  
              <!-- Colonia and Municipio -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label for="colonia" class="block text-sm font-medium text-gray-700 mb-1.5">
                    {{ t.coloniaLabel }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.delivery_address.colonia"
                    type="text"
                    id="colonia"
                    :placeholder="t.coloniaPlaceholder"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                </div>
                <div>
                  <label for="municipio" class="block text-sm font-medium text-gray-700 mb-1.5">
                    {{ t.municipioLabel }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.delivery_address.municipio"
                    type="text"
                    id="municipio"
                    :placeholder="t.municipioPlaceholder"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                </div>
              </div>
  
              <!-- Estado and Postal Code -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label for="estado" class="block text-sm font-medium text-gray-700 mb-1.5">
                    {{ t.estadoLabel }} <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.delivery_address.estado"
                    id="estado"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">{{ t.selectEstado }}</option>
                    <option v-for="estado in mexicanStates" :key="estado" :value="estado">
                      {{ estado }}
                    </option>
                  </select>
                </div>
                <div>
                  <label for="postal_code" class="block text-sm font-medium text-gray-700 mb-1.5">
                    {{ t.postalCodeLabel }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.delivery_address.postal_code"
                    type="text"
                    id="postal_code"
                    :placeholder="t.postalCodePlaceholder"
                    maxlength="5"
                    pattern="[0-9]{5}"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                </div>
              </div>
  
              <!-- Referencias -->
              <div>
                <label for="referencias" class="block text-sm font-medium text-gray-700 mb-1.5">
                  {{ t.referenciasLabel }}
                </label>
                <textarea
                  v-model="form.delivery_address.referencias"
                  id="referencias"
                  rows="3"
                  :placeholder="t.referenciasPlaceholder"
                  class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                ></textarea>
              </div>
  
              <!-- Rural Checkbox -->
              <div class="bg-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-amber-200">
                <label class="flex items-start gap-3 cursor-pointer">
                  <input
                    v-model="form.is_rural"
                    type="checkbox"
                    class="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  >
                  <div class="flex-1">
                    <span class="text-sm font-medium text-gray-900">{{ t.ruralAreaLabel }}</span>
                    <p class="text-xs sm:text-sm text-gray-600 mt-0.5">{{ t.ruralAreaDescription }}</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
  
          <!-- Action Buttons -->
          <div class="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between pt-2">
            <NuxtLink
              to="/app/admin/orders"
              class="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-700 font-medium rounded-lg sm:rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200 text-center text-sm sm:text-base"
            >
              {{ t.cancel }}
            </NuxtLink>
            
            <button
              type="submit"
              :disabled="creating || !selectedUser"
              class="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:from-primary-600 hover:to-primary-700 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <svg v-if="creating" class="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="!creating">{{ t.createOrder }}</span>
              <span v-else>{{ t.creating }}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  
  // Define page meta
  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin']
  })
  
  // Nuxt imports
  const { $customFetch, $toast } = useNuxtApp()
  const router = useRouter()
  
  // Use language composable
  const { t: createTranslations } = useLanguage()
  
  // State
  const creating = ref(false)
  const errorMessage = ref('')
  const users = ref([])
  const selectedUser = ref(null)
  const userSearch = ref('')
  const showUserDropdown = ref(false)
  const loadingUsers = ref(false)
  
  // Form data - status automatically set to 'collecting'
  const form = ref({
    user_id: null,
    status: 'collecting', // Automatically set to first status
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
    createNewOrder: {
      es: 'Crear Nueva Orden',
      en: 'Create New Order'
    },
    createOrderSubtitle: {
      es: 'Selecciona el cliente y configura la dirección de entrega',
      en: 'Select customer and configure delivery address'
    },
    selectCustomer: {
      es: 'Cliente',
      en: 'Customer'
    },
    customerLabel: {
      es: 'Buscar Cliente',
      en: 'Search Customer'
    },
    searchUserPlaceholder: {
      es: 'Buscar por nombre o email...',
      en: 'Search by name or email...'
    },
    noPhone: {
      es: 'Sin teléfono',
      en: 'No phone'
    },
    copyFromUser: {
      es: 'Copiar Dirección',
      en: 'Copy Address'
    },
    copy: {
      es: 'Copiar',
      en: 'Copy'
    },
    deliveryAddressTitle: {
      es: 'Dirección de Entrega',
      en: 'Delivery Address'
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
      es: 'Marca si la dirección está en una zona rural',
      en: 'Check if the address is in a rural area'
    },
    cancel: {
      es: 'Cancelar',
      en: 'Cancel'
    },
    createOrder: {
      es: 'Crear Orden',
      en: 'Create Order'
    },
    creating: {
      es: 'Creando...',
      en: 'Creating...'
    },
    orderCreatedSuccess: {
      es: 'Orden creada exitosamente',
      en: 'Order created successfully'
    },
    generalError: {
      es: 'Ocurrió un error. Por favor, intenta de nuevo.',
      en: 'An error occurred. Please try again.'
    },
    selectCustomerError: {
      es: 'Por favor selecciona un cliente',
      en: 'Please select a customer'
    },
    addressCopied: {
      es: 'Dirección copiada del cliente',
      en: 'Address copied from customer'
    }
  }
  
  // Get reactive translations
  const t = createTranslations(translations)
  
  // Computed
  const filteredUsers = computed(() => {
    if (!userSearch.value) return users.value.slice(0, 10)
    
    const search = userSearch.value.toLowerCase()
    return users.value
      .filter(user => 
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      )
      .slice(0, 10)
  })
  
  // Methods
  const fetchUsers = async () => {
    loadingUsers.value = true
    try {
      const response = await $customFetch('/admin/customers?limit=100')
      if (response.success && response.data) {
        users.value = response.data.data || response.data
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      $toast.error('Error loading customers')
    } finally {
      loadingUsers.value = false
    }
  }
  
  const filterUsers = () => {
    showUserDropdown.value = true
  }
  
  const selectUser = (user) => {
    selectedUser.value = user
    form.value.user_id = user.id
    userSearch.value = ''
    showUserDropdown.value = false
  }
  
  const clearUserSelection = () => {
    selectedUser.value = null
    form.value.user_id = null
    userSearch.value = ''
  }
  
  const copyUserAddress = () => {
    if (!selectedUser.value) return
    
    form.value.delivery_address = {
      street: selectedUser.value.street || '',
      exterior_number: selectedUser.value.exterior_number || '',
      interior_number: selectedUser.value.interior_number || '',
      colonia: selectedUser.value.colonia || '',
      municipio: selectedUser.value.municipio || '',
      estado: selectedUser.value.estado || '',
      postal_code: selectedUser.value.postal_code || '',
      referencias: ''
    }
    
    $toast.success(t.value.addressCopied)
  }
  
  const handleSubmit = async () => {
    if (!selectedUser.value) {
      errorMessage.value = t.value.selectCustomerError
      return
    }
  
    creating.value = true
    errorMessage.value = ''
  
    try {
      const response = await $customFetch('/admin/management/orders', {
        method: 'POST',
        body: {
          user_id: form.value.user_id,
          status: form.value.status,
          delivery_address: form.value.delivery_address,
          is_rural: form.value.is_rural
        }
      })
  
      if (response.success) {
        $toast.success(t.value.orderCreatedSuccess)
        
        // Redirect to the newly created order
        await router.push(`/app/admin/orders/${response.data.id}`)
      }
    } catch (error) {
      console.error('Error creating order:', error)
      errorMessage.value = error.data?.message || t.value.generalError
      $toast.error(errorMessage.value)
    } finally {
      creating.value = false
    }
  }
  
  // Handle clicking outside dropdown
  const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
      showUserDropdown.value = false
    }
  }
  
  // Lifecycle
  onMounted(() => {
    fetchUsers()
    document.addEventListener('click', handleClickOutside)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
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