<!-- pages/app/account/complete-profile.vue -->
<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="text-center mb-8 animate-fadeIn">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-primary-50 rounded-2xl mb-6 shadow-lg">
          <svg class="w-12 h-12" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <g stroke="#0d2c4f" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
              <line x1="0" y1="35" x2="40" y2="35" />
              <line x1="5" y1="50" x2="45" y2="50" />
              <line x1="0" y1="65" x2="40" y2="65" />
              <path fill="#FFC107" d="M 55,25 L 105,25 L 125,45 L 75,45 Z" />
              <path fill="#FFA000" d="M 55,25 L 55,75 L 75,95 L 75,45 Z" />
              <path fill="#FF8F00" d="M 75,95 L 125,95 L 125,45 L 75,45 Z" />
            </g>
          </svg>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          {{ t.completeProfileTitle }}
        </h1>
        <p class="text-base text-gray-600 max-w-md mx-auto">
          {{ t.completeProfileSubtitle }}
        </p>
      </div>

      <!-- Welcome Message -->
      <div class="bg-primary-50 rounded-lg p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-primary-800">
              {{ t.welcomeMessage }}
            </p>
          </div>
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
        <div v-if="errorMessage || Object.keys(errors).length > 0" class="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-red-800">
                {{ errorMessage || t.validationError }}
              </p>
              <ul v-if="Object.keys(errors).length > 0" class="mt-2 text-sm text-red-700 space-y-1">
                <li v-for="(messages, field) in errors" :key="field">
                  {{ messages[0] }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Form -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          
          <!-- User Type Selection (Required) -->
          <div v-if="!userHasType">
            <label class="block text-sm font-semibold text-gray-900 mb-4">
              {{ t.userTypeLabel }} <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                v-for="type in translatedUserTypes"
                :key="type.value"
                type="button"
                @click="form.user_type = type.value"
                :class="[
                  'relative rounded-lg border-2 p-4 flex flex-col items-center cursor-pointer focus:outline-none transition-all',
                  form.user_type === type.value 
                    ? 'border-primary-500 bg-primary-50 shadow-lg transform scale-105' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                ]"
              >
                <!-- Icon -->
                <div :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center mb-3',
                  form.user_type === type.value ? 'bg-primary-100' : 'bg-gray-100'
                ]">
                  <svg v-if="type.icon === 'globe'" class="w-6 h-6" :class="form.user_type === type.value ? 'text-primary-600' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <svg v-else-if="type.icon === 'briefcase'" class="w-6 h-6" :class="form.user_type === type.value ? 'text-primary-600' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <svg v-else-if="type.icon === 'shopping-cart'" class="w-6 h-6" :class="form.user_type === type.value ? 'text-primary-600' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                
                <!-- Label -->
                <span :class="[
                  'text-sm font-medium',
                  form.user_type === type.value ? 'text-primary-900' : 'text-gray-900'
                ]">{{ type.label }}</span>
                
                <!-- Description -->
                <span :class="[
                  'text-xs mt-1 text-center',
                  form.user_type === type.value ? 'text-primary-700' : 'text-gray-500'
                ]">{{ type.description }}</span>
                
                <!-- Selected indicator -->
                <div v-if="form.user_type === type.value" class="absolute -top-1 -right-1">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-white">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </span>
                </div>
              </button>
            </div>
            <p v-if="errors.user_type" class="mt-2 text-sm text-red-600">{{ errors.user_type[0] }}</p>
          </div>

          <!-- Phone Field (Required) -->
          <div>
            <label for="phone" class="block text-sm font-semibold text-gray-900 mb-2">
              {{ t.phoneLabel }} <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="form.phone"
                type="tel"
                id="phone"
                :placeholder="t.phonePlaceholder"
                :class="[
                  'w-full pl-10 pr-3 py-3 rounded-lg border text-base focus:outline-none focus:ring-2 transition-all',
                  errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500'
                ]"
                required
                @input="clearFieldError('phone')"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
            </div>
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone[0] }}</p>
            <p class="mt-1 text-xs text-gray-500">{{ t.phoneHelp }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !form.phone || (!userHasType && !form.user_type)"
            class="w-full px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 font-semibold text-base no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="!loading">{{ t.completeButton }}</span>
            <span v-else>{{ t.savingButton }}</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// Define page meta
definePageMeta({
  layout: 'app',
  middleware: 'auth'
})

// Nuxt imports
const { $customFetch } = useNuxtApp()
const { $retriveUser } = useNuxtApp()

const route = useRoute()
const router = useRouter()

// Use the language composable
const { t: createTranslations } = useLanguage()

// State
const form = ref({
  phone: '',
  user_type: null
})

const loading = ref(false)
const errorMessage = ref('')
const errors = ref({})
const userState = useState('user')

// User types base configuration
const userTypes = ref([
  {
    value: 'expat',
    icon: 'globe'
  },
  {
    value: 'business',
    icon: 'briefcase'
  },
  {
    value: 'shopper',
    icon: 'shopping-cart'
  }
])

// Computed to check if user already has a type
const userHasType = computed(() => {
  return userState.value && userState.value.user_type
})

// Get redirect parameter from route
const redirectTo = route.query.redirect || '/app/'

// Get registration source from query params or tracking parameter
const registrationSource = computed(() => {
  // Check if we have tracking data passed from OAuth
  if (route.query.tracking) {
    return route.query.tracking
  }
  
  // Otherwise build from individual params (for direct navigation)
  const params = route.query
  const trackingData = {
    utm_source: params.utm_source || null,
    utm_medium: params.utm_medium || null,
    utm_campaign: params.utm_campaign || null,
    utm_content: params.utm_content || null,
    utm_term: params.utm_term || null,
    fbclid: params.fbclid || null,
    gclid: params.gclid || null,
    landing_page: params.source || null,
    referrer: document.referrer || null,
    timestamp: new Date().toISOString()
  }
  
  // Only return if we have tracking data
  const hasTrackingData = Object.values(trackingData).some(value => value !== null)
  return hasTrackingData ? JSON.stringify(trackingData) : null
})

// Define translations
const translations = {
  completeProfileTitle: {
    es: 'Completa tu Perfil',
    en: 'Complete Your Profile'
  },
  completeProfileSubtitle: {
    es: 'Cuéntanos un poco sobre ti para personalizar tu experiencia',
    en: 'Tell us a bit about yourself to personalize your experience'
  },
  welcomeMessage: {
    es: 'Te has registrado exitosamente. Por favor completa tu información para continuar.',
    en: 'You\'ve successfully signed up. Please complete your information to continue.'
  },
  userTypeLabel: {
    es: '¿Cómo planeas usar nuestro servicio?',
    en: 'How do you plan to use our service?'
  },
  // User type translations
  expatLabel: {
    es: 'Expatriado',
    en: 'Expat'
  },
  expatDescription: {
    es: 'Viviendo en México',
    en: 'Living in Mexico'
  },
  businessLabel: {
    es: 'Empresa',
    en: 'Business'
  },
  businessDescription: {
    es: 'Soluciones B2B',
    en: 'B2B Solutions'
  },
  shopperLabel: {
    es: 'Comprador',
    en: 'Online Shopper'
  },
  shopperDescription: {
    es: 'Compras Personales',
    en: 'Personal Shopping'
  },
  phoneLabel: {
    es: 'Número de Teléfono',
    en: 'Phone Number'
  },
  phonePlaceholder: {
    es: '+52 55 1234 5678',
    en: '+1 555 123 4567'
  },
  phoneHelp: {
    es: 'Incluye el código de país. Ej: +52 para México, +1 para USA',
    en: 'Include country code. Ex: +1 for USA, +52 for Mexico'
  },
  completeButton: {
    es: 'Completar Perfil',
    en: 'Complete Profile'
  },
  savingButton: {
    es: 'Guardando...',
    en: 'Saving...'
  },
  generalError: {
    es: 'Ocurrió un error. Por favor, intenta de nuevo.',
    en: 'An error occurred. Please try again.'
  },
  validationError: {
    es: 'Por favor corrige los siguientes errores:',
    en: 'Please correct the following errors:'
  }
}

// Get reactive translations
const t = createTranslations(translations)

// Computed property for translated user types
const translatedUserTypes = computed(() => {
  return userTypes.value.map(type => {
    let label = ''
    let description = ''
    
    switch(type.value) {
      case 'shopper':
        label = t.value.shopperLabel
        description = t.value.shopperDescription
        break
      case 'business':
        label = t.value.businessLabel
        description = t.value.businessDescription
        break
      case 'expat':
        label = t.value.expatLabel
        description = t.value.expatDescription
        break
      
      
    }
    
    return {
      value: type.value,
      icon: type.icon,
      label,
      description
    }
  })
})

// Check for preselected user type from query params
const checkPreselection = () => {
  const preselect = route.query.preselect
  if (preselect && ['expat', 'business', 'shopper'].includes(preselect) && !userHasType.value) {
    form.value.user_type = preselect
  }
}

// Methods
const clearErrors = () => {
  errorMessage.value = ''
  errors.value = {}
}

const clearFieldError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

// In pages/app/account/complete-profile.vue
// Update the handleSubmit function to include Meta Pixel tracking

const handleSubmit = async () => {
  loading.value = true
  clearErrors()
  
  try {
    // Build update payload
    const updateData = {
      phone: form.value.phone
    }
    
    // Only add user_type if user doesn't have one
    if (!userHasType.value && form.value.user_type) {
      updateData.user_type = form.value.user_type
    }
    
    // Add registration source if available and user doesn't already have it
    if (registrationSource.value && (!userState.value.registration_source || userState.value.registration_source === null)) {
      updateData.registration_source = registrationSource.value
    }
    
    // Update profile
    await $customFetch('/profile', {
      method: 'PUT',
      body: updateData
    })
    
    // Track completed registration with Meta Pixel
    const { $fbq } = useNuxtApp()
    if ($fbq) {
      $fbq('track', 'CompleteRegistration')
    }
    
    // Refresh user data
    await $retriveUser()
    
    // Success - redirect to intended page
    return navigateTo(redirectTo)
  } catch (error) {
    console.error('Profile update error:', error)
    
    if (error.data) {
      if (error.data.errors) {
        errors.value = error.data.errors
      }
      if (error.data.message) {
        errorMessage.value = error.data.message
      }
    } else {
      errorMessage.value = t.value.generalError
    }
  } finally {
    loading.value = false
  }
}

// Check if user actually needs to complete profile
onMounted(async () => {
  // Try to get user data
  try {
    await $retriveUser()
  } catch (error) {
    // If can't get user, they're not logged in properly
    console.error('Could not fetch user:', error)
    await navigateTo('/login')
    return
  }

  // If user already has phone AND user_type, redirect
  if (userState.value && userState.value.phone && userState.value.user_type) {
    await navigateTo(redirectTo)
  }
  
  // Check for preselected user type
  checkPreselection()
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
  animation: fadeIn 0.6s ease-out;
}
</style>