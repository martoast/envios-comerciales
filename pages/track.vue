<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/20 to-gray-50 relative overflow-hidden">
    <!-- Glass overlay to soften background elements -->
    <div class="absolute inset-0 bg-white/40 backdrop-blur-[2px] pointer-events-none"></div>

    <!-- Simplified Animated Background - Small Floating Boxes Only (Desktop Only) -->
    <div class="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
      <!-- Subtle gradient orbs -->
      <div class="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      
      <!-- Small Floating Boxes (6 total) -->
      <div class="absolute top-[15%] left-[8%] opacity-6 animate-float" style="animation-delay: 0s; animation-duration: 8s;">
        <img src="/box.svg" alt="Box" class="w-10 h-10" />
      </div>
      <div class="absolute top-[25%] right-[12%] opacity-6 animate-float" style="animation-delay: 2s; animation-duration: 9s;">
        <img src="/box.svg" alt="Box" class="w-8 h-8" />
      </div>
      <div class="absolute top-[50%] left-[15%] opacity-6 animate-float" style="animation-delay: 4s; animation-duration: 7.5s;">
        <img src="/box.svg" alt="Box" class="w-12 h-12" />
      </div>
      <div class="absolute top-[65%] right-[18%] opacity-6 animate-float" style="animation-delay: 1s; animation-duration: 8.5s;">
        <img src="/box.svg" alt="Box" class="w-9 h-9" />
      </div>
      <div class="absolute bottom-[20%] left-[25%] opacity-6 animate-float" style="animation-delay: 3s; animation-duration: 9.5s;">
        <img src="/box.svg" alt="Box" class="w-11 h-11" />
      </div>
      <div class="absolute bottom-[35%] right-[8%] opacity-6 animate-float" style="animation-delay: 5s; animation-duration: 8s;">
        <img src="/box.svg" alt="Box" class="w-10 h-10" />
      </div>
    </div>

    <!-- Compact Header -->
    <div class="relative bg-white/60 backdrop-blur-md border-b border-gray-100/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <NuxtLink to="/" class="inline-flex items-center text-gray-600 hover:text-primary-600 transition-all duration-200 group text-sm font-medium">
          <ArrowLeftIcon class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {{ t.backToHome }}
        </NuxtLink>
      </div>
    </div>

    <!-- Main Content - Centered -->
    <div class="relative flex items-center justify-center min-h-[calc(100vh-60px)] px-4 sm:px-6 lg:px-8 py-8">
      <div class="w-full max-w-2xl">
        <!-- Compact Title Section -->
        <div class="text-center mb-8">
          <!-- Icon with pulse effect -->
          <div class="relative inline-block mb-4">
            <div class="absolute inset-0 bg-primary-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div class="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
              <MagnifyingGlassIcon class="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 class="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            {{ t.pageTitle }}
          </h1>
          
          <p class="text-base sm:text-lg text-gray-600 mb-4">
            {{ t.pageSubtitle }}
          </p>

          <!-- Carrier Count Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-gray-100">
            <div class="flex -space-x-2">
              <div class="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow-sm">
                US
              </div>
              <div class="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow-sm">
                MX
              </div>
            </div>
            <span class="text-sm font-semibold text-gray-700">
              <span class="text-primary-600 font-black">1,400+</span> {{ language === 'es' ? 'Paqueterías' : 'Carriers' }}
            </span>
            <CheckBadgeIcon class="w-4 h-4 text-green-500" />
          </div>
        </div>

        <!-- Search Form -->
        <div v-if="!trackingData" class="relative">
          <!-- Glass-morphism card -->
          <div class="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <!-- Gradient border effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-blue-500/5 to-primary-500/5 rounded-3xl"></div>
            
            <div class="relative p-6 sm:p-8">
              <form @submit.prevent="handleTrack" class="space-y-5">
                <div>
                  <label for="tracking_number" class="block text-sm font-bold text-gray-900 mb-2">
                    {{ t.trackingLabel }}
                  </label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <input
                      v-model="trackingNumber"
                      type="text"
                      id="tracking_number"
                      :placeholder="t.trackingPlaceholder"
                      class="w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 bg-white/50 backdrop-blur-sm font-medium"
                      :disabled="loading"
                      required
                      @input="clearError"
                    >
                  </div>
                  <p v-if="error" class="mt-2 text-sm text-red-600 flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
                    <ExclamationCircleIcon class="w-4 h-4 flex-shrink-0" />
                    <span>{{ error }}</span>
                  </p>
                </div>

                <button
                  type="submit"
                  :disabled="loading || !trackingNumber.trim()"
                  class="group relative w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-primary-600 via-primary-700 to-blue-600 hover:from-primary-700 hover:via-primary-800 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl overflow-hidden"
                >
                  <!-- Shimmer effect -->
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <span class="relative flex items-center justify-center gap-2">
                    <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <MagnifyingGlassIcon v-else class="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{{ loading ? t.searching : t.searchButton }}</span>
                  </span>
                </button>
              </form>

              <!-- Popular Carriers -->
              <div class="mt-6 pt-6 border-t border-gray-100">
                <p class="text-xs font-semibold text-gray-500 text-center mb-3 uppercase tracking-wide">
                  {{ t.supportedCarriers }}
                </p>
                <div class="flex flex-wrap justify-center gap-2">
                  <span 
                    v-for="carrier in popularCarriers" 
                    :key="carrier" 
                    class="group relative px-3 py-1.5 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary-50 hover:to-primary-100 text-gray-700 hover:text-primary-700 text-xs font-semibold rounded-full border border-gray-200 hover:border-primary-300 transition-all duration-200 cursor-default shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    {{ carrier }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tracking Results -->
        <Transition
          enter-active-class="transition ease-out duration-500"
          enter-from-class="transform opacity-0 scale-95 translate-y-8"
          enter-to-class="transform opacity-100 scale-100 translate-y-0"
          leave-active-class="transition ease-in duration-300"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div v-if="trackingData" class="space-y-6">
            <!-- Status Card -->
            <div class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform hover:scale-[1.01] transition-transform duration-300">
              <!-- Status Header with Gradient -->
              <div :class="getStatusColor(trackingData.status.tag)" class="relative p-6 text-white overflow-hidden">
                <!-- Animated background pattern -->
                <div class="absolute inset-0 opacity-10">
                  <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
                </div>

                <div class="relative">
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div class="flex-1">
                      <p class="text-xs opacity-90 mb-1 font-medium">{{ t.trackingNumber }}</p>
                      <p class="text-xl sm:text-2xl font-black tracking-tight">{{ trackingData.tracking_number }}</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <div :class="getStatusIconBg(trackingData.status.tag)" class="p-3 rounded-2xl shadow-xl transform hover:rotate-12 transition-transform duration-300">
                        <component :is="getStatusIconComponent(trackingData.status.tag)" class="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-white/30 backdrop-blur-sm border border-white/20 shadow-lg">
                      {{ getStatusLabel(trackingData.status.tag) }}
                    </span>
                    <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm border border-white/10">
                      <TruckIcon class="w-3.5 h-3.5" />
                      {{ trackingData.carrier.name }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Status Message -->
              <div class="p-5 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 p-2 bg-primary-100 rounded-xl">
                    <InformationCircleIcon class="w-5 h-5 text-primary-600" />
                  </div>
                  <div class="flex-1">
                    <p class="text-base sm:text-lg font-bold text-gray-900 mb-1">
                      {{ translateMessage(trackingData.status.message) }}
                    </p>
                    <p v-if="trackingData.last_update" class="text-xs text-gray-500 flex items-center gap-2">
                      <ClockIcon class="w-3.5 h-3.5" />
                      {{ t.lastUpdated }}: {{ formatDate(trackingData.last_update) }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Details Grid -->
              <div class="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-if="trackingData.carrier" class="group">
                  <p class="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                    <TruckIcon class="w-3.5 h-3.5 text-primary-500" />
                    {{ t.carrier }}
                  </p>
                  <p class="font-bold text-gray-900 text-base">{{ trackingData.carrier.name }}</p>
                </div>
                
                <div v-if="trackingData.service_type" class="group">
                  <p class="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                    <CheckCircleIcon class="w-3.5 h-3.5 text-primary-500" />
                    {{ t.serviceType }}
                  </p>
                  <p class="font-bold text-gray-900 text-base">{{ trackingData.service_type }}</p>
                </div>

                <div v-if="trackingData.origin?.location" class="group">
                  <p class="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                    <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                    {{ t.origin }}
                  </p>
                  <p class="font-bold text-gray-900 text-base">{{ translateLocation(trackingData.origin.location) }}</p>
                </div>

                <div v-if="trackingData.destination?.location" class="group">
                  <p class="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                    {{ t.destination }}
                  </p>
                  <p class="font-bold text-gray-900 text-base">{{ translateLocation(trackingData.destination.location) }}</p>
                </div>

                <div v-if="trackingData.estimated_delivery" class="group">
                  <p class="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                    <ClockIcon class="w-3.5 h-3.5 text-primary-500" />
                    {{ t.estimatedDelivery }}
                  </p>
                  <p class="font-bold text-gray-900 text-base">{{ formatDate(trackingData.estimated_delivery) }}</p>
                </div>

                <div v-if="trackingData.tracking_url" class="group">
                  <p class="text-xs font-semibold text-gray-500 mb-1">{{ t.carrierTracking }}</p>
                  <a 
                    :href="trackingData.tracking_url" 
                    target="_blank"
                    class="inline-flex items-center gap-2 font-bold text-primary-600 hover:text-primary-700 text-base group-hover:gap-3 transition-all"
                  >
                    {{ t.viewOnCarrier }}
                    <ArrowTopRightOnSquareIcon class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>

              <!-- Tracking History -->
              <div v-if="trackingData.checkpoints && trackingData.checkpoints.length > 0" class="p-5 border-t bg-gradient-to-br from-gray-50 to-white">
                <h3 class="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                  <div class="p-1.5 bg-primary-100 rounded-lg">
                    <ClockIcon class="w-5 h-5 text-primary-600" />
                  </div>
                  {{ t.trackingHistory }}
                </h3>
                
                <div class="space-y-4">
                  <div 
                    v-for="(checkpoint, index) in reversedCheckpoints" 
                    :key="index"
                    class="flex gap-4 relative group"
                  >
                    <!-- Timeline -->
                    <div class="flex-shrink-0 relative">
                      <div 
                        :class="index === 0 ? 'bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg ring-4 ring-primary-100' : 'bg-gray-300'" 
                        class="w-3 h-3 rounded-full mt-1.5 transform group-hover:scale-125 transition-transform duration-200"
                      ></div>
                      <div v-if="index < reversedCheckpoints.length - 1" class="absolute top-5 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-gray-300 to-transparent"></div>
                    </div>
                    
                    <!-- Content -->
                    <div class="flex-1 pb-6">
                      <div class="bg-white rounded-xl p-3.5 border border-gray-100 group-hover:border-primary-200 group-hover:shadow-md transition-all duration-200">
                        <p class="font-bold text-gray-900 text-sm sm:text-base mb-1">
                          {{ translateCheckpointMessage(checkpoint.message) }}
                        </p>
                        <p v-if="checkpoint.location" class="text-xs text-gray-600 mb-1 flex items-center gap-1.5">
                          <div class="w-1 h-1 rounded-full bg-primary-500"></div>
                          {{ checkpoint.location }}
                        </p>
                        <p class="text-[11px] text-gray-500 font-medium">
                          {{ formatDate(checkpoint.time) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CTA Section -->
              <div class="p-6 bg-gradient-to-br from-primary-50 via-blue-50 to-primary-50 border-t border-primary-100">
                <div class="text-center">
                  <p class="text-gray-700 font-semibold mb-4 text-sm sm:text-base">{{ t.needHelp }}</p>
                  <div class="flex flex-col sm:flex-row gap-3 justify-center">
                    <NuxtLink 
                      to="/register"
                      class="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <UserPlusIcon class="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {{ t.createAccount }}
                    </NuxtLink>
                    <NuxtLink 
                      to="https://wa.me/16195591910"
                      class="group inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 font-bold rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <ChatBubbleLeftRightIcon class="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {{ t.contactSupport }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-center pt-2">
              <button
                @click="resetSearch"
                class="group inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <ArrowPathIcon class="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                {{ t.trackAnother }}
              </button>
            </div>
          </div>
        </Transition>

        <!-- Not Found State -->
        <Transition
          enter-active-class="transition ease-out duration-500"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
        >
          <div v-if="notFound" class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center border border-white/20">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mb-4 shadow-lg">
              <XCircleIcon class="w-12 h-12 text-red-600" />
            </div>
            <h3 class="text-2xl font-black text-gray-900 mb-3">{{ t.notFoundTitle }}</h3>
            <p class="text-gray-600 mb-6 text-base max-w-md mx-auto">{{ t.notFoundMessage }}</p>
            <button
              @click="resetSearch"
              class="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ArrowPathIcon class="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              {{ t.tryAgain }}
            </button>
          </div>
        </Transition>
      </div>
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
const { t: createTranslations, language } = useLanguage()

// State
const trackingNumber = ref('')
const loading = ref(false)
const error = ref('')
const trackingData = ref(null)
const notFound = ref(false)

// Popular carriers for display
const popularCarriers = ['USPS', 'FedEx', 'UPS', 'DHL', 'Estafeta']

// Computed property to reverse checkpoints (latest first)
const reversedCheckpoints = computed(() => {
  if (!trackingData.value?.checkpoints) return []
  return [...trackingData.value.checkpoints].reverse()
})

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
    es: 'Ingresa tu número de rastreo para ver el estado en tiempo real',
    en: 'Enter your tracking number to see real-time status'
  },
  trackingLabel: {
    es: 'Número de Rastreo',
    en: 'Tracking Number'
  },
  trackingPlaceholder: {
    es: 'Ej: 1266888453',
    en: 'Ex: 1266888453'
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
  },
  // USPS messages
  msgInfoReceived: {
    es: 'Etiqueta de envío creada, esperando el paquete',
    en: 'Shipping label created, awaiting item'
  },
  msgShippingLabelCreated: {
    es: 'Etiqueta de envío creada, USPS esperando el paquete',
    en: 'Shipping Label Created, USPS Awaiting Item'
  },
  msgAwaitingItem: {
    es: 'Esperando el paquete',
    en: 'Awaiting Item'
  },
  msgInTransit: {
    es: 'En tránsito',
    en: 'In Transit'
  },
  msgOutForDelivery: {
    es: 'En reparto',
    en: 'Out for Delivery'
  },
  msgDelivered: {
    es: 'Entregado',
    en: 'Delivered'
  },
  msgPackageAccepted: {
    es: 'Paquete aceptado',
    en: 'Package Accepted'
  },
  msgArrivedAtFacility: {
    es: 'Llegó a la instalación',
    en: 'Arrived at Facility'
  },
  msgDepartedFacility: {
    es: 'Salió de la instalación',
    en: 'Departed Facility'
  },
  // Estafeta-specific messages
  msgRecibidoPorEstafeta: {
    es: 'Recibido por Estafeta',
    en: 'Received by Estafeta'
  },
  msgEnProcesoDeEntrega: {
    es: 'En proceso de entrega',
    en: 'Out for delivery'
  },
  msgLlegadaCentroOperativo: {
    es: 'Llegada a centro operativo',
    en: 'Arrived at operations center'
  },
  // Countries
  countryUSA: {
    es: 'Estados Unidos',
    en: 'United States'
  },
  countryMexico: {
    es: 'México',
    en: 'Mexico'
  },
  countryCanada: {
    es: 'Canadá',
    en: 'Canada'
  }
}

const t = createTranslations(translations)

// Methods
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const lang = language.value === 'es' ? 'es-MX' : 'en-US'
  return date.toLocaleDateString(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const translateMessage = (message: string) => {
  if (!message) return ''
  
  const lowerMessage = message.toLowerCase()
  
  // Estafeta messages (check first for specificity)
  if (lowerMessage.includes('recibido por estafeta')) {
    return t.value.msgRecibidoPorEstafeta
  }
  if (lowerMessage.includes('en proceso de entrega')) {
    return t.value.msgEnProcesoDeEntrega
  }
  if (lowerMessage.includes('llegada a centro operativo')) {
    return t.value.msgLlegadaCentroOperativo
  }
  
  // Common messages
  if (lowerMessage === 'entregado' || lowerMessage === 'delivered') {
    return t.value.msgDelivered
  }
  if (lowerMessage.includes('info received')) {
    return t.value.msgInfoReceived
  }
  if (lowerMessage.includes('shipping label created') && lowerMessage.includes('awaiting')) {
    return t.value.msgShippingLabelCreated
  }
  if (lowerMessage.includes('awaiting item')) {
    return t.value.msgAwaitingItem
  }
  if (lowerMessage.includes('in transit')) {
    return t.value.msgInTransit
  }
  if (lowerMessage.includes('out for delivery')) {
    return t.value.msgOutForDelivery
  }
  if (lowerMessage.includes('accepted')) {
    return t.value.msgPackageAccepted
  }
  if (lowerMessage.includes('arrived')) {
    return t.value.msgArrivedAtFacility
  }
  if (lowerMessage.includes('departed')) {
    return t.value.msgDepartedFacility
  }
  
  // Return original if no match
  return message
}

const translateCheckpointMessage = (message: string) => {
  return translateMessage(message)
}

const translateLocation = (location: string) => {
  if (!location) return ''
  
  // Translate country names
  if (location.includes('United States')) {
    return location.replace('United States', t.value.countryUSA)
  }
  if (location.includes('Mexico')) {
    return location.replace('Mexico', t.value.countryMexico)
  }
  if (location.includes('Canada')) {
    return location.replace('Canada', t.value.countryCanada)
  }
  
  return location
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
    'Pending': 'bg-gradient-to-br from-gray-600 to-gray-700',
    'InfoReceived': 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    'InTransit': 'bg-gradient-to-br from-primary-600 to-blue-600',
    'OutForDelivery': 'bg-gradient-to-br from-indigo-600 to-indigo-700',
    'AttemptFail': 'bg-gradient-to-br from-orange-600 to-orange-700',
    'Delivered': 'bg-gradient-to-br from-green-600 to-green-700',
    'AvailableForPickup': 'bg-gradient-to-br from-blue-600 to-blue-700',
    'Exception': 'bg-gradient-to-br from-red-600 to-red-700',
    'Expired': 'bg-gradient-to-br from-gray-500 to-gray-600'
  }
  return colors[status] || 'bg-gradient-to-br from-gray-600 to-gray-700'
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
  return 'bg-white/30 backdrop-blur-sm'
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

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(3deg);
  }
  66% {
    transform: translateY(-8px) rotate(-3deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>