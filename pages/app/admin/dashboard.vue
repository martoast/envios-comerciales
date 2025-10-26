<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Admin Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.dashboard }}</h1>
            <p class="text-sm text-gray-600 mt-1">{{ t.welcomeBack }}, {{ user?.name }}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-500">{{ currentDateTime }}</span>
            <button 
              @click="refreshData"
              :disabled="loading"
              class="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
            >
              <svg :class="['w-5 h-5', loading && 'animate-spin']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Loading State -->
      <div v-if="loading && !dashboardData" class="flex items-center justify-center py-16">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl">
          <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>

      <div v-else class="space-y-6">
        <!-- Key Stats - Only 3 important ones -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 rounded-xl bg-blue-50">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <p class="text-sm font-medium text-gray-600 uppercase tracking-wider">{{ t.expectedThisWeek }}</p>
            <p class="mt-2 text-3xl font-bold text-gray-900">{{ dashboardData?.packages?.expected_this_week || 0 }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ t.packagesExpected }}</p>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.1s">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 rounded-xl bg-purple-50">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
            </div>
            <p class="text-sm font-medium text-gray-600 uppercase tracking-wider">{{ t.totalOrders }}</p>
            <p class="mt-2 text-3xl font-bold text-gray-900">{{ dashboardData?.overview?.total_orders || 0 }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ t.allTime }}</p>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.2s">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 rounded-xl bg-green-50">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
            </div>
            <p class="text-sm font-medium text-gray-600 uppercase tracking-wider">{{ t.totalCustomers }}</p>
            <p class="mt-2 text-3xl font-bold text-gray-900">{{ dashboardData?.overview?.total_customers || 0 }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ t.registeredUsers }}</p>
          </div>
        </div>

        <!-- Package Delivery Alerts -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NuxtLink
            to="/app/admin/packages?filter=expected_today"
            class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm border border-blue-200 p-6 animate-fadeIn hover:shadow-md transition-all duration-300 group"
            style="animation-delay: 0.3s"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="p-2.5 rounded-xl bg-blue-500 text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                {{ t.today }}
              </span>
            </div>
            <p class="text-sm font-medium text-blue-900 uppercase tracking-wider mb-2">{{ t.expectedToday }}</p>
            <p class="text-2xl font-bold text-blue-900 group-hover:scale-105 transition-transform">
              {{ dashboardData?.packages?.expected_today || 0 }}
            </p>
          </NuxtLink>

          <NuxtLink
            to="/app/admin/packages?filter=overdue"
            class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-sm border border-red-200 p-6 animate-fadeIn hover:shadow-md transition-all duration-300 group"
            style="animation-delay: 0.4s"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="p-2.5 rounded-xl bg-red-500 text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span v-if="(dashboardData?.packages?.overdue || 0) > 0" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white animate-pulse">
                {{ t.alert }}
              </span>
            </div>
            <p class="text-sm font-medium text-red-900 uppercase tracking-wider mb-2">{{ t.overdue }}</p>
            <p class="text-2xl font-bold text-red-900 group-hover:scale-105 transition-transform">
              {{ dashboardData?.packages?.overdue || 0 }}
            </p>
          </NuxtLink>

          <NuxtLink
            to="/app/admin/packages?filter=arriving_soon"
            class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-sm border border-amber-200 p-6 animate-fadeIn hover:shadow-md transition-all duration-300 group"
            style="animation-delay: 0.5s"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="p-2.5 rounded-xl bg-amber-500 text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500 text-white">
                3d
              </span>
            </div>
            <p class="text-sm font-medium text-amber-900 uppercase tracking-wider mb-2">{{ t.arrivingSoon }}</p>
            <p class="text-2xl font-bold text-amber-900 group-hover:scale-105 transition-transform">
              {{ dashboardData?.packages?.arriving_soon || 0 }}
            </p>
          </NuxtLink>
        </div>

        <!-- Recent Orders Table -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn" style="animation-delay: 0.6s">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900">{{ t.recentOrders }}</h2>
            <NuxtLink 
              to="/app/admin/orders" 
              class="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
            >
              {{ t.viewAll }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </div>

          <div v-if="!dashboardData?.recent_orders || dashboardData.recent_orders.length === 0" class="px-6 py-12 text-center text-gray-500">
            {{ t.noRecentOrders }}
          </div>

          <div v-else class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.order }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.customer }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.items }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.status }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.created }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-100">
                <tr 
                  v-for="order in dashboardData.recent_orders"
                  :key="order.id"
                  @click="navigateTo(`/app/admin/orders/${order.id}`)"
                  class="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ order.order_number }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ order.customer_name }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-gray-900">{{ order.total_items }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStatusColor(order.status)
                    ]">
                      {{ getStatusLabel(order.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(order.created_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

const { $customFetch } = useNuxtApp()
const user = useUser().value
const { t: createTranslations } = useLanguage()

// State
const loading = ref(true)
const dashboardData = ref(null)

// Current date/time
const currentDateTime = computed(() => {
  const locale = user?.preferred_language === 'es' ? 'es-MX' : 'en-US'
  return new Date().toLocaleString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Translations
const translations = {
  dashboard: { es: 'Panel de Control', en: 'Dashboard' },
  welcomeBack: { es: 'Bienvenido de vuelta', en: 'Welcome back' },
  expectedThisWeek: { es: 'Esta Semana', en: 'This Week' },
  packagesExpected: { es: 'paquetes esperados', en: 'packages expected' },
  totalOrders: { es: 'Total Órdenes', en: 'Total Orders' },
  allTime: { es: 'histórico', en: 'all time' },
  totalCustomers: { es: 'Total Clientes', en: 'Total Customers' },
  registeredUsers: { es: 'usuarios registrados', en: 'registered users' },
  expectedToday: { es: 'Hoy', en: 'Today' },
  overdue: { es: 'Retrasados', en: 'Overdue' },
  arrivingSoon: { es: 'Próximos', en: 'Arriving Soon' },
  today: { es: 'Hoy', en: 'Today' },
  alert: { es: '¡Alerta!', en: 'Alert!' },
  recentOrders: { es: 'Órdenes Recientes', en: 'Recent Orders' },
  viewAll: { es: 'Ver Todas', en: 'View All' },
  noRecentOrders: { es: 'No hay órdenes recientes', en: 'No recent orders' },
  order: { es: 'Orden', en: 'Order' },
  customer: { es: 'Cliente', en: 'Customer' },
  items: { es: 'Artículos', en: 'Items' },
  status: { es: 'Estado', en: 'Status' },
  created: { es: 'Creado', en: 'Created' },
  // Status translations
  collecting: { es: 'Agregando', en: 'Collecting' },
  awaiting_packages: { es: 'Esperando', en: 'Awaiting' },
  packages_complete: { es: 'Completo', en: 'Complete' },
  processing: { es: 'Procesando', en: 'Processing' },
  paid: { es: 'Pagado', en: 'Paid' },
  shipped: { es: 'Enviado', en: 'Shipped' },
  delivered: { es: 'Entregado', en: 'Delivered' },
  awaiting_payment: { es: 'Pago Pendiente', en: 'Awaiting Payment' },
}

const t = createTranslations(translations)

// Methods
const fetchDashboard = async () => {
  loading.value = true
  try {
    const response = await $customFetch('/admin/dashboard')
    dashboardData.value = response.data
  } catch (error) {
    console.error('Error fetching dashboard:', error)
  } finally {
    loading.value = false
  }
}

const refreshData = async () => {
  await fetchDashboard()
}

const getStatusColor = (status) => {
  const colors = {
    collecting: 'bg-blue-100 text-blue-700',
    awaiting_packages: 'bg-amber-100 text-amber-700',
    packages_complete: 'bg-purple-100 text-purple-700',
    processing: 'bg-primary-100 text-primary-700',
    quote_sent: 'bg-orange-100 text-orange-700',
    awaiting_payment: 'bg-orange-100 text-orange-700',
    paid: 'bg-green-100 text-green-700',
    shipped: 'bg-primary-100 text-primary-700',
    delivered: 'bg-green-100 text-green-700',
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

const getStatusLabel = (status) => {
  return t.value[status] || status
}

const formatDate = (date) => {
  const locale = user?.preferred_language === 'es' ? 'es-MX' : 'en-US'
  return new Date(date).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchDashboard()
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