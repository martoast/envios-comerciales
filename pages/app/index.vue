<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Welcome Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div class="text-center sm:text-left">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 animate-fadeIn">
            {{ t.welcome }}, {{ user?.name?.split(' ')[0] || 'Friend' }}! 👋
          </h1>
          <p class="mt-2 text-lg text-gray-600 animate-fadeIn" style="animation-delay: 0.1s">
            {{ t.tagline }}
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- PO Box Card -->
      <div class="mb-8 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-6 sm:p-8 border border-primary-200/50 animate-fadeIn" style="animation-delay: 0.2s">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-3 bg-primary-100 rounded-xl">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900">{{ t.yourUSAddress }}</h2>
            </div>
            <div class="space-y-2">
              <p class="text-lg font-semibold text-gray-900">{{ user?.name || 'Loading...' }}</p>
              <p class="text-gray-700">{{ poBoxAddress.line1 }}</p>
              <p class="text-gray-700">{{ poBoxAddress.line2 }}</p>
              <p class="text-gray-700">{{ poBoxAddress.line3 }}</p>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <button 
              @click="copyAddress" 
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
              </svg>
              <svg v-else class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ copied ? t.copied : t.copyAddress }}
            </button>
            <NuxtLink 
              to="/app/orders/create" 
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              {{ t.createOrder }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- How It Works -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center animate-fadeIn" style="animation-delay: 0.3s">
          {{ t.howItWorks }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="(step, index) in howItWorksSteps" 
            :key="index"
            class="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 animate-fadeIn"
            :style="`animation-delay: ${(index + 4) * 0.1}s`"
          >
            <!-- Step Number -->
            <div class="absolute -top-3 -left-3 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
              {{ index + 1 }}
            </div>
            <!-- Icon -->
            <div :class="['p-3 rounded-xl mb-4 inline-flex', step.bgColor]">
              <svg class="w-6 h-6" :class="step.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="step.icon"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>

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
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
              </svg>
            </div>
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

                  <p class="font-medium text-gray-900">{{ order.order_number }}</p>
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
          <!-- FAQ Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.9s">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-blue-50 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900">{{ t.needHelp }}</h3>
            </div>
            <p class="text-sm text-gray-600 mb-4">{{ t.checkFAQ }}</p>
            <a 
              href="#" 
              class="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
            >
              {{ t.visitHelpCenter }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <!-- Shipping Calculator -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 1.0s">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-green-50 rounded-lg">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900">{{ t.calculateShipping }}</h3>
            </div>
            <p class="text-sm text-gray-600 mb-4">{{ t.estimateCosts }}</p>
            <button 
              class="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
            >
              {{ t.openCalculator }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <!-- Contact Support -->
          <div class="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-6 border border-primary-200/50 animate-fadeIn" style="animation-delay: 1.1s">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-primary-100 rounded-lg">
                <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900">{{ t.contactSupport }}</h3>
            </div>
            <p class="text-sm text-gray-700 mb-4">{{ t.hereToHelp }}</p>
            <a 
              href="mailto:support@example.com" 
              class="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary-600 font-medium rounded-lg hover:shadow-md transition-all"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              {{ t.emailUs }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Define page meta
definePageMeta({
  layout: 'app',
  middleware: ['auth', 'customer']
})

// Nuxt imports
const { $customFetch } = useNuxtApp()
const user = useUser().value

// Use the language composable
const { t: createTranslations } = useLanguage()

// State
const recentOrders = ref([])
const loadingOrders = ref(true)
const copied = ref(false)

// PO Box Address
const poBoxAddress = computed(() => ({
  line1: `PC-${user?.id || 'XXXX'}`,
  line2: '1234 E Aviation Blvd, Suite 200',
  line3: 'El Segundo, CA 90245, USA'
}))

// Translations
const translations = {
  welcome: {
    es: '¡Bienvenido',
    en: 'Welcome'
  },
  tagline: {
    es: 'Tu puente de compras entre Estados Unidos y México',
    en: 'Your shopping bridge between USA and Mexico'
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
    es: 'Crear Orden',
    en: 'Create Order'
  },
  howItWorks: {
    es: '¿Cómo Funciona?',
    en: 'How It Works'
  },
  step1Title: {
    es: 'Compra en línea',
    en: 'Shop Online'
  },
  step1Desc: {
    es: 'Compra en cualquier tienda de EE.UU. usando tu dirección asignada',
    en: 'Shop at any US store using your assigned address'
  },
  step2Title: {
    es: 'Recibimos tus paquetes',
    en: 'We receive your packages'
  },
  step2Desc: {
    es: 'Tus compras llegan a nuestro almacén en California',
    en: 'Your purchases arrive at our California warehouse'
  },
  step3Title: {
    es: 'Consolidamos',
    en: 'We consolidate'
  },
  step3Desc: {
    es: 'Agrupamos todos tus paquetes en un solo envío',
    en: 'We group all your packages into one shipment'
  },
  step4Title: {
    es: 'Enviamos a México',
    en: 'Ship to Mexico'
  },
  step4Desc: {
    es: 'Tu paquete consolidado llega directo a tu puerta',
    en: 'Your consolidated package arrives right to your door'
  },
  recentOrders: {
    es: 'Órdenes Recientes',
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
    es: 'No hay órdenes todavía',
    en: 'No orders yet'
  },
  noOrdersDescription: {
    es: 'Comienza comprando en tus tiendas favoritas de EE.UU.',
    en: 'Start by shopping at your favorite US stores.'
  },
  startNow: {
    es: 'Comenzar Ahora',
    en: 'Start Now'
  },
  items: {
    es: 'artículos',
    en: 'items'
  },
  needHelp: {
    es: '¿Necesitas Ayuda?',
    en: 'Need Help?'
  },
  checkFAQ: {
    es: 'Consulta nuestras preguntas frecuentes y guías.',
    en: 'Check our FAQ and guides.'
  },
  visitHelpCenter: {
    es: 'Visitar Centro de Ayuda',
    en: 'Visit Help Center'
  },
  calculateShipping: {
    es: 'Calculadora de Envío',
    en: 'Shipping Calculator'
  },
  estimateCosts: {
    es: 'Estima el costo de tu envío antes de comprar.',
    en: 'Estimate your shipping cost before buying.'
  },
  openCalculator: {
    es: 'Abrir Calculadora',
    en: 'Open Calculator'
  },
  contactSupport: {
    es: 'Contactar Soporte',
    en: 'Contact Support'
  },
  hereToHelp: {
    es: 'Estamos aquí para ayudarte con cualquier pregunta.',
    en: "We're here to help with any questions."
  },
  emailUs: {
    es: 'Enviar Email',
    en: 'Send Email'
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
  paid: {
    es: 'Pagado',
    en: 'Paid'
  },
  shipped: {
    es: 'Enviado',
    en: 'Shipped'
  },
  delivered: {
    es: 'Entregado',
    en: 'Delivered'
  }
}

// Get reactive translations
const t = createTranslations(translations)

// How it works steps
const howItWorksSteps = computed(() => [
  {
    title: t.value.step1Title,
    description: t.value.step1Desc,
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    title: t.value.step2Title,
    description: t.value.step2Desc,
    icon: 'M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    title: t.value.step3Title,
    description: t.value.step3Desc,
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600'
  },
  {
    title: t.value.step4Title,
    description: t.value.step4Desc,
    icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
    bgColor: 'bg-primary-50',
    iconColor: 'text-primary-600'
  }
])

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
  const address = `${user?.name}
${poBoxAddress.value.line1}
${poBoxAddress.value.line2}
${poBoxAddress.value.line3}`
  
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
    collecting: 'bg-blue-100 text-blue-700',
    awaiting_packages: 'bg-yellow-100 text-yellow-700',
    packages_complete: 'bg-purple-100 text-purple-700',
    quote_sent: 'bg-orange-100 text-orange-700',
    paid: 'bg-green-100 text-green-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-gray-100 text-gray-700'
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

// Fetch data on mount
onMounted(() => {
  fetchRecentOrders()
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