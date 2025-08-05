<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Loading State -->
    <div v-if="isInitialLoading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <svg class="inline-block w-16 h-16 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-4 text-gray-600">{{ t.loadingDashboard }}</p>
      </div>
    </div>
    <!-- Content (shown when data is loaded) -->
    <div v-else>
      <!-- Welcome Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 animate-fadeIn">
              {{ t.welcome }}, {{ userName }}! 👋
            </h1>
            <p class="mt-2 text-lg text-gray-600 animate-fadeIn" style="animation-delay: 0.1s">
              {{ t.tagline }}
            </p>
          </div>
        </div>
      </div>
      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <!-- Missing Address Banner -->
        <!-- <Transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="!hasCompleteAddress && showAddressBanner" class="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 relative animate-fadeIn" style="animation-delay: 0.15s">
            <button 
              @click="showAddressBanner = false"
              class="absolute top-2 right-2 text-amber-600 hover:text-amber-700"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-amber-800">
                  {{ t.missingAddressTitle }}
                </p>
                <p class="mt-1 text-sm text-amber-700">
                  {{ t.missingAddressDesc }}
                  <NuxtLink to="/app/account/shipping-address" class="font-medium underline hover:text-amber-800">
                    {{ t.addAddressNow }}
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </Transition> -->
        
        <!-- PO Box Card - Redesigned with Clear Steps -->
        <div class="mb-8 animate-fadeIn" style="animation-delay: 0.2s">
          <!-- Steps Container -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <!-- Step 1: Copy Address -->
            <div class="relative bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-primary-300 transition-all duration-300 flex flex-col">
              <!-- Step Number Badge -->
              <div class="absolute -top-3 left-6 bg-white px-3">
                <span class="text-sm font-bold text-primary-600">{{ t.step }} 1</span>
              </div>
              
              <!-- Step Content -->
              <div class="flex flex-col h-full">
                <!-- Step Title -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-2 bg-primary-100 rounded-lg">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ t.copyYourAddress }}</h3>
                </div>

                <!-- Content Area with Fixed Height -->
                <div class="flex-1 flex flex-col justify-between">
                  <div class="space-y-4">
                    <!-- Address Display -->
                    <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div class="space-y-1">
                        <p class="font-medium text-gray-900">ECTJ {{ fullUserName }}</p>
                        <p class="text-gray-700">{{ poBoxAddress.line1 }}</p>
                        <p class="text-gray-700">{{ poBoxAddress.line2 }}</p>
                      </div>
                    </div>

                    <!-- Info Text -->
                    <p class="text-sm text-gray-600">{{ t.useThisAddress }}</p>
                  </div>

                  <!-- Copy Button - Always at Bottom -->
                  <button 
                    @click="copyAddress" 
                    class="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 group mt-4"
                  >
                    <svg v-if="!copied" class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    {{ copied ? t.addressCopied : t.copyAddressButton }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 2: Create Order -->
            <div class="relative bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-primary-300 transition-all duration-300 flex flex-col">
              <!-- Step Number Badge -->
              <div class="absolute -top-3 left-6 bg-white px-3">
                <span class="text-sm font-bold text-primary-600">{{ t.step }} 2</span>
              </div>
              
              <!-- Step Content -->
              <div class="flex flex-col h-full">
                <!-- Step Title -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-2 bg-primary-100 rounded-lg">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ t.createYourBox }}</h3>
                </div>

                <!-- Content Area with Fixed Height -->
                <div class="flex-1 flex flex-col justify-between">
                  <div class="space-y-4">
                    <!-- Visual Preview -->
                    <div class="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl p-4 border border-primary-200/50 h-[104px] flex items-center justify-center">
                      <div class="flex items-center justify-center gap-3">
                        <!-- Package Icons -->
                        <div class="flex -space-x-3">
                          <div class="w-10 h-10 bg-white border-2 border-primary-300 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                              <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"/>
                            </svg>
                          </div>
                          <div class="w-10 h-10 bg-white border-2 border-primary-300 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                              <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"/>
                            </svg>
                          </div>
                          <div class="w-10 h-10 bg-white border-2 border-primary-300 rounded-lg flex items-center justify-center">
                            <span class="text-primary-600 font-bold text-sm">+</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Info Text -->
                    <p class="text-sm text-gray-600">{{ t.tellUsWhatYouBought }}</p>
                  </div>

                  <!-- Create Order Button - Always at Bottom -->
                  <NuxtLink 
                    to="/app/orders/create" 
                    class="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 group mt-4"
                  >
                    <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    {{ t.createOrderButton }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Helper Text -->
          <!-- <div class="mt-6 text-center">
            <p class="text-sm text-gray-500">
              <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ t.needHelp }} 
              <a href="#" class="text-primary-600 hover:text-primary-700 font-medium">{{ t.watchTutorial }}</a>
            </p>
          </div> -->
        </div>
        
        <!-- How It Works Component -->
        <HowItWorks :animation-delay="0.3" />
        
        <!-- Recent Orders & Quick Actions -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Recent Orders -->
          <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn" style="animation-delay: 0.8s">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 class="text-lg font-bold text-gray-900">{{ t.recentOrders }}</h2>
              <NuxtLink 
                to="/app/orders" 
                class="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {{ t.viewAll }}
              </NuxtLink>
            </div>
            
            <!-- Loading State -->
            <div v-if="loadingOrders" class="px-6 py-12 text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-xl mb-3">
                <svg class="animate-spin h-6 w-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p class="text-gray-500">{{ t.loadingOrders }}</p>
            </div>
            <!-- Empty State -->
            <div v-else-if="recentOrders.length === 0" class="px-6 py-12 text-center">
              <h3 class="text-base font-semibold text-gray-900 mb-1">{{ t.noOrdersYet }}</h3>
              <p class="text-sm text-gray-500 mb-4">{{ t.noOrdersDescription }}</p>
              <NuxtLink 
                to="/app/orders/create" 
                class="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-all"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                {{ t.startNow }}
              </NuxtLink>
            </div>
            <!-- Orders List -->
            <div v-else class="divide-y divide-gray-100">
              <NuxtLink
                v-for="order in recentOrders"
                :key="order.id"
                :to="`/app/orders/${order.id}`"
                class="block px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center justify-between mb-2">
                  <div>
                    <p class="font-medium text-gray-900">{{ order.tracking_number }}</p>
                  </div>
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStatusColor(order.status)
                  ]">
                    {{ getStatusLabel(order.status) }}
                  </span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">
                    {{ order.items?.length || 0 }} {{ t.items }}
                  </span>
                  <span class="text-gray-500">{{ formatDate(order.created_at) }}</span>
                </div>
              </NuxtLink>
            </div>
          </div>
          <!-- Quick Actions -->
          <div class="space-y-4">
            <!-- Contact Support -->
            <div class="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-6 border border-primary-200/50 animate-fadeIn" style="animation-delay: 1.1s">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-primary-100 rounded-lg">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900">{{ t.contactSupport }}</h3>
              </div>
              <p class="text-sm text-gray-700 mb-4">{{ t.hereToHelp }}</p>
              
              <!-- Contact Options -->
              <div class="space-y-3">
                <!-- WhatsApp -->
                <a
                  href="https://wa.me/16195591910"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div class="p-2 bg-green-100 rounded-lg flex-shrink-0">
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.98-3.686c-.592-1.02-.9-2.176-.898-3.358.002-3.808 3.105-6.912 6.913-6.912 3.809 0 6.913 3.104 6.913 6.913s-3.104 6.923-6.913 6.923z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ t.whatsapp }}</p>
                    <p class="text-xs text-gray-500">+1 (619) 559-1910</p>
                  </div>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
                
                <!-- Email -->
                <a
                  href="mailto:envioscomercialestj@gmail.com"
                  class="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div class="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ t.email }}</p>
                    <p class="text-xs text-gray-500">envioscomercialestj@gmail.com</p>
                  </div>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HowItWorks from '~/components/Landing/Main/HowItWorks.vue'

