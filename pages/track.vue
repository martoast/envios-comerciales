<template>
  <!-- Main Container: Deep Space Theme (Light Mode) -->
  <div class="min-h-screen bg-slate-50 relative overflow-hidden font-sans selection:bg-primary-100 selection:text-primary-700">
    
    <!-- ========================================== -->
    <!-- THE BOX UNIVERSE BACKGROUND                -->
    <!-- Hidden on mobile, visible on md+ screens   -->
    <!-- ========================================== -->
    <div class="hidden md:block absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      <!-- 1. Static Starfield (Crisp dots) -->
      <div class="absolute top-[10%] left-[10%] w-1 h-1 bg-slate-300 rounded-full"></div>
      <div class="absolute top-[20%] right-[30%] w-1.5 h-1.5 bg-primary-200 rounded-full opacity-60"></div>
      <div class="absolute top-[50%] left-[20%] w-1 h-1 bg-blue-200 rounded-full"></div>
      <div class="absolute bottom-[30%] right-[10%] w-2 h-2 bg-slate-200 rounded-full"></div>
      <div class="absolute bottom-[10%] left-[40%] w-1 h-1 bg-slate-300 rounded-full"></div>
      <div class="absolute top-[15%] right-[10%] w-1 h-1 bg-primary-300 rounded-full"></div>

      <!-- 2. Deep Atmosphere (Soft Gradients) -->
      <div class="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-b from-primary-50 to-transparent rounded-full opacity-60 blur-3xl"></div>
      <div class="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-t from-blue-50 to-transparent rounded-full opacity-60 blur-3xl"></div>

      <!-- 3. ZERO-GRAVITY BOXES (The "Asteroids") -->
      <!-- Layer 1: Background (Small, Slow, Low Opacity) -->
      <div class="absolute top-[15%] left-[15%] opacity-30 animate-orbit-slow">
        <img src="/box.svg" alt="" class="w-8 h-8 rotate-12" />
      </div>
      <div class="absolute top-[45%] right-[12%] opacity-25 animate-orbit-reverse-slow">
        <img src="/box.svg" alt="" class="w-6 h-6 -rotate-12" />
      </div>
      <div class="absolute bottom-[25%] left-[25%] opacity-30 animate-orbit-slow" style="animation-delay: -5s;">
        <img src="/box.svg" alt="" class="w-7 h-7 rotate-45" />
      </div>

      <!-- Layer 2: Mid-Range (Medium size, Normal Speed) -->
      <div class="absolute top-[25%] right-[35%] opacity-50 animate-orbit-medium">
        <img src="/box.svg" alt="" class="w-12 h-12 -rotate-6" />
      </div>
      <div class="absolute bottom-[40%] left-[8%] opacity-40 animate-orbit-reverse-medium" style="animation-delay: -12s;">
        <img src="/box.svg" alt="" class="w-10 h-10 rotate-180" />
      </div>
      <div class="absolute top-[8%] right-[8%] opacity-50 animate-orbit-medium" style="animation-delay: -8s;">
        <img src="/box.svg" alt="" class="w-9 h-9 rotate-90" />
      </div>

      <!-- Layer 3: Foreground (Large, Clear, Faster "Flyby" feel) -->
      <div class="absolute top-[60%] right-[20%] opacity-80 animate-float-horizontal" style="animation-delay: -2s;">
        <img src="/box.svg" alt="" class="w-16 h-16 drop-shadow-lg rotate-12" />
      </div>
      <div class="absolute top-[30%] left-[5%] opacity-70 animate-float-horizontal-reverse" style="animation-delay: -7s;">
        <img src="/box.svg" alt="" class="w-14 h-14 drop-shadow-md -rotate-12" />
      </div>
       <div class="absolute bottom-[10%] right-[40%] opacity-60 animate-float-vertical" style="animation-delay: -4s;">
        <img src="/box.svg" alt="" class="w-12 h-12 drop-shadow-md rotate-3" />
      </div>
    </div>

    <!-- Compact Header -->
    <div class="relative z-20 bg-white/80 border-b border-gray-200 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <NuxtLink to="/" class="inline-flex items-center text-gray-600 hover:text-primary-600 transition-all duration-200 group text-sm font-bold">
          <ArrowLeftIcon class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {{ t.backToHome }}
        </NuxtLink>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex items-center justify-center min-h-[calc(100vh-60px)] px-4 sm:px-6 lg:px-8 py-8">
      <div class="w-full max-w-2xl">
        
        <!-- Title Section -->
        <div class="text-center mb-8">
          <!-- Animated Icon -->
          <div class="relative inline-block mb-4 group">
            <div class="absolute inset-0 bg-primary-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div class="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-blue-600 rounded-2xl shadow-xl transform group-hover:scale-110 transition-all duration-300 ring-4 ring-white">
              <MagnifyingGlassIcon class="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 class="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tight">
            {{ t.pageTitle }}
          </h1>
          
          <p class="text-base sm:text-lg text-gray-600 mb-4 font-medium max-w-lg mx-auto">
            {{ t.pageSubtitle }}
          </p>

          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-md border border-gray-200/60 ring-1 ring-gray-100">
            <div class="flex -space-x-2">
              <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-[9px] font-bold border border-white">US</div>
              <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[9px] font-bold border border-white">MX</div>
            </div>
            <span class="text-xs font-bold text-gray-600">
              <span class="text-primary-600">1,400+</span> {{ language === 'es' ? 'Paqueterías' : 'Carriers' }}
            </span>
          </div>
        </div>

        <!-- Search Card -->
        <div v-if="!trackingData" class="relative transform transition-all duration-500 hover:scale-[1.01]">
          <div class="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden">
            <!-- Decorative top gradient line -->
            <div class="h-1.5 w-full bg-gradient-to-r from-primary-500 via-blue-500 to-primary-500"></div>
            
            <div class="relative p-6 sm:p-8">
              <form @submit.prevent="handleTrack" class="space-y-5">
                <div>
                  <label for="tracking_number" class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    {{ t.trackingLabel }}
                  </label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                    </div>
                    <input
                      v-model="trackingNumber"
                      type="text"
                      id="tracking_number"
                      :placeholder="t.trackingPlaceholder"
                      class="w-full pl-12 pr-4 py-4 text-base border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all duration-200 bg-gray-50/50 font-bold text-gray-900 placeholder-gray-400"
                      :disabled="loading"
                      required
                      @input="clearError"
                    />
                  </div>
                  <p v-if="error" class="mt-2 text-sm text-red-600 flex items-center gap-2 font-medium bg-red-50 p-2 rounded-lg">
                    <ExclamationCircleIcon class="w-4 h-4 flex-shrink-0" />
                    <span>{{ error }}</span>
                  </p>
                </div>

                <button
                  type="submit"
                  :disabled="loading || !trackingNumber.trim()"
                  class="group relative w-full py-4 px-6 rounded-xl font-black text-base text-white bg-gray-900 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-[0.98] shadow-lg hover:shadow-xl overflow-hidden"
                >
                  <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
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
                <p class="text-[10px] font-bold text-gray-400 text-center mb-3 uppercase tracking-widest">
                  {{ t.supportedCarriers }}
                </p>
                <div class="flex flex-wrap justify-center gap-2">
                  <span 
                    v-for="carrier in popularCarriers" 
                    :key="carrier" 
                    class="px-3 py-1.5 bg-gray-50 hover:bg-white text-gray-600 hover:text-primary-700 text-xs font-bold rounded-lg border border-gray-100 hover:border-primary-200 transition-all duration-200 cursor-default shadow-sm hover:shadow-md"
                  >
                    {{ carrier }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tracking Results (Transition) -->
        <Transition
          enter-active-class="transition ease-out duration-500"
          enter-from-class="transform opacity-0 scale-95 translate-y-8"
          enter-to-class="transform opacity-100 scale-100 translate-y-0"
          leave-active-class="transition ease-in duration-300"
          leave-from-class="transform opacity-100 scale-100"
          leave-to="transform opacity-0 scale-95"
        >
          <div v-if="trackingData" class="space-y-6">
            <!-- Status Card -->
            <div class="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden border border-gray-100 transform hover:scale-[1.01] transition-transform duration-300">
              <!-- Status Header -->
              <div :class="getStatusColor(trackingData.status.tag)" class="relative p-6 text-white overflow-hidden">
                 <!-- Subtle pattern in header -->
                <div class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>

                <div class="relative">
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div class="flex-1">
                      <p class="text-xs opacity-90 mb-1 font-bold uppercase tracking-widest">{{ t.trackingNumber }}</p>
                      <p class="text-2xl font-black tracking-tight font-mono">{{ trackingData.tracking_number }}</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <div :class="getStatusIconBg(trackingData.status.tag)" class="p-3 rounded-2xl shadow-lg backdrop-blur-md bg-white/20">
                        <component :is="getStatusIconComponent(trackingData.status.tag)" class="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold bg-white text-gray-900 shadow-sm">
                      {{ getStatusLabel(trackingData.status.tag) }}
                    </span>
                    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold bg-black/20 border border-white/10">
                      <TruckIcon class="w-3.5 h-3.5" />
                      {{ trackingData.carrier.name }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Message & Details -->
              <div class="p-6 bg-white">
                <div class="flex items-start gap-4 mb-6">
                   <div class="flex-shrink-0 mt-1">
                    <div class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                   </div>
                   <div>
                      <p class="text-lg font-bold text-gray-900 leading-snug">
                        {{ translateMessage(trackingData.status.message) }}
                      </p>
                      <p v-if="trackingData.last_update" class="text-xs text-gray-500 mt-1 font-medium">
                        {{ formatDate(trackingData.last_update) }}
                      </p>
                   </div>
                </div>

                <!-- Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div v-if="trackingData.origin?.location" class="space-y-1">
                    <p class="text-xs font-bold text-gray-400 uppercase">{{ t.origin }}</p>
                    <p class="font-bold text-gray-800">{{ translateLocation(trackingData.origin.location) }}</p>
                  </div>
                  <div v-if="trackingData.destination?.location" class="space-y-1">
                    <p class="text-xs font-bold text-gray-400 uppercase">{{ t.destination }}</p>
                    <p class="font-bold text-gray-800">{{ translateLocation(trackingData.destination.location) }}</p>
                  </div>
                  <div v-if="trackingData.estimated_delivery" class="space-y-1 col-span-full pt-2 border-t border-gray-200/50 mt-2">
                     <p class="text-xs font-bold text-gray-400 uppercase">{{ t.estimatedDelivery }}</p>
                     <p class="font-bold text-primary-700">{{ formatDate(trackingData.estimated_delivery) }}</p>
                  </div>
                </div>
              </div>

              <!-- History Expander (Simplified for this view) -->
              <div v-if="trackingData.checkpoints?.length" class="px-6 pb-6">
                <div class="border-t border-gray-100 pt-4">
                  <p class="text-sm font-bold text-gray-900 mb-4">{{ t.trackingHistory }}</p>
                  <div class="space-y-4 pl-2 border-l-2 border-gray-100">
                     <div v-for="(kp, idx) in reversedCheckpoints.slice(0, 3)" :key="idx" class="relative pl-4">
                        <div class="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-2 border-gray-200 rounded-full"></div>
                        <p class="text-sm font-medium text-gray-800">{{ translateCheckpointMessage(kp.message) }}</p>
                        <p class="text-xs text-gray-400">{{ formatDate(kp.time) }}</p>
                     </div>
                     <div v-if="reversedCheckpoints.length > 3" class="pl-4 text-xs text-primary-600 font-bold cursor-pointer">
                        + {{ reversedCheckpoints.length - 3 }} more updates...
                     </div>
                  </div>
                </div>
              </div>

            </div>

            <!-- Reset Button -->
            <div class="text-center">
               <button @click="resetSearch" class="text-sm font-bold text-gray-500 hover:text-gray-900 underline">
                 {{ t.trackAnother }}
               </button>
            </div>
          </div>
        </Transition>

         <!-- Not Found State -->
        <Transition
          enter-active-class="transition ease-out duration-500"
          enter-from="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
        >
          <div v-if="notFound" class="bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <XCircleIcon class="w-8 h-8 text-red-600" />
              </div>
              <h3 class="text-xl font-black text-gray-900 mb-2">{{ t.notFoundTitle }}</h3>
              <p class="text-gray-600 mb-6 text-sm">{{ t.notFoundMessage }}</p>
              <button
                @click="resetSearch"
                class="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ArrowPathIcon class="w-4 h-4" />
                {{ t.tryAgain }}
              </button>
          </div>
        </Transition>

      </div>
    </div>
  </div>
</template>

<script setup>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { $customFetch } = useNuxtApp()
const { t: createTranslations, language } = useLanguage()
const route = useRoute()

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
    es: 'Rastrea tu paquete en tiempo real a través de nuestro universo logístico.',
    en: 'Track your package in real-time through our logistics universe.'
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
    es: 'Soportamos más de 1,400 paqueterías',
    en: 'We support 1,400+ carriers'
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
    es: 'No encontramos ningún paquete con ese número de rastreo.',
    en: 'We couldn\'t find any package with that tracking number.'
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
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const lang = language.value === 'es' ? 'es-MX' : 'en-US'
  return date.toLocaleDateString(lang, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const translateMessage = (message) => {
  if (!message) return ''
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('recibido por estafeta')) return t.value.msgRecibidoPorEstafeta
  if (lowerMessage.includes('en proceso de entrega')) return t.value.msgEnProcesoDeEntrega
  if (lowerMessage.includes('llegada a centro operativo')) return t.value.msgLlegadaCentroOperativo
  if (lowerMessage === 'entregado' || lowerMessage === 'delivered') return t.value.msgDelivered
  if (lowerMessage.includes('info received')) return t.value.msgInfoReceived
  if (lowerMessage.includes('shipping label created') && lowerMessage.includes('awaiting')) return t.value.msgShippingLabelCreated
  if (lowerMessage.includes('awaiting item')) return t.value.msgAwaitingItem
  if (lowerMessage.includes('in transit')) return t.value.msgInTransit
  if (lowerMessage.includes('out for delivery')) return t.value.msgOutForDelivery
  if (lowerMessage.includes('accepted')) return t.value.msgPackageAccepted
  if (lowerMessage.includes('arrived')) return t.value.msgArrivedAtFacility
  if (lowerMessage.includes('departed')) return t.value.msgDepartedFacility
  
  return message
}

const translateCheckpointMessage = (message) => {
  return translateMessage(message)
}

const translateLocation = (location) => {
  if (!location) return ''
  if (location.includes('United States')) return location.replace('United States', t.value.countryUSA)
  if (location.includes('Mexico')) return location.replace('Mexico', t.value.countryMexico)
  if (location.includes('Canada')) return location.replace('Canada', t.value.countryCanada)
  return location
}

const getStatusLabel = (status) => {
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

const getStatusColor = (status) => {
  const colors = {
    'Pending': 'bg-gray-800',
    'InfoReceived': 'bg-yellow-500',
    'InTransit': 'bg-blue-600',
    'OutForDelivery': 'bg-indigo-600',
    'AttemptFail': 'bg-orange-600',
    'Delivered': 'bg-green-600',
    'AvailableForPickup': 'bg-cyan-600',
    'Exception': 'bg-red-600',
    'Expired': 'bg-gray-500'
  }
  return colors[status] || 'bg-gray-800'
}

const getStatusIconComponent = (status) => {
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

const getStatusIconBg = (status) => {
  return 'bg-white/20 backdrop-blur-md'
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
  } catch (err) {
    console.error('Tracking error:', err)
    if (err.statusCode === 404 || err.data?.message?.includes('not found')) {
      notFound.value = true
    } else {
      error.value = err.data?.message || 'Error al buscar el paquete.'
    }
  } finally {
    loading.value = false
  }
}

useSeoMeta({
  title: 'Rastrear Paquete - Boxly',
  description: 'Rastrea el status de tu envío en tiempo real.',
})

// Handle URL param on mount
onMounted(() => {
  const trackingParam = route.query.tracking_number || route.query.tracking
  
  if (trackingParam) {
    trackingNumber.value = trackingParam
    handleTrack()
  }
})
</script>

<style scoped>
/* 
  ZERO-GRAVITY ORBITAL ANIMATIONS
  These animations create a floating effect that isn't "falling".
  They oscillate on X and Y axes with different timings to feel natural.
*/

@keyframes orbit-slow {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, -15px) rotate(5deg); }
  50% { transform: translate(40px, 0px) rotate(0deg); }
  75% { transform: translate(20px, 15px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

@keyframes orbit-reverse-slow {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-30px, 20px) rotate(-8deg); }
  66% { transform: translate(-15px, -10px) rotate(4deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

@keyframes orbit-medium {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-40px, -40px) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes orbit-reverse-medium {
  0% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(40px, 20px) rotate(15deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

/* "Flyby" Horizontal Drifting */
@keyframes float-horizontal {
  0% { transform: translateX(0) translateY(0) rotate(12deg); }
  50% { transform: translateX(-50px) translateY(-20px) rotate(20deg); }
  100% { transform: translateX(0) translateY(0) rotate(12deg); }
}

@keyframes float-horizontal-reverse {
  0% { transform: translateX(0) translateY(0) rotate(-12deg); }
  50% { transform: translateX(60px) translateY(30px) rotate(-5deg); }
  100% { transform: translateX(0) translateY(0) rotate(-12deg); }
}

@keyframes float-vertical {
  0% { transform: translateY(0) rotate(3deg); }
  50% { transform: translateY(-40px) rotate(-3deg); }
  100% { transform: translateY(0) rotate(3deg); }
}

/* Classes to apply animations */
.animate-orbit-slow {
  animation: orbit-slow 20s ease-in-out infinite;
}

.animate-orbit-reverse-slow {
  animation: orbit-reverse-slow 25s ease-in-out infinite;
}

.animate-orbit-medium {
  animation: orbit-medium 15s ease-in-out infinite;
}

.animate-orbit-reverse-medium {
  animation: orbit-reverse-medium 18s ease-in-out infinite;
}

.animate-float-horizontal {
  animation: float-horizontal 12s ease-in-out infinite;
}

.animate-float-horizontal-reverse {
  animation: float-horizontal-reverse 14s ease-in-out infinite;
}

.animate-float-vertical {
  animation: float-vertical 10s ease-in-out infinite;
}
</style>