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
                class="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
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
          <p class="text-sm text-gray-500 text-center mb-3">
            {{ t.supportedCarriers }}
          </p>
          <div class="flex flex-wrap justify-center gap-2">
            <span v-for="carrier in popularCarriers" :key="carrier" class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {{ carrier }}
            </span>
          </div>
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
            <div :class="getStatusColor(trackingData.status.tag)" class="p-6 text-white">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <p class="text-sm opacity-90">{{ t.trackingNumber }}</p>
                  <p class="text-2xl font-bold">{{ trackingData.tracking_number }}</p>
                </div>
                <div class="flex items-center gap-3">
                  <div :class="getStatusIconBg(trackingData.status.tag)" class="p-3 rounded-full">
                    <component :is="getStatusIconComponent(trackingData.status.tag)" class="w-8 h-8" />
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <span class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/20">
                  {{ getStatusLabel(trackingData.status.tag) }}
                </span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10">
                  <TruckIcon class="w-3.5 h-3.5" />
                  {{ trackingData.carrier.name }}
                </span>
              </div>
            </div>

            <!-- Status Message -->
            <div class="p-6 bg-gray-50 border-b">
              <p class="text-lg font-medium text-gray-900 flex items-center gap-2">
                <InformationCircleIcon class="w-5 h-5 text-primary-500" />
                {{ trackingData.status.message }}
              </p>
              <p v-if="trackingData.last_update" class="mt-2 text-sm text-gray-500">
                {{ t.lastUpdated }}: {{ formatDate(trackingData.last_update) }}
              </p>
            </div>

            <!-- Details Grid -->
            <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div v-if="trackingData.carrier">
                <p class="text-sm text-gray-500 mb-1">{{ t.carrier }}</p>
                <p class="font-semibold text-gray-900">{{ trackingData.carrier.name }}</p>
              </div>
              
              <div v-if="trackingData.service_type">
                <p class="text-sm text-gray-500 mb-1">{{ t.serviceType }}</p>
                <p class="font-semibold text-gray-900">{{ trackingData.service_type }}</p>
              </div>

              <div v-if="trackingData.origin?.location">
                <p class="text-sm text-gray-500 mb-1">{{ t.origin }}</p>
                <p class="font-semibold text-gray-900">{{ trackingData.origin.location }}</p>
              </div>

              <div v-if="trackingData.destination?.location">
                <p class="text-sm text-gray-500 mb-1">{{ t.destination }}</p>
                <p class="font-semibold text-gray-900">{{ trackingData.destination.location }}</p>
              </div>

              <div v-if="trackingData.estimated_delivery">
                <p class="text-sm text-gray-500 mb-1">{{ t.estimatedDelivery }}</p>
                <p class="font-semibold text-gray-900">{{ formatDate(trackingData.estimated_delivery) }}</p>
              </div>

              <div v-if="trackingData.tracking_url">
                <p class="text-sm text-gray-500 mb-1">{{ t.carrierTracking }}</p>
                <a 
                  :href="trackingData.tracking_url" 
                  target="_blank"
                  class="font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                >
                  {{ t.viewOnCarrier }}
                  <ArrowTopRightOnSquareIcon class="w-4 h-4" />
                </a>
              </div>
            </div>

            <!-- Tracking History -->
            <div v-if="trackingData.checkpoints && trackingData.checkpoints.length > 0" class="p-6 border-t bg-gray-50">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ClockIcon class="w-5 h-5 text-primary-600" />
                {{ t.trackingHistory }}
              </h3>
              <div class="space-y-4">
                <div 
                  v-for="(checkpoint, index) in trackingData.checkpoints" 
                  :key="index"
                  class="flex gap-4 relative"
                >
                  <!-- Timeline dot -->
                  <div class="flex-shrink-0 relative">
                    <div :class="index === 0 ? 'bg-primary-600' : 'bg-gray-300'" class="w-3 h-3 rounded-full mt-1.5"></div>
                    <div v-if="index < trackingData.checkpoints.length - 1" class="absolute top-5 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
                  </div>
                  
                  <!-- Content -->
                  <div class="flex-1 pb-6">
                    <p class="font-medium text-gray-900">{{ checkpoint.message }}</p>
                    <p v-if="checkpoint.location" class="text-sm text-gray-600 mt-1">
                      {{ checkpoint.location }}
                    </p>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ formatDate(checkpoint.time) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA Section -->
            <div class="p-6 bg-primary-50 border-t">
              <div class="text-center">
                <p class="text-gray-700 mb-4">{{ t.needHelp }}</p>
                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                  <NuxtLink 
                    to="/register"
                    class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <UserPlusIcon class="w-5 h-5" />
                    {{ t.createAccount }}
                  </NuxtLink>
                  <a
                    href="https://wa.me/16195591910"
                    target="_blank"
                    class="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-200"
                  >
                    <ChatBubbleLeftRightIcon class="w-5 h-5" />
                    {{ t.contactSupport }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-center">
            <button
              @click="resetSearch"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowPathIcon class="w-5 h-5" />
              {{ t.trackAnother }}
            </button>
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
  ExclamationCircleIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  UserPlusIcon,
  XCircleIcon,
  ShoppingCartIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  CheckBadgeIcon,
  QuestionMarkCircleIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline'

const { $customFetch } = useNuxtApp()
const { t: createTranslations } = useLanguage()

// State
const trackingNumber = ref('')
const loading = ref(false)
const error = ref('')
const trackingData = ref(null)
const notFound = ref(false)

// Popular carriers for display
const popularCarriers = ['USPS', 'FedEx', 'UPS', 'DHL', 'Estafeta', 'Redpack', 'OnTrac']

// Translations
const translations = {
  backToHome: {
    es: 'Volver al inicio',
    en: 'Back to home'
  },
  pageTitle: {
    es: 'Rastrea tu Envío',
    en: 'Track Your Shipment'
  },
  pageSubtitle: {
    es: 'Ingresa tu número de rastreo para ver el estado actual de tu paquete en tiempo real',
    en: 'Enter your tracking number to see real-time status of your package'
  },
  trackingLabel: {
    es: 'Número de Rastreo',
    en: 'Tracking Number'
  },
  trackingPlaceholder: {
    es: 'Ej: 9400108106244446274792',
    en: 'Ex: 9400108106244446274792'
  },
  searchButton: {
    es: 'Buscar Paquete',
    en: 'Track Package'
  },
  searching: {
    es: 'Buscando...',
    en: 'Searching...'
  },
  supportedCarriers: {
    es: 'Soportamos más de 1,400 paqueterías incluyendo:',
    en: 'We support 1,400+ carriers including:'
  },
  trackingNumber: {
    es: 'Número de Rastreo',
    en: 'Tracking Number'
  },
  lastUpdated: {
    es: 'Última actualización',
    en: 'Last updated'
  },
  carrier: {
    es: 'Paquetería',
    en: 'Carrier'
  },
  serviceType: {
    es: 'Tipo de Servicio',
    en: 'Service Type'
  },
  origin: {
    es: 'Origen',
    en: 'Origin'
  },
  destination: {
    es: 'Destino',
    en: 'Destination'
  },
  estimatedDelivery: {
    es: 'Entrega Estimada',
    en: 'Estimated Delivery'
  },
  carrierTracking: {
    es: 'Rastreo Original',
    en: 'Carrier Tracking'
  },
  viewOnCarrier: {
    es: 'Ver en Paquetería',
    en: 'View on Carrier'
  },
  trackingHistory: {
    es: 'Historial de Rastreo',
    en: 'Tracking History'
  },
  needHelp: {
    es: '¿Necesitas ayuda con tu envío?',
    en: 'Need help with your shipment?'
  },
  createAccount: {
    es: 'Crear Cuenta',
    en: 'Create Account'
  },
  contactSupport: {
    es: 'Contactar Soporte',
    en: 'Contact Support'
  },
  trackAnother: {
    es: 'Rastrear Otro Paquete',
    en: 'Track Another Package'
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
  },
  // Status labels
  statusPending: {
    es: 'Pendiente',
    en: 'Pending'
  },
  statusInfoReceived: {
    es: 'Información Recibida',
    en: 'Info Received'
  },
  statusInTransit: {
    es: 'En Tránsito',
    en: 'In Transit'
  },
  statusOutForDelivery: {
    es: 'En Reparto',
    en: 'Out for Delivery'
  },
  statusAttemptFail: {
    es: 'Intento Fallido',
    en: 'Delivery Attempt Failed'
  },
  statusDelivered: {
    es: 'Entregado',
    en: 'Delivered'
  },
  statusAvailableForPickup: {
    es: 'Disponible para Recoger',
    en: 'Available for Pickup'
  },
  statusException: {
    es: 'Excepción',
    en: 'Exception'
  },
  statusExpired: {
    es: 'Expirado',
    en: 'Expired'
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
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusLabel = (status: string) => {
  const statusMap = {
    'Pending': t.value.statusPending,
    'InfoReceived': t.value.statusInfoReceived,
    'InTransit': t.value.statusInTransit,
    'OutForDelivery': t.value.statusOutForDelivery,
    'AttemptFail': t.value.statusAttemptFail,
    'Delivered': t.value.statusDelivered,
    'AvailableForPickup': t.value.statusAvailableForPickup,
    'Exception': t.value.statusException,
    'Expired': t.value.statusExpired
  }
  return statusMap[status] || status
}

const getStatusColor = (status: string) => {
  const colors = {
    'Pending': 'bg-gray-600',
    'InfoReceived': 'bg-yellow-600',
    'InTransit': 'bg-primary-600',
    'OutForDelivery': 'bg-indigo-600',
    'AttemptFail': 'bg-orange-600',
    'Delivered': 'bg-green-600',
    'AvailableForPickup': 'bg-blue-600',
    'Exception': 'bg-red-600',
    'Expired': 'bg-gray-500'
  }
  return colors[status] || 'bg-gray-600'
}

const getStatusIconComponent = (status: string) => {
  const icons = {
    'Pending': ClockIcon,
    'InfoReceived': InformationCircleIcon,
    'InTransit': TruckIcon,
    'OutForDelivery': TruckIcon,
    'AttemptFail': ExclamationCircleIcon,
    'Delivered': CheckBadgeIcon,
    'AvailableForPickup': ShoppingCartIcon,
    'Exception': XCircleIcon,
    'Expired': ClockIcon
  }
  return icons[status] || QuestionMarkCircleIcon
}

const getStatusIconBg = (status: string) => {
  return 'bg-white/20'
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
    error.value = t.value.trackingPlaceholder
    return
  }

  loading.value = true
  error.value = ''
  notFound.value = false
  trackingData.value = null

  try {
    const response = await $customFetch('/shipment-tracking/track', {
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
    if (err.statusCode === 404 || err.data?.message?.includes('not found')) {
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
  title: 'Rastrear Paquete - Boxly',
  description: 'Rastrea el status de tu envío en tiempo real. Soportamos más de 1,400 paqueterías incluyendo USPS, FedEx, UPS, DHL, Estafeta, Redpack y más.',
})
</script>