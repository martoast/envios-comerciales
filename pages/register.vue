<template>
  <section class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo and Header -->
      <div class="text-center animate-fadeIn">
        <div class="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-primary-50 rounded-2xl mb-6 shadow-lg animate-bounce-subtle">
          <svg class="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
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
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
          {{ t.registerTitle }}
        </h1>
        <p class="text-sm sm:text-base text-gray-600 max-w-sm mx-auto">
          {{ t.registerSubtitle }}
        </p>
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
        <div v-if="errorMessage || Object.keys(errors).length > 0" class="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-md animate-shake">
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
                <li v-for="(messages, field) in errors" :key="field" class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>{{ messages[0] }}</span>
                </li>
              </ul>
            </div>
            <button @click="clearErrors" class="ml-3 flex-shrink-0">
              <svg class="w-5 h-5 text-red-400 hover:text-red-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </Transition>

      <!-- Register Form -->
      <div class="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-900 mb-2">
              {{ t.nameLabel }}
            </label>
            <div class="relative">
              <input
                v-model="form.name"
                type="text"
                id="name"
                autocomplete="name"
                :placeholder="t.namePlaceholder"
                :class="[
                  'w-full pl-10 pr-3 py-3 rounded-lg border text-base focus:outline-none focus:ring-2 transition-all duration-200',
                  errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500'
                ]"
                required
                @input="clearFieldError('name')"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
            </div>
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name[0] }}</p>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-900 mb-2">
              {{ t.emailLabel }}
            </label>
            <div class="relative">
              <input
                v-model="form.email"
                type="email"
                id="email"
                autocomplete="email"
                :placeholder="t.emailPlaceholder"
                :class="[
                  'w-full pl-10 pr-3 py-3 rounded-lg border text-base focus:outline-none focus:ring-2 transition-all duration-200',
                  errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500'
                ]"
                required
                @input="clearFieldError('email')"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email[0] }}</p>
          </div>

          <!-- Phone Field -->
          <div>
            <label for="phone" class="block text-sm font-semibold text-gray-900 mb-2">
              {{ t.phoneLabel }}
            </label>
            <div class="relative">
              <input
                v-model="form.phone"
                type="tel"
                id="phone"
                autocomplete="tel"
                :placeholder="t.phonePlaceholder"
                :class="[
                  'w-full pl-10 pr-3 py-3 rounded-lg border text-base focus:outline-none focus:ring-2 transition-all duration-200',
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

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-900 mb-2">
              {{ t.passwordLabel }}
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                autocomplete="new-password"
                :placeholder="t.passwordPlaceholder"
                :class="[
                  'w-full pl-10 pr-12 py-3 rounded-lg border text-base focus:outline-none focus:ring-2 transition-all duration-200',
                  errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500'
                ]"
                required
                @input="clearFieldError('password')"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password[0] }}</p>
            
            <!-- Password strength indicator -->
            <div v-if="form.password" class="mt-2">
              <div class="flex items-center gap-1">
                <div v-for="i in 4" :key="i" :class="[
                  'h-1 flex-1 rounded-full transition-all duration-300',
                  i <= passwordStrength ? passwordStrengthColor : 'bg-gray-200'
                ]"></div>
              </div>
              <p class="text-xs mt-1" :class="passwordStrengthTextColor">
                {{ passwordStrengthText }}
              </p>
            </div>
          </div>

          <!-- Password Confirmation Field -->
          <div>
            <label for="password_confirmation" class="block text-sm font-semibold text-gray-900 mb-2">
              {{ t.passwordConfirmLabel }}
            </label>
            <div class="relative">
              <input
                v-model="form.password_confirmation"
                :type="showPasswordConfirm ? 'text' : 'password'"
                id="password_confirmation"
                autocomplete="new-password"
                :placeholder="t.passwordConfirmPlaceholder"
                :class="[
                  'w-full pl-10 pr-12 py-3 rounded-lg border text-base focus:outline-none focus:ring-2 transition-all duration-200',
                  errors.password_confirmation || (form.password_confirmation && form.password !== form.password_confirmation) 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500'
                ]"
                required
                @input="clearFieldError('password_confirmation')"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <button
                type="button"
                @click="showPasswordConfirm = !showPasswordConfirm"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
              >
                <svg v-if="!showPasswordConfirm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                </svg>
              </button>
            </div>
            <p v-if="errors.password_confirmation" class="mt-1 text-sm text-red-600">{{ errors.password_confirmation[0] }}</p>
            <p v-else-if="form.password_confirmation && form.password !== form.password_confirmation" class="mt-1 text-sm text-red-600">
              {{ t.passwordMismatch }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !isFormValid"
            class="w-full px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 font-semibold text-base no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="!loading">{{ t.registerButton }}</span>
            <span v-else>{{ t.registeringButton }}</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">{{ t.orContinueWith }}</span>
          </div>
        </div>

        <!-- Google Sign Up Button -->
        <button
          type="button"
          @click="handleGoogleSignUp"
          class="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
        >
          <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {{ t.continueWithGoogle }}
        </button>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">{{ t.orText }}</span>
          </div>
        </div>

        <!-- Login Link -->
        <p class="text-center text-sm sm:text-base text-gray-600">
          {{ t.alreadyHaveAccount }}
          <NuxtLink :to="loginLink" class="text-primary-500 font-semibold hover:text-primary-600 hover:underline transition-colors">
            {{ t.loginLink }}
          </NuxtLink>
        </p>
      </div>

      <!-- Back to Home -->
      <div class="text-center">
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-700 text-sm inline-flex items-center gap-2 group transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 transition-transform group-hover:-translate-x-1">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          {{ t.backToHome }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Define page meta to use default layout
definePageMeta({
  layout: 'default'
})

// Nuxt imports
const { $customFetch } = useNuxtApp()
const route = useRoute()
const runtimeConfig = useRuntimeConfig();

// Use the language composable
const { t: createTranslations, language } = useLanguage()

// Form state
const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: ''
})

