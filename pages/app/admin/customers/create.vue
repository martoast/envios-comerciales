<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <!-- Mobile Layout -->
          <div class="lg:hidden space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <NuxtLink 
                  to="/app/admin/customers" 
                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                >
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                  </svg>
                </NuxtLink>
                <h1 class="text-xl sm:text-2xl font-extrabold text-gray-900">{{ t.createCustomer }}</h1>
              </div>
            </div>
          </div>
  
          <!-- Desktop Layout -->
          <div class="hidden lg:flex lg:items-center lg:justify-between">
            <div class="flex items-center gap-4">
              <NuxtLink 
                to="/app/admin/customers" 
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
              </NuxtLink>
              <div>
                <h1 class="text-3xl font-extrabold text-gray-900">{{ t.createCustomer }}</h1>
                <p class="text-sm text-gray-600 mt-1">{{ t.createCustomerDescription }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <form @submit.prevent="handleSubmit">
            <!-- Basic Information Section -->
            <div class="px-6 py-6 border-b border-gray-100">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.basicInformation }}</h2>
              
              <div class="space-y-4">
                <!-- Name -->
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.name }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="t.namePlaceholder"
                    :class="{ 'border-red-300': errors.name }"
                  >
                  <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                </div>
  
                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.email }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="t.emailPlaceholder"
                    :class="{ 'border-red-300': errors.email }"
                  >
                  <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                </div>
  
                <!-- Phone -->
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.phone }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="t.phonePlaceholder"
                    :class="{ 'border-red-300': errors.phone }"
                  >
                  <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
                </div>
  
                <!-- User Type -->
                <div>
                  <label for="user_type" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.userType }}
                  </label>
                  <select
                    id="user_type"
                    v-model="form.user_type"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">{{ t.selectUserType }}</option>
                    <option value="expat">{{ t.expat }}</option>
                    <option value="business">{{ t.business }}</option>
                    <option value="shopper">{{ t.shopper }}</option>
                  </select>
                </div>
  
                <!-- Preferred Language -->
                <div>
                  <label for="preferred_language" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.preferredLanguage }}
                  </label>
                  <select
                    id="preferred_language"
                    v-model="form.preferred_language"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="es">{{ t.spanish }}</option>
                    <option value="en">{{ t.english }}</option>
                  </select>
                </div>
              </div>
            </div>
  
            <!-- Address Section -->
            <div class="px-6 py-6 border-b border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-gray-900">{{ t.addressInformation }}</h2>
                <span class="text-sm text-gray-500">{{ t.optional }}</span>
              </div>
              
              <div class="space-y-4">
                <!-- Street -->
                <div>
                  <label for="street" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.street }}
                  </label>
                  <input
                    id="street"
                    v-model="form.street"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="t.streetPlaceholder"
                  >
                </div>
  
                <!-- Exterior and Interior Number -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="exterior_number" class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t.exteriorNumber }}
                    </label>
                    <input
                      id="exterior_number"
                      v-model="form.exterior_number"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      :placeholder="t.exteriorNumberPlaceholder"
                    >
                  </div>
  
                  <div>
                    <label for="interior_number" class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t.interiorNumber }}
                    </label>
                    <input
                      id="interior_number"
                      v-model="form.interior_number"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      :placeholder="t.interiorNumberPlaceholder"
                    >
                  </div>
                </div>
  
                <!-- Colonia and Municipio -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="colonia" class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t.colonia }}
                    </label>
                    <input
                      id="colonia"
                      v-model="form.colonia"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      :placeholder="t.coloniaPlaceholder"
                    >
                  </div>
  
                  <div>
                    <label for="municipio" class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t.municipio }}
                    </label>
                    <input
                      id="municipio"
                      v-model="form.municipio"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      :placeholder="t.municipioPlaceholder"
                    >
                  </div>
                </div>
  
                <!-- Estado and Postal Code -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="estado" class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t.estado }}
                    </label>
                    <input
                      id="estado"
                      v-model="form.estado"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      :placeholder="t.estadoPlaceholder"
                    >
                  </div>
  
                  <div>
                    <label for="postal_code" class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t.postalCode }}
                    </label>
                    <input
                      id="postal_code"
                      v-model="form.postal_code"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      :placeholder="t.postalCodePlaceholder"
                    >
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Info Banner -->
            <div class="px-6 py-4 bg-blue-50 border-b border-blue-100">
              <div class="flex gap-3">
                <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <p class="text-sm font-medium text-blue-900">{{ t.passwordInfo }}</p>
                  <p class="text-sm text-blue-700 mt-1">{{ t.passwordInfoDescription }}</p>
                </div>
              </div>
            </div>
  
            <!-- Actions -->
            <div class="px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
              <NuxtLink 
                to="/app/admin/customers"
                class="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {{ t.cancel }}
              </NuxtLink>
              <button
                type="submit"
                :disabled="submitting"
                class="inline-flex items-center px-6 py-2.5 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-300"
              >
                <svg v-if="submitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ submitting ? t.creating : t.createCustomerButton }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  
  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin']
  })
  
  const { $customFetch, $toast } = useNuxtApp()
  const router = useRouter()
  const { t: createTranslations } = useLanguage()
  
  // State
  const submitting = ref(false)
  const errors = ref({})
  
  const form = reactive({
    name: '',
    email: '',
    phone: '',
    user_type: '',
    preferred_language: 'es',
    street: '',
    exterior_number: '',
    interior_number: '',
    colonia: '',
    municipio: '',
    estado: '',
    postal_code: ''
  })
  
  // Translations
  const translations = {
    createCustomer: {
      es: 'Crear Cliente',
      en: 'Create Customer'
    },
    createCustomerDescription: {
      es: 'Registra un nuevo cliente en el sistema',
      en: 'Register a new customer in the system'
    },
    basicInformation: {
      es: 'Información Básica',
      en: 'Basic Information'
    },
    addressInformation: {
      es: 'Información de Dirección',
      en: 'Address Information'
    },
    optional: {
      es: 'Opcional',
      en: 'Optional'
    },
    name: {
      es: 'Nombre',
      en: 'Name'
    },
    namePlaceholder: {
      es: 'Nombre completo del cliente',
      en: 'Customer full name'
    },
    email: {
      es: 'Correo Electrónico',
      en: 'Email'
    },
    emailPlaceholder: {
      es: 'cliente@ejemplo.com',
      en: 'customer@example.com'
    },
    phone: {
      es: 'Teléfono',
      en: 'Phone'
    },
    phonePlaceholder: {
      es: '+52 55 1234 5678',
      en: '+52 55 1234 5678'
    },
    userType: {
      es: 'Tipo de Usuario',
      en: 'User Type'
    },
    selectUserType: {
      es: 'Seleccionar tipo',
      en: 'Select type'
    },
    expat: {
      es: 'Expat',
      en: 'Expat'
    },
    business: {
      es: 'Negocio',
      en: 'Business'
    },
    shopper: {
      es: 'Comprador en Línea',
      en: 'Online Shopper'
    },
    preferredLanguage: {
      es: 'Idioma Preferido',
      en: 'Preferred Language'
    },
    spanish: {
      es: 'Español',
      en: 'Spanish'
    },
    english: {
      es: 'Inglés',
      en: 'English'
    },
    street: {
      es: 'Calle',
      en: 'Street'
    },
    streetPlaceholder: {
      es: 'Nombre de la calle',
      en: 'Street name'
    },
    exteriorNumber: {
      es: 'Número Exterior',
      en: 'Exterior Number'
    },
    exteriorNumberPlaceholder: {
      es: '123',
      en: '123'
    },
    interiorNumber: {
      es: 'Número Interior',
      en: 'Interior Number'
    },
    interiorNumberPlaceholder: {
      es: 'Apt 4B',
      en: 'Apt 4B'
    },
    colonia: {
      es: 'Colonia',
      en: 'Neighborhood'
    },
    coloniaPlaceholder: {
      es: 'Nombre de la colonia',
      en: 'Neighborhood name'
    },
    municipio: {
      es: 'Municipio/Alcaldía',
      en: 'Municipality'
    },
    municipioPlaceholder: {
      es: 'Nombre del municipio',
      en: 'Municipality name'
    },
    estado: {
      es: 'Estado',
      en: 'State'
    },
    estadoPlaceholder: {
      es: 'CDMX',
      en: 'CDMX'
    },
    postalCode: {
      es: 'Código Postal',
      en: 'Postal Code'
    },
    postalCodePlaceholder: {
      es: '06600',
      en: '06600'
    },
    passwordInfo: {
      es: 'Nota sobre la contraseña',
      en: 'Password Note'
    },
    passwordInfoDescription: {
      es: 'El cliente podrá establecer su propia contraseña usando la función "Olvidé mi contraseña" en la página de inicio de sesión.',
      en: 'The customer can set their own password using the "Forgot Password" feature on the login page.'
    },
    cancel: {
      es: 'Cancelar',
      en: 'Cancel'
    },
    createCustomerButton: {
      es: 'Crear Cliente',
      en: 'Create Customer'
    },
    creating: {
      es: 'Creando...',
      en: 'Creating...'
    },
    customerCreatedSuccess: {
      es: 'Cliente creado exitosamente',
      en: 'Customer created successfully'
    },
    customerCreatedDescription: {
      es: 'El cliente puede establecer su contraseña usando "Olvidé mi contraseña"',
      en: 'Customer can set password using "Forgot Password"'
    }
  }
  
  const t = createTranslations(translations)
  
  // Methods
  const handleSubmit = async () => {
    if (submitting.value) return
  
    // Reset errors
    errors.value = {}
    submitting.value = true
  
    try {
      const response = await $customFetch('/admin/customers', {
        method: 'POST',
        body: form
      })
  
      $toast.success(t.value.customerCreatedSuccess, {
        description: t.value.customerCreatedDescription
      })
  
      // Redirect to customer detail page
      router.push(`/app/admin/customers/${response.data.id}`)
    } catch (error) {
      console.error('Error creating customer:', error)
      
      // Handle validation errors
      if (error.data?.errors) {
        errors.value = error.data.errors
        
        // Show first error in toast
        const firstError = Object.values(error.data.errors)[0]
        if (Array.isArray(firstError)) {
          $toast.error(firstError[0])
        } else {
          $toast.error(firstError)
        }
      } else {
        $toast.error(error.data?.message || 'Failed to create customer')
      }
    } finally {
      submitting.value = false
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
    animation: fadeIn 0.6s ease-out forwards;
    opacity: 0;
  }
  </style>