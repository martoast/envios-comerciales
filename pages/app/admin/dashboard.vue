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
          <!-- Revenue Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              v-for="(stat, index) in revenueStats" 
              :key="stat.label"
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn hover:shadow-md transition-all duration-300"
              :style="`animation-delay: ${index * 0.1}s`"
            >
              <div class="flex items-center justify-between mb-4">
                <div :class="['p-3 rounded-xl', stat.bgColor]">
                  <svg class="w-6 h-6" :class="stat.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon"/>
                  </svg>
                </div>
                <span v-if="stat.trend" :class="[
                  'text-sm font-medium',
                  stat.trend > 0 ? 'text-green-600' : 'text-red-600'
                ]">
                  {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
                </span>
              </div>
              <p class="text-sm font-medium text-gray-600 uppercase tracking-wider">{{ stat.label }}</p>
              <p class="mt-2 text-2xl font-bold text-gray-900">{{ stat.value }}</p>
            </div>
          </div>
  
          <!-- Order Status Overview -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.4s">
            <h2 class="text-lg font-bold text-gray-900 mb-6">{{ t.orderStatusOverview }}</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              <div 
                v-for="status in orderStatuses" 
                :key="status.key"
                class="text-center"
              >
                <div :class="[
                  'mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-3',
                  status.bgColor
                ]">
                  <span class="text-2xl font-bold" :class="status.textColor">
                    {{ dashboardData?.orders[status.key] || 0 }}
                  </span>
                </div>
                <p class="text-xs font-medium text-gray-600">{{ status.label }}</p>
              </div>
            </div>
          </div>
  
          <!-- Quick Actions & Package Stats -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Quick Actions -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.5s">
              <h2 class="text-lg font-bold text-gray-900 mb-4">{{ t.quickActions }}</h2>
              <div class="space-y-3">
                <NuxtLink 
                  to="/app/admin/orders/ready-to-quote"
                  class="flex items-center justify-between p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all group"
                >
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-all">
                      <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/>
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">{{ t.ordersToQuote }}</p>
                      <p class="text-sm text-gray-600">{{ dashboardData?.orders.ready_to_quote || 0 }} {{ t.pending }}</p>
                    </div>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </NuxtLink>
  
                <NuxtLink 
                  to="/app/admin/packages/pending"
                  class="flex items-center justify-between p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-all group"
                >
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-all">
                      <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z"/>
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">{{ t.pendingPackages }}</p>
                      <p class="text-sm text-gray-600">{{ dashboardData?.packages.awaiting_arrival || 0 }} {{ t.awaitingArrival }}</p>
                    </div>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </NuxtLink>
  
                <NuxtLink 
                  to="/app/admin/packages/missing-weight"
                  class="flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all group"
                >
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-all">
                      <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">{{ t.missingWeights }}</p>
                      <p class="text-sm text-gray-600">{{ dashboardData?.packages.missing_weight || 0 }} {{ t.packages }}</p>
                    </div>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </NuxtLink>
              </div>
            </div>
  
            <!-- Package Stats -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.6s">
              <h2 class="text-lg font-bold text-gray-900 mb-4">{{ t.packageStats }}</h2>
              <div class="space-y-4">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-600">{{ t.arrivedToday }}</span>
                    <span class="text-lg font-bold text-gray-900">{{ dashboardData?.packages.arrived_today || 0 }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-green-500 h-2 rounded-full transition-all duration-300"
                      :style="`width: ${getPercentage(dashboardData?.packages.arrived_today, dashboardData?.packages.awaiting_arrival)}%`"
                    ></div>
                  </div>
                </div>
  
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-600">{{ t.awaitingArrival }}</span>
                    <span class="text-lg font-bold text-gray-900">{{ dashboardData?.packages.awaiting_arrival || 0 }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                      :style="`width: 100%`"
                    ></div>
                  </div>
                </div>
  
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-600">{{ t.missingWeight }}</span>
                    <span class="text-lg font-bold text-gray-900">{{ dashboardData?.packages.missing_weight || 0 }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-red-500 h-2 rounded-full transition-all duration-300"
                      :style="`width: ${getPercentage(dashboardData?.packages.missing_weight, 50)}%`"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Recent Activity & Top Customers -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Orders -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn" style="animation-delay: 0.7s">
              <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 class="text-lg font-bold text-gray-900">{{ t.recentOrders }}</h2>
                <NuxtLink 
                  to="/app/admin/orders" 
                  class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {{ t.viewAll }}
                </NuxtLink>
              </div>
              <div class="divide-y divide-gray-100">
                <div v-if="recentOrders.length === 0" class="px-6 py-8 text-center text-gray-500">
                  {{ t.noRecentOrders }}
                </div>
                <NuxtLink
                  v-for="order in recentOrders"
                  :key="order.id"
                  :to="`/app/admin/orders/${order.id}`"
                  class="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center justify-between mb-2">
                    <p class="font-medium text-gray-900">{{ order.order_number }}</p>
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStatusColor(order.status)
                    ]">
                      {{ getStatusLabel(order.status) }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between text-sm text-gray-500">
                    <span>{{ order.user?.name }}</span>
                    <span>{{ formatDate(order.created_at) }}</span>
                  </div>
                </NuxtLink>
              </div>
            </div>
  
            <!-- Top Customers -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn" style="animation-delay: 0.8s">
              <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 class="text-lg font-bold text-gray-900">{{ t.topCustomers }}</h2>
                <NuxtLink 
                  to="/app/admin/customers" 
                  class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {{ t.viewAll }}
                </NuxtLink>
              </div>
              <div class="divide-y divide-gray-100">
                <div v-if="topCustomers.length === 0" class="px-6 py-8 text-center text-gray-500">
                  {{ t.noCustomers }}
                </div>
                <NuxtLink
                  v-for="customer in topCustomers"
                  :key="customer.id"
                  :to="`/app/admin/customers/${customer.id}`"
                  class="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium text-gray-900">{{ customer.name }}</p>
                      <p class="text-sm text-gray-500">{{ customer.email }}</p>
                    </div>
                    <div class="text-right">
                      <p class="font-medium text-gray-900">{{ customer.orders_count }} {{ t.orders }}</p>
                      <p class="text-sm text-gray-500">{{ customer.active_orders_count }} {{ t.active }}</p>
                    </div>
                  </div>
                </NuxtLink>
              </div>
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
    layout: 'admin',
    middleware: ['auth', 'admin']
  })
  
  // Nuxt imports
  const { $customFetch } = useNuxtApp()
  const user = useUser().value
  
  // Use the language composable
  const { t: createTranslations } = useLanguage()
  
  // State
  const loading = ref(true)
  const dashboardData = ref(null)
  const recentOrders = ref([])
  const topCustomers = ref([])
  
  // Current date/time
  const currentDateTime = computed(() => {
    return new Date().toLocaleString('es-MX', {
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
    dashboard: {
      es: 'Panel de Control',
      en: 'Dashboard'
    },
    welcomeBack: {
      es: 'Bienvenido de vuelta',
      en: 'Welcome back'
    },
    orderStatusOverview: {
      es: 'Resumen de Estados de Órdenes',
      en: 'Order Status Overview'
    },
    quickActions: {
      es: 'Acciones Rápidas',
      en: 'Quick Actions'
    },
    packageStats: {
      es: 'Estadísticas de Paquetes',
      en: 'Package Stats'
    },
    recentOrders: {
      es: 'Órdenes Recientes',
      en: 'Recent Orders'
    },
    topCustomers: {
      es: 'Mejores Clientes',
      en: 'Top Customers'
    },
    revenue: {
      es: 'Ingresos',
      en: 'Revenue'
    },
    today: {
      es: 'Hoy',
      en: 'Today'
    },
    thisWeek: {
      es: 'Esta Semana',
      en: 'This Week'
    },
    thisMonth: {
      es: 'Este Mes',
      en: 'This Month'
    },
    total: {
      es: 'Total',
      en: 'Total'
    },
    ordersToQuote: {
      es: 'Órdenes para Cotizar',
      en: 'Orders to Quote'
    },
    pendingPackages: {
      es: 'Paquetes Pendientes',
      en: 'Pending Packages'
    },
    missingWeights: {
      es: 'Falta Pesar',
      en: 'Missing Weights'
    },
    pending: {
      es: 'pendientes',
      en: 'pending'
    },
    awaitingArrival: {
      es: 'esperando llegada',
      en: 'awaiting arrival'
    },
    packages: {
      es: 'paquetes',
      en: 'packages'
    },
    arrivedToday: {
      es: 'Llegados Hoy',
      en: 'Arrived Today'
    },
    missingWeight: {
      es: 'Sin Peso',
      en: 'Missing Weight'
    },
    viewAll: {
      es: 'Ver Todos',
      en: 'View All'
    },
    noRecentOrders: {
      es: 'No hay órdenes recientes',
      en: 'No recent orders'
    },
    noCustomers: {
      es: 'No hay clientes',
      en: 'No customers'
    },
    orders: {
      es: 'órdenes',
      en: 'orders'
    },
    active: {
      es: 'activas',
      en: 'active'
    },
    // Status translations
    collecting: {
      es: 'Agregando',
      en: 'Collecting'
    },
    awaiting_packages: {
      es: 'Esperando',
      en: 'Awaiting'
    },
    packages_complete: {
      es: 'Completos',
      en: 'Complete'
    },
    quote_sent: {
      es: 'Cotizado',
      en: 'Quoted'
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
  
  // Revenue stats computed
  const revenueStats = computed(() => {
    if (!dashboardData.value) return []
    
    return [
      {
        label: t.value.today,
        value: formatCurrency(dashboardData.value.revenue.today),
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
        trend: calculateTrend(dashboardData.value.revenue.today, dashboardData.value.revenue.yesterday || 0)
      },
      {
        label: t.value.thisWeek,
        value: formatCurrency(dashboardData.value.revenue.this_week),
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        bgColor: 'bg-primary-50',
        iconColor: 'text-primary-600'
      },
      {
        label: t.value.thisMonth,
        value: formatCurrency(dashboardData.value.revenue.this_month),
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600'
      },
      {
        label: t.value.total,
        value: formatCurrency(dashboardData.value.revenue.total),
        icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600'
      }
    ]
  })
  
  // Order statuses
  const orderStatuses = computed(() => [
    { key: 'collecting', label: t.value.collecting, bgColor: 'bg-primary-50', textColor: 'text-primary-600' },
    { key: 'awaiting_packages', label: t.value.awaiting_packages, bgColor: 'bg-yellow-50', textColor: 'text-yellow-600' },
    { key: 'ready_to_quote', label: t.value.packages_complete, bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { key: 'quote_sent', label: t.value.quote_sent, bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
    { key: 'paid', label: t.value.paid, bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { key: 'in_transit', label: t.value.shipped, bgColor: 'bg-indigo-50', textColor: 'text-indigo-600' },
    { key: 'delivered', label: t.value.delivered, bgColor: 'bg-gray-50', textColor: 'text-gray-600' }
  ])
  
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
  
  const fetchRecentOrders = async () => {
    try {
      const response = await $customFetch('/admin/orders', {
        params: { page: 1, per_page: 5 }
      })
      recentOrders.value = response.data.data
    } catch (error) {
      console.error('Error fetching recent orders:', error)
    }
  }
  
  const fetchTopCustomers = async () => {
    try {
      const response = await $customFetch('/admin/customers', {
        params: { page: 1, per_page: 5, active_only: true }
      })
      topCustomers.value = response.data.data
    } catch (error) {
      console.error('Error fetching top customers:', error)
    }
  }
  
  const refreshData = async () => {
    await Promise.all([
      fetchDashboard(),
      fetchRecentOrders(),
      fetchTopCustomers()
    ])
  }
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0)
  }
  
  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0) return 0
    return Math.round(((current - previous) / previous) * 100)
  }
  
  const getPercentage = (value, max) => {
    if (!value || !max) return 0
    return Math.min(Math.round((value / max) * 100), 100)
  }
  
  const getStatusColor = (status) => {
    const colors = {
      collecting: 'bg-primary-100 text-primary-700',
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
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Fetch data on mount
  onMounted(() => {
    refreshData()
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