// Define page meta
definePageMeta({
  layout: 'app',
  middleware: ['auth', 'customer', 'complete-profile']
})

// Nuxt imports
const { $customFetch } = useNuxtApp()
const user = useUser()

// Use the language composable
const { t: createTranslations } = useLanguage()

// State
const recentOrders = ref([])
const loadingOrders = ref(false)
const isInitialLoading = ref(true)
const copied = ref(false)
const showAddressBanner = ref(true)

// Computed properties
const hasCompleteAddress = computed(() => {
  return user.value?.street && user.value?.municipio && user.value?.estado && user.value?.postal_code
})

const userName = computed(() => {
  return user.value?.name?.split(' ')[0] || 'Friend'
})

const fullUserName = computed(() => {
  return user.value?.name || 'Loading...'
})

// PO Box Address
const poBoxAddress = computed(() => ({
  line1: `2220 Otay Lakes Rd. Suite 502 #95`,
  line2: 'Chula Vista CA 91915'
}))

// Translations
const translations = {
  welcome: {
    es: '¡Hola',
    en: 'Welcome'
  },
  tagline: {
    es: 'Envía a México sin complicaciones',
    en: 'Ship to Mexico without complications'
  },
  yourUSAddress: {
    es: 'Tu Dirección en Estados Unidos',
    en: 'Your US Address'
  },
  copyAddress: {
    es: 'Copiar Dirección',
    en: 'Copy Address'
  },
  copied: {
    es: '¡Copiado!',
    en: 'Copied!'
  },
  createOrder: {
    es: 'Crear Envio',
    en: 'Create Order'
  },
  recentOrders: {
    es: 'Envios Recientes',
    en: 'Recent Orders'
  },
  viewAll: {
    es: 'Ver Todas',
    en: 'View All'
  },
  loadingOrders: {
    es: 'Cargando órdenes...',
    en: 'Loading orders...'
  },
  noOrdersYet: {
    es: 'No hay envios todavía',
    en: 'No orders yet'
  },
  noOrdersDescription: {
    es: 'Comienza creando tu primer envio.',
    en: 'Start by creating your first order.'
  },
  startNow: {
    es: 'Crear Envio',
    en: 'Create Order'
  },
  items: {
    es: 'artículos',
    en: 'items'
  },
  contactSupport: {
    es: 'Contactar Soporte',
    en: 'Contact Support'
  },
  hereToHelp: {
    es: 'Estamos aquí para ayudarte con cualquier pregunta.',
    en: "We're here to help with any questions."
  },
  whatsapp: {
    es: 'WhatsApp',
    en: 'WhatsApp'
  },
  email: {
    es: 'Correo Electrónico',
    en: 'Email'
  },
  // Status translations
  collecting: {
    es: 'Agregando Artículos',
    en: 'Adding Items'
  },
  awaiting_packages: {
    es: 'Esperando Paquetes',
    en: 'Awaiting Packages'
  },
  packages_complete: {
    es: 'Paquetes Completos',
    en: 'Packages Complete'
  },
  quote_sent: {
    es: 'Cotización Enviada',
    en: 'Quote Sent'
  },
  shipped: {
    es: 'Enviado',
    en: 'Shipped'
  },
  delivered: {
    es: 'Entregado',
    en: 'Delivered'
  },
  nameAtCheckout: {
    es: 'Nombre para el checkout',
    en: 'Name at checkout'
  },
  shippingAddress: {
    es: 'Dirección de envío',
    en: 'Shipping address'
  },
  checkoutTip: {
    es: 'Usa exactamente este nombre y dirección cuando compres en línea',
    en: 'Use exactly this name and address when shopping online'
  },
  missingAddressTitle: {
    es: 'Completa tu perfil para agilizar futuras órdenes',
    en: 'Complete your profile to speed up future orders'
  },
  missingAddressDesc: {
    es: 'Agrega tu dirección de envío en México para un proceso más rápido.',
    en: 'Add your Mexican shipping address for a faster process.'
  },
  addAddressNow: {
    es: 'Agregar dirección ahora',
    en: 'Add address now'
  },
  loadingDashboard: {
    es: 'Cargando tu panel...',
    en: 'Loading your dashboard...'
  },
  // New translations for the redesigned PO Box section
  startShipping: {
    es: 'Comienza a Enviar',
    en: 'Start Shipping'
  },
  twoSimpleSteps: {
    es: 'Solo dos simples pasos para recibir tus compras',
    en: 'Just two simple steps to receive your purchases'
  },
  step: {
    es: 'PASO',
    en: 'STEP'
  },
  copyYourAddress: {
    es: 'Compra y envía a nuestra bodega en USA',
    en: 'Buy and ship to our USA warehouse'
  },
  useThisAddress: {
    es: 'Usa este nombre y dirección en tus compras.',
    en: 'Use this name and address at checkout when shopping.'
  },
  copyAddressButton: {
    es: 'Copiar Dirección',
    en: 'Copy Address'
  },
  addressCopied: {
    es: '¡Dirección Copiada!',
    en: 'Address Copied!'
  },
  createYourBox: {
    es: 'Inicia tu envío a México',
    en: 'Start your shipment to Mexico'
  },

  tellUsWhatYouBought: {
    es: 'Selecciona tu caja. Dinos qué compraste. Lo recibimos y te lo enviamos.',
    en: 'Tell us what you bought. We\'ll receive and ship it to you.'
  },
  createOrderButton: {
    es: 'Crear Envio',
    en: 'Create Virtual Box'
  },
  needHelp: {
    es: '¿Primera vez?',
    en: 'First time?'
  },
  watchTutorial: {
    es: 'Ver tutorial',
    en: 'Watch tutorial'
  }
}

