<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Loading State -->
    <div v-if="isInitialLoading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <svg class="inline-block w-16 h-16 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-4 text-gray-600">{{ t.loadingProfile }}</p>
      </div>
    </div>

    <!-- Content (shown when data is loaded) -->
    <div v-else>
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/app/account"
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.editProfile }}</h1>
              <p class="mt-1 text-sm text-gray-600">{{ t.updateYourInfo }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Success Message -->
        <Transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="showSuccess" class="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-800">{{ t.profileUpdated }}</p>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Error Alert -->
        <Transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="errorMessage || Object.keys(errors).length > 0" class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
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

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Basic Information -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100">
              <h2 class="text-lg font-bold text-gray-900">{{ t.basicInformation }}</h2>
            </div>
            <div class="p-6 space-y-4">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t.fullName }} *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  id="name"
                  required
                  :class="[
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all',
                    errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  ]"
                  @input="clearFieldError('name')"
                >
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name[0] }}</p>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t.email }} *
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  required
                  :class="[
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all',
                    errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  ]"
                  @input="clearFieldError('email')"
                >
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email[0] }}</p>
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t.phone }}
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  id="phone"
                  placeholder="+52 123 456 7890"
                  :class="[
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all',
                    errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  ]"
                  @input="clearFieldError('phone')"
                >
                <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone[0] }}</p>
              </div>

              <!-- Language -->
              <div>
                <label for="preferred_language" class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t.preferredLanguage }}
                </label>
                <select
                  v-model="form.preferred_language"
                  id="preferred_language"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="bg-primary-50 rounded-2xl p-6 border border-primary-200/50">
            <div class="flex items-center gap-3 mb-3">
              <div class="p-2 bg-primary-100 rounded-lg">
                <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900">{{ t.shippingAddressTitle }}</h3>
            </div>
            <p class="text-sm text-gray-700 mb-4">{{ t.shippingAddressDesc }}</p>
            <NuxtLink
              to="/app/account/shipping-address"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
            >
              {{ t.manageShippingAddress }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-between">
            <NuxtLink
              to="/app/account"
              class="px-6 py-2.5 text-gray-700 font-medium hover:text-gray-900 transition-colors"
            >
              {{ t.cancel }}
            </NuxtLink>
            
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-2.5 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span v-if="!isSubmitting">{{ t.saveChanges }}</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ t.saving }}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'app',
  middleware: ['auth', 'customer', 'complete-profile']
})

// Nuxt imports
const { $customFetch } = useNuxtApp()
const router = useRouter()

// Use the language composable
const { t: createTranslations, language, switchLanguage } = useLanguage()

// State
const form = ref({
  name: '',
  email: '',
  phone: '',
  preferred_language: 'es'
})

const isInitialLoading = ref(true)
const isSubmitting = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')
const errors = ref({})

// Translations
const translations = {
  editProfile: {
    es: 'Editar Perfil',
    en: 'Edit Profile'
  },
  updateYourInfo: {
    es: 'Actualiza tu información personal',
    en: 'Update your personal information'
  },
  basicInformation: {
    es: 'Información Básica',
    en: 'Basic Information'
  },
  fullName: {
    es: 'Nombre Completo',
    en: 'Full Name'
  },
  email: {
    es: 'Correo Electrónico',
    en: 'Email'
  },
  phone: {
    es: 'Teléfono',
    en: 'Phone'
  },
  preferredLanguage: {
    es: 'Idioma Preferido',
    en: 'Preferred Language'
  },
  shippingAddressTitle: {
    es: 'Dirección de Envío',
    en: 'Shipping Address'
  },
  shippingAddressDesc: {
    es: 'Administra tu dirección de envío por separado',
    en: 'Manage your shipping address separately'
  },
  manageShippingAddress: {
    es: 'Administrar Dirección de Envío',
    en: 'Manage Shipping Address'
  },
  cancel: {
    es: 'Cancelar',
    en: 'Cancel'
  },
  saveChanges: {
    es: 'Guardar Cambios',
    en: 'Save Changes'
  },
  saving: {
    es: 'Guardando...',
    en: 'Saving...'
  },
  profileUpdated: {
    es: '¡Tu perfil ha sido actualizado exitosamente!',
    en: 'Your profile has been updated successfully!'
  },
  validationError: {
    es: 'Por favor corrige los siguientes errores:',
    en: 'Please correct the following errors:'
  },
  loadingProfile: {
    es: 'Cargando perfil...',
    en: 'Loading profile...'
  }
}

// Get reactive translations
const t = createTranslations(translations)

// Methods
const fetchProfile = async () => {
  try {
    const response = await $customFetch('/profile')
    const data = response.data
    
    // Populate form with existing data
    form.value = {
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      preferred_language: data.preferred_language || 'es'
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
    errorMessage.value = 'Failed to load profile data. Please try again.'
  } finally {
    isInitialLoading.value = false
  }
}

const clearFieldError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

const clearErrors = () => {
  errorMessage.value = ''
  errors.value = {}
}

const handleSubmit = async () => {
  isSubmitting.value = true
  clearErrors()
  showSuccess.value = false

  try {
    await $customFetch('/profile', {
      method: 'PUT',
      body: form.value
    })

    // Update language if it changed
    if (form.value.preferred_language !== language.value) {
      switchLanguage(form.value.preferred_language)
    }
    
    await navigateTo('/app/account')

  } catch (error) {
    console.error('Update error:', error)
    
    if (error.data) {
      if (error.data.errors) {
        errors.value = error.data.errors
      }
      if (error.data.message) {
        errorMessage.value = error.data.message
      }
    } else {
      errorMessage.value = 'An error occurred. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}

// Fetch profile on mount
onMounted(() => {
  fetchProfile()
})
</script>