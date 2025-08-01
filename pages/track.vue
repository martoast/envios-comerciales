<!-- pages/track.vue -->
<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <NuxtLink to="/" class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeftIcon class="w-5 h-5 mr-2" />
            {{ t.backToHome }}
          </NuxtLink>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Page Title -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <MagnifyingGlassIcon class="w-8 h-8 text-primary-600" />
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {{ t.pageTitle }}
          </h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ t.pageSubtitle }}
          </p>
        </div>
  
        <!-- Search Form -->
        <div v-if="!trackingData" class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <form @submit.prevent="handleTrack" class="space-y-6">
            <div>
              <label for="tracking_number" class="block text-sm font-semibold text-gray-900 mb-2">
                {{ t.trackingLabel }}
              </label>
              <div class="relative">
                <input
                  v-model="trackingNumber"
                  type="text"
                  id="tracking_number"
                  :placeholder="t.trackingPlaceholder"
                  class="w-full py-4 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  :disabled="loading"
                  required
                  @input="clearError"
                >
              </div>
              <p v-if="error" class="mt-2 text-sm text-red-600 flex items-center">
                <ExclamationCircleIcon class="w-4 h-4 mr-1" />
                {{ error }}
              </p>
            </div>
  
            <button
              type="submit"
              :disabled="loading || !trackingNumber.trim()"
              class="w-full py-4 px-6 rounded-lg font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
            >
              <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <MagnifyingGlassIcon v-else class="w-5 h-5" />
              <span>{{ loading ? t.searching : t.searchButton }}</span>
            </button>
          </form>
  
          <!-- Example tracking numbers -->
          <div class="mt-6 pt-6 border-t border-gray-100">
            <p class="text-sm text-gray-500 text-center">
              {{ t.exampleText }}
            </p>
          </div>
        </div>
  
        <!-- Tracking Results -->
        <Transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div v-if="trackingData" class="space-y-6">
            <!-- Status Card -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
              <!-- Status Header -->
              <div :class="getStatusColor(trackingData.status)" class="p-6 text-white">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="text-sm opacity-90">{{ t.trackingNumber }}</p>
                    <p class="text-2xl font-bold">{{ trackingData.tracking_number }}</p>
                  </div>
                  <div :class="getStatusIconBg(trackingData.status)" class="p-3 rounded-full">
                    <component :is="getStatusIconComponent(trackingData.status)" class="w-8 h-8" />
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20">
                    {{ trackingData.status_label }}
                  </span>
                  <span class="text-sm opacity-75">
                    {{ t.lastUpdated }}: {{ formatDate(trackingData.last_updated) }}
                  </span>
                </div>
              </div>
  
              <!-- Status Message -->
              <div class="p-6 bg-gray-50 border-b">
                <p class="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <InformationCircleIcon class="w-5 h-5 text-primary-500" />
                  {{ trackingData.message }}
                </p>
              </div>
  
              <!-- Progress Bar (if applicable) -->
              <div v-if="trackingData.arrival_progress && trackingData.status === 'awaiting_packages'" class="p-6 border-b">
                <div class="mb-2 flex justify-between text-sm">
                  <span class="font-medium text-gray-700">{{ t.packageProgress }}</span>
                  <span class="text-gray-500">
                    {{ trackingData.arrival_progress.items_arrived }} / {{ trackingData.arrival_progress.items_total }} {{ t.items }}
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    class="bg-primary-600 h-full rounded-full transition-all duration-500"
                    :style="`width: ${trackingData.arrival_progress.percentage}%`"
                  ></div>
                </div>
              </div>
  
              <!-- Details Grid -->
              <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p class="text-sm text-gray-500 mb-1">{{ t.orderDate }}</p>
                  <p class="font-semibold text-gray-900">{{ formatDate(trackingData.created_at) }}</p>
                </div>
                
                <div v-if="trackingData.box_size">
                  <p class="text-sm text-gray-500 mb-1">{{ t.boxSize }}</p>
                  <p class="font-semibold text-gray-900">{{ trackingData.box_size }}</p>
                </div>
  
                <div v-if="trackingData.total_weight_kg">
                  <p class="text-sm text-gray-500 mb-1">{{ t.totalWeight }}</p>
                  <p class="font-semibold text-gray-900">{{ trackingData.total_weight_kg }} kg</p>
                </div>
  
                <div v-if="trackingData.delivery_location">
                  <p class="text-sm text-gray-500 mb-1">{{ t.deliveryLocation }}</p>
                  <p class="font-semibold text-gray-900">
                    {{ trackingData.delivery_location.municipio }}, {{ trackingData.delivery_location.estado }}
                  </p>
                </div>
  
                <div v-if="trackingData.shipped_at">
                  <p class="text-sm text-gray-500 mb-1">{{ t.shippedDate }}</p>
                  <p class="font-semibold text-gray-900">{{ formatDate(trackingData.shipped_at) }}</p>
                </div>
  
                <div v-if="trackingData.estimated_delivery">
                  <p class="text-sm text-gray-500 mb-1">{{ t.estimatedDelivery }}</p>
                  <p class="font-semibold text-gray-900">{{ formatDate(trackingData.estimated_delivery) }}</p>
                </div>
  
                <div v-if="trackingData.delivered_at">
                  <p class="text-sm text-gray-500 mb-1">{{ t.deliveredDate }}</p>
                  <p class="font-semibold text-gray-900">{{ formatDate(trackingData.delivered_at) }}</p>
                </div>
              </div>
  
              <!-- CTA Section -->
              <div class="p-6 bg-primary-50 border-t">
                <div class="text-center">
                  <p class="text-gray-700 mb-4">{{ t.moreDetailsText }}</p>
                  <NuxtLink 
                    :to="`/app/orders/${trackingData.id}`"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <EyeIcon class="w-5 h-5" />
                    {{ t.viewOrderDetails }}
                    <ArrowRightIcon class="w-4 h-4" />
                  </NuxtLink>
                </div>
              </div>
            </div>
  
            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                @click="resetSearch"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowPathIcon class="w-5 h-5" />
                {{ t.trackAnother }}
              </button>
              
              <NuxtLink
                to="/register"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <UserPlusIcon class="w-5 h-5" />
                {{ t.createAccount }}
              </NuxtLink>
            </div>
          </div>
        </Transition>
  
        <!-- Not Found State -->
        <Transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
        >
          <div v-if="notFound" class="bg-white rounded-xl shadow-lg p-8 text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <XCircleIcon class="w-8 h-8 text-red-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ t.notFoundTitle }}</h3>
            <p class="text-gray-600 mb-6">{{ t.notFoundMessage }}</p>
            <button
              @click="resetSearch"
              class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowPathIcon class="w-5 h-5" />
              {{ t.tryAgain }}
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { 
    ArrowLeftIcon,
    MagnifyingGlassIcon,
    QrCodeIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    EyeIcon,
    ArrowRightIcon,
    ArrowPathIcon,
    UserPlusIcon,
    XCircleIcon,
    ShoppingCartIcon,
    ClockIcon,
    CheckCircleIcon,
    TruckIcon,
    CheckBadgeIcon,
    QuestionMarkCircleIcon
  } from '@heroicons/vue/24/outline'
  
  const { $customFetch } = useNuxtApp()
  const { t: createTranslations } = useLanguage()
  
  // State
  const trackingNumber = ref('')
  const loading = ref(false)
  const error = ref('')
  const trackingData = ref(null)
  const notFound = ref(false)
  
  // Translations
  const translations = {
    backToHome: {
      es: 'Volver al inicio',
      en: 'Back to home'
    },
    pageTitle: {
      es: 'Rastrea tu Envio',
      en: 'Track Your Shipment'
    },
    pageSubtitle: {
      es: 'Ingresa tu número de rastreo para ver el estado actual de tu envío',
      en: 'Enter your tracking number to see the current status of your shipment'
    },
    trackingLabel: {
      es: 'Número de Rastreo',
      en: 'Tracking Number'
    },
    trackingPlaceholder: {
      es: 'Ej: TRK-A3F7B2C9-4E8D',
      en: 'Ex: TRK-A3F7B2C9-4E8D'
    },
    searchButton: {
      es: 'Buscar Paquete',
      en: 'Search Package'
    },
    searching: {
      es: 'Buscando...',
      en: 'Searching...'
    },
    exampleText: {
      es: 'Ejemplo: TRK-A3F7B2C9-4E8D',
      en: 'Example: TRK-A3F7B2C9-4E8D'
    },
    trackingNumber: {
      es: 'Número de Rastreo',
      en: 'Tracking Number'
    },
    lastUpdated: {
      es: 'Última actualización',
      en: 'Last updated'
    },
    packageProgress: {
      es: 'Progreso de Paquetes',
      en: 'Package Progress'
    },
    items: {
      es: 'artículos',
      en: 'items'
    },
    orderDate: {
      es: 'Fecha de Orden',
      en: 'Order Date'
    },
    boxSize: {
      es: 'Tamaño de Caja',
      en: 'Box Size'
    },
    totalWeight: {
      es: 'Peso Total',
      en: 'Total Weight'
    },
    deliveryLocation: {
      es: 'Destino de Entrega',
      en: 'Delivery Location'
    },
    shippedDate: {
      es: 'Fecha de Envío',
      en: 'Shipped Date'
    },
    estimatedDelivery: {
      es: 'Entrega Estimada',
      en: 'Estimated Delivery'
    },
    deliveredDate: {
      es: 'Fecha de Entrega',
      en: 'Delivered Date'
    },
    moreDetailsText: {
      es: '¿Necesitas más información sobre tu pedido?',
      en: 'Need more information about your order?'
    },
    viewOrderDetails: {
      es: 'Ver Detalles Completos',
      en: 'View Full Details'
    },
    trackAnother: {
      es: 'Rastrear Otro Paquete',
      en: 'Track Another Package'
    },
    createAccount: {
      es: 'Crear Cuenta',
      en: 'Create Account'
    },
    notFoundTitle: {
      es: 'Paquete No Encontrado',
      en: 'Package Not Found'
    },
    notFoundMessage: {
      es: 'No encontramos ningún paquete con ese número de rastreo. Por favor verifica e intenta nuevamente.',
      en: 'We couldn\'t find any package with that tracking number. Please verify and try again.'
    },
    tryAgain: {
      es: 'Intentar de Nuevo',
      en: 'Try Again'
    }
  }
  
  const t = createTranslations(translations)
  
  // Methods
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: dateString.includes(':') ? '2-digit' : undefined,
      minute: dateString.includes(':') ? '2-digit' : undefined
    })
  }
  
  const getStatusColor = (status: string) => {
    const colors = {
      'collecting': 'bg-gray-600',
      'awaiting_packages': 'bg-yellow-600',
      'packages_complete': 'bg-primary-600',
      'shipped': 'bg-indigo-600',
      'delivered': 'bg-green-600'
    }
    return colors[status] || 'bg-gray-600'
  }
  
  const getStatusIconComponent = (status: string) => {
    const icons = {
      'collecting': ShoppingCartIcon,
      'awaiting_packages': ClockIcon,
      'packages_complete': CheckCircleIcon,
      'shipped': TruckIcon,
      'delivered': CheckBadgeIcon
    }
    return icons[status] || QuestionMarkCircleIcon
  }
  
  const getStatusIconBg = (status: string) => {
    const colors = {
      'collecting': 'bg-gray-700',
      'awaiting_packages': 'bg-yellow-700',
      'packages_complete': 'bg-primary-700',
      'shipped': 'bg-indigo-700',
      'delivered': 'bg-green-700'
    }
    return colors[status] || 'bg-gray-700'
  }
  
  const clearError = () => {
    error.value = ''
  }
  
  const resetSearch = () => {
    trackingNumber.value = ''
    trackingData.value = null
    notFound.value = false
    error.value = ''
  }
  
  const handleTrack = async () => {
    if (!trackingNumber.value.trim()) {
      error.value = 'Por favor ingresa un número de rastreo'
      return
    }
  
    loading.value = true
    error.value = ''
    notFound.value = false
    trackingData.value = null
  
    try {
      const response = await $customFetch('/track', {
        method: 'POST',
        body: {
          tracking_number: trackingNumber.value.trim()
        }
      })
  
      if (response.success && response.data) {
        trackingData.value = response.data
      }
    } catch (err: any) {
      console.error('Tracking error:', err)
      if (err.statusCode === 404 || err.data?.message?.includes('No order found')) {
        notFound.value = true
      } else {
        error.value = err.data?.message || 'Error al buscar el paquete. Por favor intenta de nuevo.'
      }
    } finally {
      loading.value = false
    }
  }
  
  // SEO
  useSeoMeta({
    title: 'Rastrear Paquete - Envios Comerciales TJ',
    description: 'Rastrea el status de tu envio. Ingresa tu número de rastreo para ver el estado actual de tu envío.',
  })
  </script>