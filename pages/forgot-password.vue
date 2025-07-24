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
          {{ t.forgotPasswordTitle }}
        </h1>
        <p class="text-sm sm:text-base text-gray-600 max-w-sm mx-auto">
          {{ t.forgotPasswordSubtitle }}
        </p>
      </div>

      <!-- Success Message -->
      <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showSuccess" class="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 shadow-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                {{ t.checkEmail }}
              </h3>
              <div class="mt-2 text-sm text-green-700">
                <p>{{ t.emailSent }} {{ data.form.email }}</p>
              </div>
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
        <div v-if="errorMessage && !data.errors?.email" class="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-md animate-shake">
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

      <!-- Form Card -->
      <div class="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
        <form @submit.prevent="onSubmit" class="space-y-6">
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

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="data.loading || showSuccess"
            class="w-full px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 font-semibold text-base no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
          >
            <svg v-if="data.loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="!data.loading">{{ t.sendResetLink }}</span>
            <span v-else>{{ t.sending }}</span>
          </button>

          <!-- Links -->
          <div class="text-center space-y-2">
            <p class="text-sm text-gray-600">
              {{ t.rememberPassword }}
              <NuxtLink to="/login" class="font-semibold text-primary-500 hover:text-primary-600 hover:underline transition-colors">
                {{ t.signIn }}
              </NuxtLink>
            </p>
            <p class="text-sm text-gray-600">
              {{ t.dontHaveAccount }}
              <NuxtLink to="/register" class="font-semibold text-primary-500 hover:text-primary-600 hover:underline transition-colors">
                {{ t.signUp }}
              </NuxtLink>
            </p>
          </div>
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
definePageMeta({
  middleware: ["loggedin"],
  layout: 'default'
});

const { $customFetch } = useNuxtApp();
const { t: createTranslations } = useLanguage();

const hasError = (field) => {
  return !!data.errors[field];
};

const data = reactive({
  loading: false,
  errors: {},
  form: {
    email: '',
  },
});

const showSuccess = ref(false);
const errorMessage = ref('');

// Translations
const translations = {
  forgotPasswordTitle: {
    es: '¿Olvidaste tu contraseña?',
    en: 'Forgot your password?'
  },
  forgotPasswordSubtitle: {
    es: 'Ingresa tu correo y te enviaremos un enlace para restablecerla',
    en: 'Enter your email and we\'ll send you a reset link'
  },
  emailLabel: {
    es: 'Correo Electrónico',
    en: 'Email Address'
  },
  emailPlaceholder: {
    es: 'tu@email.com',
    en: 'your@email.com'
  },
  sendResetLink: {
    es: 'Enviar enlace de restablecimiento',
    en: 'Send reset link'
  },
  sending: {
    es: 'Enviando...',
    en: 'Sending...'
  },
  checkEmail: {
    es: 'Revisa tu correo',
    en: 'Check your email'
  },
  emailSent: {
    es: 'Hemos enviado un enlace de restablecimiento a',
    en: 'We\'ve sent a password reset link to'
  },
  rememberPassword: {
    es: '¿Recordaste tu contraseña?',
    en: 'Remember your password?'
  },
  signIn: {
    es: 'Iniciar Sesión',
    en: 'Sign in'
  },
  dontHaveAccount: {
    es: '¿No tienes una cuenta?',
    en: 'Don\'t have an account?'
  },
  signUp: {
    es: 'Regístrate',
    en: 'Sign up'
  },
  backToHome: {
    es: 'Volver al Inicio',
    en: 'Back to Home'
  }
};

// Get reactive translations
const t = createTranslations(translations);

// Clear errors when typing
watch(() => data.form.email, () => {
  data.errors = {};
  errorMessage.value = '';
});

const onSubmit = async () => {
  data.loading = true;
  data.errors = {};
  errorMessage.value = '';
  showSuccess.value = false;

  try {
    const response = await $customFetch("/auth/forgot-password", {
      method: "POST",
      body: data.form,
    });

    // Show success message
    showSuccess.value = true;
    
    // Clear form after 3 seconds
    setTimeout(() => {
      data.form.email = '';
    }, 3000);

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