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
          <form @submit.prevent="handleSubmit" class="space-y-5">
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
              :disabled="loading || !form.phone"
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
  import { ref, onMounted } from 'vue'
  
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
    phone: ''
  })
  
  const loading = ref(false)
  const errorMessage = ref('')
  const errors = ref({})
  
  // Get redirect parameter from route
  const redirectTo = route.query.redirect || '/app/'
  
  // Define translations
  const translations = {
    completeProfileTitle: {
      es: 'Completa tu Registro',
      en: 'Complete Your Registration'
    },
    completeProfileSubtitle: {
      es: 'Solo necesitamos tu número de teléfono para finalizar',
      en: 'We just need your phone number to finish'
    },
    welcomeMessage: {
      es: 'Te has registrado exitosamente con Google. Por favor agrega tu número de teléfono para poder contactarte sobre tus envíos.',
      en: 'You\'ve successfully signed up with Google. Please add your phone number so we can contact you about your shipments.'
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
      es: 'Completar Registro',
      en: 'Complete Registration'
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
  
  const handleSubmit = async () => {
    loading.value = true
    clearErrors()
  
    try {
      // Update profile with phone number
      await $customFetch('/profile', {
        method: 'PUT',
        body: {
          phone: form.value.phone
        }
      })
  
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
  // Try to get user data (in case of social login)
  try {
    await $retriveUser()
  } catch (error) {
    // If can't get user, they're not logged in properly
    console.error('Could not fetch user:', error)
    await navigateTo('/login')
    return
  }
  
  const userState = useState('user')
  
  // If user already has phone, redirect
  if (userState.value && userState.value.phone) {
    await navigateTo(redirectTo)
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
  
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out;
  }
  </style>