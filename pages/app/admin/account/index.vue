<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.myAccount }}</h1>
              <p class="mt-1 text-sm text-gray-600">{{ t.adminAccountInfo }}</p>
            </div>
            <NuxtLink
              to="/app/admin/account/edit"
              class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
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
              <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 class="text-lg font-bold text-gray-900">{{ t.basicInformation }}</h2>
                <NuxtLink
                  to="/app/admin/account/edit"
                  class="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                >
                  {{ t.edit }}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </NuxtLink>
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
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {{ t.adminRole }}
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
  
           
          </div>
  
          <!-- Right Column - Quick Actions -->
          <div class="space-y-6">
            <!-- Quick Actions -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-100">
                <h3 class="font-semibold text-gray-900">{{ t.quickActions }}</h3>
              </div>
              <div class="p-6 space-y-3">
                <NuxtLink
                  to="/app/admin"
                  class="w-full flex items-center gap-3 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  {{ t.goToDashboard }}
                </NuxtLink>
                
                <NuxtLink
                  to="/app/admin/orders"
                  class="w-full flex items-center gap-3 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                  {{ t.manageOrders }}
                </NuxtLink>
                
                <NuxtLink
                  to="/app/admin/packages"
                  class="w-full flex items-center gap-3 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                  {{ t.viewPackages }}
                </NuxtLink>
                
                <button
                  @click="handleLogout"
                  class="w-full flex items-center gap-3 px-4 py-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  {{ t.logout }}
                </button>
              </div>
            </div>
  
            <!-- Support -->
            <div class="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/50">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900">{{ t.adminSupport }}</h3>
              </div>
              <p class="text-sm text-gray-700 mb-4">{{ t.adminSupportText }}</p>
              <a
                href="mailto:support@paquetecuba.com"
                class="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                {{ t.contactSupport }}
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
    layout: 'admin',
    middleware: ['auth', 'admin']
  })
  
  // Nuxt imports
  const { $customFetch } = useNuxtApp()
  const user = useUser().value
  
  // Use the language composable
  const { t: createTranslations, language } = useLanguage()
  
  // State
  const profileData = ref(null)
  const loading = ref(true)
  
  // Computed property for current language display
  const currentLanguageDisplay = computed(() => {
    return language.value === 'es' ? 'Español' : 'English'
  })
  
  // Translations
  const translations = {
    myAccount: {
      es: 'Mi Cuenta',
      en: 'My Account'
    },
    adminAccountInfo: {
      es: 'Panel de administrador y configuración de cuenta',
      en: 'Admin panel and account settings'
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
    adminRole: {
      es: 'Administrador',
      en: 'Administrator'
    },
    quickActions: {
      es: 'Acciones Rápidas',
      en: 'Quick Actions'
    },
    goToDashboard: {
      es: 'Ir al Dashboard',
      en: 'Go to Dashboard'
    },
    manageOrders: {
      es: 'Administrar Órdenes',
      en: 'Manage Orders'
    },
    viewPackages: {
      es: 'Ver Paquetes',
      en: 'View Packages'
    },
    logout: {
      es: 'Cerrar Sesión',
      en: 'Logout'
    },
    adminSupport: {
      es: 'Soporte Técnico',
      en: 'Technical Support'
    },
    adminSupportText: {
      es: 'Contacta al equipo técnico para soporte del sistema',
      en: 'Contact technical team for system support'
    },
    contactSupport: {
      es: 'Contactar Soporte',
      en: 'Contact Support'
    },
    notProvided: {
      es: 'No proporcionado',
      en: 'Not provided'
    },
    edit: {
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
    const locale = language.value === 'es' ? 'es-MX' : 'en-US'
    return new Date(date).toLocaleDateString(locale, {
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
  
  // Fetch data on mount
  onMounted(() => {
    fetchProfile()
  })
  </script>