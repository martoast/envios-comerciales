<template>
    <section class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <div class="max-w-md w-full space-y-8">
        <!-- Logo and Header -->
        <div class="text-center animate-fadeIn">
          <div class="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-primary-50 rounded-2xl mb-6 shadow-lg animate-bounce-subtle">
            <NuxtLink to="/" class="inline-block">
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
            </NuxtLink>
          </div>
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            {{ t.resetPasswordTitle }}
          </h1>
          <p class="text-sm sm:text-base text-gray-600 max-w-sm mx-auto">
            {{ t.resetPasswordSubtitle }}
          </p>
        </div>
  
        <!-- Token Error Alert -->
        <Transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="hasTokenError" class="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {{ t.linkExpiredTitle }}
                </h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>{{ t.linkExpiredMessage }}</p>
                </div>
                <div class="mt-4">
                  <NuxtLink
                    to="/forgot-password"
                    class="text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline transition-colors"
                  >
                    {{ t.requestNewLink }} →
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </Transition>
  
        <!-- General Error Alert -->
        <Transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="errorMessage && !hasTokenError" class="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-md animate-shake">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ errorMessage }}</p>
              </div>
            </div>
          </div>
        </Transition>
        
        <!-- Form Card - hidden when token error -->
        <div v-if="!hasTokenError" class="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
          <form @submit.prevent="onSubmit" class="space-y-5">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-semibold text-gray-900 mb-2">
                {{ t.emailLabel }}
              </label>
              <div class="relative">
                <input
                  v-model="data.form.email"
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  :placeholder="t.emailPlaceholder"
                  :class="[
                    'w-full pl-10 pr-3 py-3 rounded-lg border text-base focus:outline-none focus:ring-2 transition-all duration-200',
                    hasError('email') ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500'
                  ]"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>
              <div v-if="data.errors?.email" class="text-red-600 text-sm mt-1">
                <span v-for="error in data.errors.email" :key="error" v-html="error"></span>
              </div>
            </div>
  
            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-semibold text-gray-900 mb-2">
                {{ t.newPasswordLabel }}
              </label>
              <div class="relative">
                <input
                  v-model="data.form.password"
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  required
                  :placeholder="t.passwordPlaceholder"
                  :class="[
                    'w-full pl-10 pr-3 py-3 rounded-lg border text-base focus:outline-none focus:ring-2 transition-all duration-200',
                    hasError('password') ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500'
                  ]"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
              </div>
              <div v-if="data.errors?.password" class="text-red-600 text-sm mt-1">
                <template v-for="error in data.errors.password" :key="error">
                  <li v-html="error"></li>
                </template>
              </div>
            </div>
  
            <!-- Password Confirmation Field -->
            <div>
              <label for="password_confirmation" class="block text-sm font-semibold text-gray-900 mb-2">
                {{ t.confirmPasswordLabel }}
              </label>
              <div class="relative">
                <input
                  v-model="data.form.password_confirmation"
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  autocomplete="new-password"
                  required
                  :placeholder="t.confirmPasswordPlaceholder"
                  :class="[
                    'w-full pl-10 pr-3 py-3 rounded-lg border text-base focus:outline-none focus:ring-2 transition-all duration-200',
                    hasError('password_confirmation') || (!hasError('password_confirmation') && data.form.password_confirmation && !passwordsMatch) 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500'
                  ]"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
              </div>
              <div v-if="data.errors?.password_confirmation" class="text-red-600 text-sm mt-1">
                <template v-for="error in data.errors.password_confirmation" :key="error">
                  <li v-html="error"></li>
                </template>
              </div>
              <div v-if="!hasError('password_confirmation') && data.form.password_confirmation && !passwordsMatch" class="text-red-600 text-sm mt-1">
                {{ t.passwordsDoNotMatch }}
              </div>
            </div>
  
            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="data.loading || !passwordsMatch"
              class="w-full px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 font-semibold text-base no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
            >
              <svg v-if="data.loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="!data.loading">{{ t.resetPasswordButton }}</span>
              <span v-else>{{ t.resetting }}</span>
            </button>
  
            <!-- Login Link -->
            <p class="text-center text-sm text-gray-600">
              {{ t.rememberPassword }}
              <NuxtLink to="/login" class="font-semibold text-primary-500 hover:text-primary-600 hover:underline transition-colors">
                {{ t.signIn }}
              </NuxtLink>
            </p>
          </form>
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
  const { $customFetch } = useNuxtApp();
  const { t: createTranslations } = useLanguage();
  
  definePageMeta({
    middleware: ["loggedin"],
    layout: 'default'
  });
  
  const route = useRoute();
  
  const hasError = (field) => {
    return !!data.errors[field];
  };
  
  const data = reactive({
    loading: false,
    errors: {},
    form: {
      email: '',
      password: '',
      password_confirmation: '',
      token: route.query.token || null
    },
  });
  
  const errorMessage = ref('');
  
  // Translations
  const translations = {
    resetPasswordTitle: {
      es: 'Restablecer tu contraseña',
      en: 'Reset your password'
    },
    resetPasswordSubtitle: {
      es: 'Ingresa tu nueva contraseña',
      en: 'Enter your new password below'
    },
    emailLabel: {
      es: 'Correo Electrónico',
      en: 'Email Address'
    },
    emailPlaceholder: {
      es: 'tu@email.com',
      en: 'your@email.com'
    },
    newPasswordLabel: {
      es: 'Nueva contraseña',
      en: 'New password'
    },
    passwordPlaceholder: {
      es: '••••••••',
      en: '••••••••'
    },
    confirmPasswordLabel: {
      es: 'Confirmar nueva contraseña',
      en: 'Confirm new password'
    },
    confirmPasswordPlaceholder: {
      es: '••••••••',
      en: '••••••••'
    },
    passwordsDoNotMatch: {
      es: 'Las contraseñas no coinciden',
      en: 'Passwords do not match'
    },
    resetPasswordButton: {
      es: 'Restablecer contraseña',
      en: 'Reset password'
    },
    resetting: {
      es: 'Restableciendo...',
      en: 'Resetting...'
    },
    linkExpiredTitle: {
      es: 'Enlace de restablecimiento expirado',
      en: 'Password reset link expired'
    },
    linkExpiredMessage: {
      es: 'Este enlace de restablecimiento ha expirado o es inválido. Por tu seguridad, los enlaces expiran después de 60 minutos.',
      en: 'This password reset link has expired or is invalid. For your security, password reset links expire after 60 minutes.'
    },
    requestNewLink: {
      es: 'Solicitar un nuevo enlace',
      en: 'Request a new password reset link'
    },
    rememberPassword: {
      es: '¿Recordaste tu contraseña?',
      en: 'Remember your password?'
    },
    signIn: {
      es: 'Iniciar Sesión',
      en: 'Sign in'
    },
    backToHome: {
      es: 'Volver al Inicio',
      en: 'Back to Home'
    }
  };
  
  // Get reactive translations
  const t = createTranslations(translations);
  
  // Check for token errors
  const hasTokenError = computed(() => {
    return data.errors?.email?.some(error => 
      error.toLowerCase().includes('token') || 
      error.toLowerCase().includes('expired') ||
      error.toLowerCase().includes('invalid')
    ) || !route.query.token;
  });
  
  // Check if token exists on mount
  onMounted(() => {
    if (!route.query.token) {
      // No token provided, show error immediately
      data.errors = {
        email: ['This password reset link is invalid.']
      };
    }
  });
  
  // Clear errors when typing (except token errors)
  watch(() => data.form, (newForm) => {
    if (!hasTokenError.value) {
      data.errors = {};
      errorMessage.value = '';
    }
  }, { deep: true });
  
  // Check if passwords match
  const passwordsMatch = computed(() => {
    if (!data.form.password || !data.form.password_confirmation) return true;
    return data.form.password === data.form.password_confirmation;
  });
  
  const onSubmit = async () => {
    data.loading = true;
    errorMessage.value = '';
    
    try {
      await $customFetch("/auth/reset-password", {
        method: "POST",
        body: data.form,
      });
  
      // Navigate to app after successful reset
      await navigateTo('/app');
      
    } catch (error) {
      if (error.data?.errors) {
        data.errors = error.data.errors;
      } else if (error.data?.message) {
        errorMessage.value = error.data.message;
      } else {
        errorMessage.value = t.value.generalError || "An error occurred. Please try again.";
      }
    } finally {
      data.loading = false;
    }
  };
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