// UI state
const loading = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const errorMessage = ref('')
const errors = ref({})

// Get redirect parameter from route
const redirectTo = route.query.redirect

// Computed property for login link with redirect parameter
const loginLink = computed(() => {
  if (redirectTo && typeof redirectTo === 'string') {
    return `/login?redirect=${encodeURIComponent(redirectTo)}`
  }
  return '/login'
})

// Define translations
const translations = {
  registerTitle: {
    es: 'Crear una Cuenta',
    en: 'Create an Account'
  },
  registerSubtitle: {
    es: 'Únete para empezar a enviar desde USA a México',
    en: 'Join to start shipping from USA to Mexico'
  },
  nameLabel: {
    es: 'Nombre Completo',
    en: 'Full Name'
  },
  namePlaceholder: {
    es: 'Juan Pérez',
    en: 'John Doe'
  },
  emailLabel: {
    es: 'Correo Electrónico',
    en: 'Email Address'
  },
  emailPlaceholder: {
    es: 'tu@email.com',
    en: 'your@email.com'
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
    es: 'Incluye el código de país. Ej: +52 para México',
    en: 'Include country code. Ex: +1 for USA, +52 for Mexico'
  },
  passwordLabel: {
    es: 'Contraseña',
    en: 'Password'
  },
  passwordPlaceholder: {
    es: 'Mínimo 8 caracteres',
    en: 'Minimum 8 characters'
  },
  passwordConfirmLabel: {
    es: 'Confirmar Contraseña',
    en: 'Confirm Password'
  },
  passwordConfirmPlaceholder: {
    es: 'Repite tu contraseña',
    en: 'Repeat your password'
  },
  registerButton: {
    es: 'Crear Cuenta',
    en: 'Create Account'
  },
  registeringButton: {
    es: 'Creando cuenta...',
    en: 'Creating account...'
  },
  orText: {
    es: 'o',
    en: 'or'
  },
  alreadyHaveAccount: {
    es: '¿Ya tienes una cuenta?',
    en: 'Already have an account?'
  },
  loginLink: {
    es: 'Inicia Sesión',
    en: 'Sign In'
  },
  backToHome: {
    es: 'Volver al Inicio',
    en: 'Back to Home'
  },
  generalError: {
    es: 'Ocurrió un error. Por favor, intenta de nuevo.',
    en: 'An error occurred. Please try again.'
  },
  validationError: {
    es: 'Por favor corrige los siguientes errores:',
    en: 'Please correct the following errors:'
  },
  passwordMismatch: {
    es: 'Las contraseñas no coinciden',
    en: 'Passwords do not match'
  },
  weakPassword: {
    es: 'Débil',
    en: 'Weak'
  },
  fairPassword: {
    es: 'Regular',
    en: 'Fair'
  },
  goodPassword: {
    es: 'Buena',
    en: 'Good'
  },
  strongPassword: {
    es: 'Fuerte',
    en: 'Strong'
  },
  orContinueWith: {
    es: 'o continúa con',
    en: 'or continue with'
  },
  continueWithGoogle: {
    es: 'Continuar con Google',
    en: 'Continue with Google'
  },
  noAccountError: {
    es: 'No existe una cuenta con este email. Por favor regístrate primero.',
    en: 'No account exists with this email. Please register first.'
  }
}

// Get reactive translations
const t = createTranslations(translations)

// Password strength calculation
const passwordStrength = computed(() => {
  const password = form.value.password
  if (!password) return 0
  
  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) strength++
  
  return strength
})

const passwordStrengthColor = computed(() => {
  const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']
  return colors[passwordStrength.value]
})

const passwordStrengthTextColor = computed(() => {
  const colors = ['', 'text-red-600', 'text-orange-600', 'text-yellow-600', 'text-green-600']
  return colors[passwordStrength.value]
})

const passwordStrengthText = computed(() => {
  const texts = ['', t.value.weakPassword, t.value.fairPassword, t.value.goodPassword, t.value.strongPassword]
  return texts[passwordStrength.value]
})

// Form validation
const isFormValid = computed(() => {
  return form.value.name &&
    form.value.email &&
    form.value.phone &&
    form.value.password &&
    form.value.password_confirmation &&
    form.value.password === form.value.password_confirmation &&
    passwordStrength.value >= 2
})

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

const handleRegister = async () => {
  loading.value = true
  clearErrors()

  try {
    // Make registration request
    await $customFetch('/auth/register', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
      }
    })

    // Success - check for redirect query parameter
    if (redirectTo && typeof redirectTo === 'string') {
      // Ensure the redirect is a relative path for security
      if (redirectTo.startsWith('/')) {
        console.log('Redirecting to:', redirectTo)
        await navigateTo(redirectTo)
      } else {
        // If it's not a relative path, go to default app page
        console.log('Invalid redirect path, going to default app page')
        await navigateTo('/app/')
      }
    } else {
      // No redirect, go to default app page
      console.log('No redirect parameter, going to default app page')
      await navigateTo('/app/')
    }

  } catch (error) {
    console.error('Registration error:', error)
    
    // Handle API validation errors
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

const handleGoogleSignUp = () => { 
  window.location.href = `${runtimeConfig.public.apiUrl}/auth/google/redirect`
}

// Check for errors on mount
onMounted(() => {
  // Check if redirected from Google OAuth with no account error
  if (route.query.error === 'no_account') {
    errorMessage.value = t.value.noAccountError
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

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}
</style>