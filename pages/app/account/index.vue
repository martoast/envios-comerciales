<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.myAccount }}</h1>
              <p class="mt-1 text-sm text-gray-600">{{ t.manageYourInfo }}</p>
            </div>
            <NuxtLink
              to="/app/account/edit"
              class="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-all"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              {{ t.editProfile }}
            </NuxtLink>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column - Profile Info -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Basic Information -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-100">
                <h2 class="text-lg font-bold text-gray-900">{{ t.basicInformation }}</h2>
              </div>
              <div class="p-6 space-y-4">
                <!-- Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-500 mb-1">{{ t.fullName }}</label>
                  <p class="text-base text-gray-900">{{ profileData?.name || '-' }}</p>
                </div>
                
                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-gray-500 mb-1">{{ t.email }}</label>
                  <div class="flex items-center gap-2">
                    <p class="text-base text-gray-900">{{ profileData?.email || '-' }}</p>
                    <span v-if="!user?.email_verified_at" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      {{ t.unverified }}
                    </span>
                    <span v-else class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {{ t.verified }}
                    </span>
                  </div>
                </div>
                
                <!-- Phone -->
                <div>
                  <label class="block text-sm font-medium text-gray-500 mb-1">{{ t.phone }}</label>
                  <p class="text-base text-gray-900">{{ profileData?.phone || t.notProvided }}</p>
                </div>
                
                <!-- Language -->
                <div>
                  <label class="block text-sm font-medium text-gray-500 mb-1">{{ t.preferredLanguage }}</label>
                  <p class="text-base text-gray-900">
                    {{ currentLanguageDisplay }}
                  </p>
                </div>
  
                <!-- Member Since -->
                <div>
                  <label class="block text-sm font-medium text-gray-500 mb-1">{{ t.memberSince }}</label>
                  <p class="text-base text-gray-900">{{ formatDate(profileData?.created_at) }}</p>
                </div>
              </div>
            </div>
  
            <!-- Shipping Address -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 class="text-lg font-bold text-gray-900">{{ t.shippingAddress }}</h2>
                <div class="flex items-center gap-2">
                  <span v-if="!profileData?.has_complete_address" class="text-sm text-amber-600 font-medium">
                    {{ t.incomplete }}
                  </span>
                  <NuxtLink
                    v-if="profileData?.has_complete_address"
                    to="/app/account/shipping-address"
                    class="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                  >
                    {{ t.editAddress }}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </NuxtLink>
                </div>
              </div>
              <div class="p-6">
                <div v-if="profileData?.has_complete_address" class="space-y-2">
                  <p class="text-gray-900">
                    {{ profileData.address.street }} {{ profileData.address.exterior_number }}
                    <span v-if="profileData.address.interior_number">Int. {{ profileData.address.interior_number }}</span>
                  </p>
                  <p class="text-gray-900">{{ profileData.address.colonia }}</p>
                  <p class="text-gray-900">{{ profileData.address.municipio }}, {{ profileData.address.estado }}</p>
                  <p class="text-gray-900">C.P. {{ profileData.address.postal_code }}</p>
                </div>
                <div v-else class="text-center py-8">
                  <div class="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <p class="text-gray-500 mb-4">{{ t.noAddressSet }}</p>
                  <NuxtLink
                    to="/app/account/shipping-address"
                    class="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    {{ t.addAddress }}
                  </NuxtLink>
                </div>
              </div>
            </div>
  
            <!-- Payment Method -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-100">
                <h2 class="text-lg font-bold text-gray-900">{{ t.paymentMethod }}</h2>
              </div>
              <div class="p-6">
                <div v-if="user?.pm_last_four" class="flex items-center gap-3">
                  <div class="p-2 bg-gray-100 rounded-lg">
                    <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-900 font-medium">{{ user.pm_type === 'card' ? 'Card' : user.pm_type }} •••• {{ user.pm_last_four }}</p>
                    <p class="text-sm text-gray-500">{{ t.defaultPayment }}</p>
                  </div>
                </div>
                <div v-else class="text-center py-8">
                  <div class="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                  </div>
                  <p class="text-gray-500 mb-4">{{ t.noPaymentMethod }}</p>
                  <button class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    {{ t.addPaymentMethod }}
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Right Column - Stats & Actions -->
          <div class="space-y-6">
            <!-- Support -->
            <div class="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-6 border border-primary-200/50">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-primary-100 rounded-lg">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900">{{ t.needHelp }}</h3>
              </div>
              <p class="text-sm text-gray-700 mb-4">{{ t.supportText }}</p>
              <a
                href="/app/help"
                class="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
              >
                {{ t.getSupport }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  
  definePageMeta({
    layout: 'app',
    middleware: ['auth', 'customer']
  })
  
  // Nuxt imports
  const { $customFetch } = useNuxtApp()
  const user = useUser().value
  const router = useRouter()
  
  // Use the language composable
  const { t: createTranslations, language } = useLanguage()
  
  // State
  const profileData = ref(null)
  const loading = ref(true)
  
  // Computed property for current language display
  const currentLanguageDisplay = computed(() => {
    // Use the current language from the composable, not just profileData
    return language.value === 'es' ? 'Español' : 'English'
  })
  
  // Translations
  const translations = {
    myAccount: {
      es: 'Mi Cuenta',
      en: 'My Account'
    },
    manageYourInfo: {
      es: 'Administra tu información personal y preferencias',
      en: 'Manage your personal information and preferences'
    },
    editProfile: {
      es: 'Editar Perfil',
      en: 'Edit Profile'
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
    memberSince: {
      es: 'Miembro Desde',
      en: 'Member Since'
    },
    shippingAddress: {
      es: 'Dirección de Envío',
      en: 'Shipping Address'
    },
    paymentMethod: {
      es: 'Método de Pago',
      en: 'Payment Method'
    },
    accountStats: {
      es: 'Estadísticas de Cuenta',
      en: 'Account Stats'
    },
    totalOrders: {
      es: 'Total de Órdenes',
      en: 'Total Orders'
    },
    activeOrders: {
      es: 'Órdenes Activas',
      en: 'Active Orders'
    },
    completedOrders: {
      es: 'Órdenes Completadas',
      en: 'Completed Orders'
    },
    quickActions: {
      es: 'Acciones Rápidas',
      en: 'Quick Actions'
    },
    viewOrders: {
      es: 'Ver Órdenes',
      en: 'View Orders'
    },
    viewUSAddress: {
      es: 'Ver Dirección USA',
      en: 'View US Address'
    },
    logout: {
      es: 'Cerrar Sesión',
      en: 'Logout'
    },
    needHelp: {
      es: '¿Necesitas Ayuda?',
      en: 'Need Help?'
    },
    supportText: {
      es: 'Nuestro equipo está aquí para ayudarte',
      en: 'Our team is here to help you'
    },
    getSupport: {
      es: 'Obtener Soporte',
      en: 'Get Support'
    },
    notProvided: {
      es: 'No proporcionado',
      en: 'Not provided'
    },
    verified: {
      es: 'Verificado',
      en: 'Verified'
    },
    unverified: {
      es: 'No verificado',
      en: 'Unverified'
    },
    incomplete: {
      es: 'Incompleto',
      en: 'Incomplete'
    },
    noAddressSet: {
      es: 'No has configurado tu dirección de envío',
      en: 'You haven\'t set up your shipping address'
    },
    addAddress: {
      es: 'Agregar Dirección',
      en: 'Add Address'
    },
    defaultPayment: {
      es: 'Método de pago predeterminado',
      en: 'Default payment method'
    },
    noPaymentMethod: {
      es: 'No has agregado un método de pago',
      en: 'You haven\'t added a payment method'
    },
    addPaymentMethod: {
      es: 'Agregar Método de Pago',
      en: 'Add Payment Method'
    },
    editAddress: {
      es: 'Editar',
      en: 'Edit'
    }
  }
  
  // Get reactive translations
  const t = createTranslations(translations)
  
  // Methods
  const fetchProfile = async () => {
    loading.value = true
    try {
      const response = await $customFetch('/profile')
      profileData.value = response.data
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      loading.value = false
    }
  }
  
  const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }
  
  const handleLogout = async () => {
    try {
      await $customFetch('/auth/logout', {
        method: 'POST'
      })
      
      useState('user', () => null)
      const csrfCookie = useCookie('XSRF-TOKEN')
      csrfCookie.value = null
      
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
  
  // Fetch profile on mount
  onMounted(() => {
    fetchProfile()
  })
  </script>