// Get reactive translations
const t = createTranslations(translations)

// Methods
const fetchRecentOrders = async () => {
  loadingOrders.value = true
  try {
    const response = await $customFetch('/orders', {
      params: { page: 1, per_page: 5 }
    })
    recentOrders.value = response.data.data
  } catch (error) {
    console.error('Error fetching recent orders:', error)
  } finally {
    loadingOrders.value = false
  }
}

const copyAddress = async () => {
  const address = `${poBoxAddress.value.line1} ${poBoxAddress.value.line2}`
  try {
    await navigator.clipboard.writeText(address)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const getStatusColor = (status) => {
  const colors = {
    collecting: 'bg-primary-100 text-primary-700',
    awaiting_packages: 'bg-yellow-100 text-yellow-700',
    packages_complete: 'bg-purple-100 text-purple-700',
    quote_sent: 'bg-orange-100 text-orange-700',
    shipped: 'bg-primary-100 text-primary-700',
    delivered: 'bg-green-100 text-green-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

const getStatusLabel = (status) => {
  return t.value[status] || status
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Initialize data
const initializeDashboard = async () => {
  try {
    await fetchRecentOrders()
  } finally {
    isInitialLoading.value = false
  }
}

// Fetch data on mount
onMounted(() => {
  initializeDashboard()
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

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}
</style>