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
              <!-- Month Selector -->
              <select
                v-model="selectedMonth"
                @change="fetchDashboard"
                class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                <option v-for="month in availableMonths" :key="month.value" :value="month.value">
                  {{ month.label }}
                </option>
              </select>
  
              <NuxtLink
                :to="`/app/admin/dashboard/edit-metrics?year=${selectedYear}&month=${selectedMonthNum}`"
                class="inline-flex items-center px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                {{ t.editMetrics }}
              </NuxtLink>
  
              <NuxtLink
                to="/app/admin/expenses"
                class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ t.manageExpenses }}
              </NuxtLink>
              
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
          <!-- Data Source Badge -->
          <div v-if="dashboardData?.financial?.source === 'manual'" class="bg-primary-50 border border-primary-200 rounded-xl p-4 flex items-center gap-3">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-primary-900">{{ t.usingManualData }}</p>
              <p class="text-xs text-primary-700 mt-0.5">{{ t.manualDataDescription }}</p>
            </div>
            <NuxtLink
              :to="`/app/admin/dashboard/edit-metrics?year=${selectedYear}&month=${selectedMonthNum}`"
              class="text-xs font-medium text-primary-600 hover:text-primary-700 underline"
            >
              {{ t.editData }}
            </NuxtLink>
          </div>
  
          <!-- Quick Stats Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Total Orders Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-border p-6 animate-fadeIn">
              <div class="flex items-center justify-between mb-4">
                <div class="p-2.5 rounded-xl bg-primary-50">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
              </div>
              <p class="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{{ t.totalOrders }}</p>
              <p class="text-2xl font-bold text-text-primary">{{ totalOrdersCount }}</p>
              <p class="text-xs text-text-secondary mt-1">{{ t.thisMonth }}</p>
            </div>
  
            <!-- Total Packages Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 0.1s">
              <div class="flex items-center justify-between mb-4">
                <div class="p-2.5 rounded-xl bg-amber-50">
                  <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
              </div>
              <p class="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{{ t.totalPackages }}</p>
              <p class="text-2xl font-bold text-text-primary">{{ dashboardData?.packages?.total_items || 0 }}</p>
              <p class="text-xs text-text-secondary mt-1">{{ dashboardData?.packages?.awaiting_arrival || 0 }} {{ t.awaiting }}</p>
            </div>
  
            <!-- Customers Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 0.2s">
              <div class="flex items-center justify-between mb-4">
                <div class="p-2.5 rounded-xl bg-accent-green-light">
                  <svg class="w-5 h-5 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
              </div>
              <p class="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{{ t.totalCustomers }}</p>
              <p class="text-2xl font-bold text-text-primary">{{ dashboardData?.overview?.total_customers || 0 }}</p>
              <p class="text-xs text-text-secondary mt-1">
                {{ dashboardData?.financial?.metrics?.new_customers || 0 }} {{ t.newThisMonth }}
              </p>
            </div>
  
            <!-- Conversations Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 0.3s">
              <div class="flex items-center justify-between mb-4">
                <div class="p-2.5 rounded-xl bg-primary-50">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
              </div>
              <p class="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{{ t.conversations }}</p>
              <p class="text-2xl font-bold text-text-primary">{{ dashboardData?.financial?.metrics?.total_conversations || 0 }}</p>
              <p class="text-xs text-text-secondary mt-1">{{ t.thisMonth }}</p>
            </div>
          </div>
  
          <!-- Financial Overview Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Revenue Card -->
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-sm border border-green-200 p-6 animate-fadeIn" style="animation-delay: 0.4s">
              <div class="flex items-center justify-between mb-4">
                <div class="p-3 rounded-xl bg-green-500 text-white">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <p class="text-sm font-medium text-green-900 uppercase tracking-wider">{{ t.totalRevenue }}</p>
              <p class="mt-2 text-3xl font-bold text-green-900">${{ formatMoney(dashboardData?.financial?.revenue?.period_total || 0) }}</p>
              <p class="text-xs text-green-700 mt-1">{{ dashboardData?.period?.month_name }} {{ dashboardData?.period?.year }}</p>
            </div>
  
            <!-- Expenses Card -->
            <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-sm border border-red-200 p-6 animate-fadeIn" style="animation-delay: 0.5s">
              <div class="flex items-center justify-between mb-4">
                <div class="p-3 rounded-xl bg-red-500 text-white">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
                  </svg>
                </div>
              </div>
              <p class="text-sm font-medium text-red-900 uppercase tracking-wider">{{ t.totalExpenses }}</p>
              <p class="mt-2 text-3xl font-bold text-red-900">${{ formatMoney(dashboardData?.financial?.expenses?.total || 0) }}</p>
              <p class="text-xs text-red-700 mt-1">{{ t.fromDatabase }}</p>
            </div>
  
            <!-- Profit Card -->
            <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-sm border border-primary-200 p-6 animate-fadeIn" style="animation-delay: 0.6s">
              <div class="flex items-center justify-between mb-4">
                <div class="p-3 rounded-xl bg-primary-500 text-white">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>
              <p class="text-sm font-medium text-primary-900 uppercase tracking-wider">{{ t.netProfit }}</p>
              <p :class="['mt-2 text-3xl font-bold', profit >= 0 ? 'text-primary-900' : 'text-red-600']">
                ${{ formatMoney(Math.abs(profit)) }}
              </p>
              <p class="text-xs text-primary-700 mt-1">{{ formatPercentage(profitMargin) }}% {{ t.margin }}</p>
            </div>
          </div>
  
          <!-- No Metrics Warning -->
          <div v-if="!hasMetrics" class="bg-amber-50 border border-amber-300 rounded-2xl p-6 animate-fadeIn">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-sm font-medium text-text-primary">{{ t.noMetricsTitle }}</h3>
                <p class="text-sm text-text-secondary mt-1">{{ t.noMetricsDescription }}</p>
                <NuxtLink
                  :to="`/app/admin/dashboard/edit-metrics?year=${selectedYear}&month=${selectedMonthNum}`"
                  class="mt-3 inline-flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
                >
                  {{ t.addMetrics }}
                </NuxtLink>
              </div>
            </div>
          </div>
  
          <!-- Expense Breakdown & Box Sizes -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Expense Categories - Only show if NOT manual metrics -->
            <div v-if="!hasMetrics" class="bg-white rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 0.7s">
              <h3 class="text-lg font-bold text-text-primary mb-4">{{ t.expenseBreakdown }}</h3>
              <div v-if="Object.keys(expenses).length > 0" class="space-y-2">
                <div v-for="(amount, category) in expenses" :key="category" class="flex items-center justify-between py-2 border-b border-border-light last:border-0">
                  <span class="text-sm font-medium text-text-primary">{{ getCategoryLabel(category) }}</span>
                  <span class="text-lg font-bold text-text-primary">${{ formatMoney(amount) }}</span>
                </div>
              </div>
              <div v-else class="text-center py-8">
                <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                </svg>
                <p class="text-sm text-text-secondary">{{ t.noExpenses }}</p>
              </div>
            </div>
  
            <!-- Box Sizes -->
<div :class="['bg-white rounded-2xl shadow-sm border border-border p-6 animate-fadeIn', !hasMetrics ? 'lg:col-start-2' : 'lg:col-span-2']" style="animation-delay: 0.8s">
  <h3 class="text-lg font-bold text-text-primary mb-4">{{ t.boxSizeDistribution }}</h3>
  <div v-if="Object.keys(boxDistribution).length > 0">
    <div class="space-y-2">
      <div v-for="(count, size) in boxDistribution" :key="size" class="flex items-center justify-between py-2 border-b border-border-light">
        <span class="text-sm font-medium text-text-primary">{{ formatBoxSize(size) }}</span>
        <span class="text-lg font-bold text-text-primary">{{ count }}</span>
      </div>
    </div>
    
    <!-- Total Row -->
    <div class="mt-4 pt-4 border-t-2 border-primary-200 bg-primary-50 rounded-lg p-3">
      <div class="flex items-center justify-between">
        <span class="text-base font-bold text-primary-900 uppercase tracking-wide">{{ t.totalBoxes }}</span>
        <span class="text-2xl font-bold text-primary-600">{{ totalBoxes }}</span>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-8">
    <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
    </svg>
    <p class="text-sm text-text-secondary">{{ t.noBoxes }}</p>
  </div>
  <div v-if="dashboardData?.box_distribution?.source === 'manual'" class="mt-4 pt-4 border-t border-border-light">
    <p class="text-xs text-text-secondary italic">{{ t.manualBoxData }}</p>
  </div>
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
  const selectedMonth = ref('')
  
  // Get current date
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  
  // Available months (last 12 months + current)
  const availableMonths = computed(() => {
    const months = []
    for (let i = 11; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const label = date.toLocaleDateString(user?.preferred_language === 'es' ? 'es-MX' : 'en-US', {
        month: 'long',
        year: 'numeric'
      })
      months.push({
        value: `${year}-${String(month).padStart(2, '0')}`,
        label
      })
    }
    return months
  })
  
  // Computed - Selected year and month
  const selectedYear = computed(() => {
    const [year] = selectedMonth.value.split('-')
    return parseInt(year)
  })
  
  const selectedMonthNum = computed(() => {
    const [, month] = selectedMonth.value.split('-')
    return parseInt(month)
  })
  
  // Computed - Total orders count
  const totalOrdersCount = computed(() => {
    if (dashboardData.value?.financial?.source === 'manual') {
      return dashboardData.value?.financial?.metrics?.total_orders || 0
    }
    if (!dashboardData.value?.orders?.by_status) return 0
    const orders = dashboardData.value.orders.by_status
    return Object.values(orders).reduce((sum, count) => sum + count, 0)
  })
  
  // Computed - Financial metrics
  const profit = computed(() => dashboardData.value?.financial?.profit?.amount || 0)
  const profitMargin = computed(() => dashboardData.value?.financial?.profit?.margin || 0)
  
  // Computed - Check if metrics exist
  const hasMetrics = computed(() => {
    return dashboardData.value?.financial?.metrics && 
           dashboardData.value.financial.source === 'manual'
  })
  
  // Computed - Expenses (excluding total)
  const expenses = computed(() => {
    if (!dashboardData.value?.financial?.expenses) return {}
    const exp = { ...dashboardData.value.financial.expenses }
    delete exp.total
    return exp
  })
  
  // Computed - Box distribution
  const boxDistribution = computed(() => {
    if (!dashboardData.value?.box_distribution) return {}
    const dist = { ...dashboardData.value.box_distribution }
    delete dist.not_selected
    delete dist.total
    delete dist.source
    return dist
  })

  const totalBoxes = computed(() => {
  if (!dashboardData.value?.box_distribution) return 0
  const dist = boxDistribution.value
  return Object.values(dist).reduce((sum, count) => sum + count, 0)
})
  
  // Translations
  const translations = {
    dashboard: { es: 'Panel de Control', en: 'Dashboard' },
    welcomeBack: { es: 'Bienvenido de vuelta', en: 'Welcome back' },
    editMetrics: { es: 'Editar Métricas', en: 'Edit Metrics' },
    manageExpenses: { es: 'Gestionar Gastos', en: 'Manage Expenses' },
    totalRevenue: { es: 'Ingresos Totales', en: 'Total Revenue' },
    totalExpenses: { es: 'Gastos Totales', en: 'Total Expenses' },
    netProfit: { es: 'Ganancia Neta', en: 'Net Profit' },
    margin: { es: 'margen', en: 'margin' },
    conversations: { es: 'Conversaciones', en: 'Conversations' },
    thisMonth: { es: 'este mes', en: 'this month' },
    totalOrders: { es: 'Órdenes Totales', en: 'Total Orders' },
    totalPackages: { es: 'Paquetes Totales', en: 'Total Packages' },
    totalBoxes: { es: 'Total de Cajas', en: 'Total Boxes' },
    totalCustomers: { es: 'Clientes Totales', en: 'Total Customers' },
    awaiting: { es: 'esperando', en: 'awaiting' },
    newThisMonth: { es: 'nuevos este mes', en: 'new this month' },
    expenseBreakdown: { es: 'Desglose de Gastos', en: 'Expense Breakdown' },
    boxSizeDistribution: { es: 'Distribución de Tamaños', en: 'Box Size Distribution' },
    noMetricsTitle: { es: 'Métricas Manuales Faltantes', en: 'Missing Manual Metrics' },
    noMetricsDescription: { es: 'Agrega métricas manuales para este mes para ver datos históricos completos.', en: 'Add manual metrics for this month to see complete historical data.' },
    addMetrics: { es: 'Agregar Métricas', en: 'Add Metrics' },
    usingManualData: { es: 'Usando Datos Manuales', en: 'Using Manual Data' },
    manualDataDescription: { es: 'Los datos de ingresos y órdenes provienen de métricas manuales. Gastos siempre desde base de datos.', en: 'Revenue and order data from manual metrics. Expenses always from database.' },
    editData: { es: 'Editar', en: 'Edit' },
    manualBoxData: { es: 'Datos de cajas ingresados manualmente', en: 'Box data manually entered' },
    fromDatabase: { es: 'desde base de datos', en: 'from database' },
    noExpenses: { es: 'No hay gastos registrados', en: 'No expenses recorded' },
    noBoxes: { es: 'No hay cajas registradas', en: 'No boxes recorded' },
    shipping: { es: 'Envíos', en: 'Shipping' },
    ads: { es: 'Publicidad', en: 'Advertising' },
    software: { es: 'Software', en: 'Software' },
    office: { es: 'Oficina', en: 'Office' },
    po_box: { es: 'Apartado Postal', en: 'PO Box' },
    misc: { es: 'Varios', en: 'Miscellaneous' },
  }
  
  const t = createTranslations(translations)
  
  // Methods
  const fetchDashboard = async () => {
    loading.value = true
    try {
      const [year, month] = selectedMonth.value.split('-')
      
      const response = await $customFetch('/admin/dashboard', {
        params: {
          period: 'month',
          year: parseInt(year),
          month: parseInt(month)
        }
      })
      
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
  
  const getCategoryLabel = (category) => {
    return t.value[category] || category
  }
  
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }
  
  const formatPercentage = (percent) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(percent)
  }
  
  const formatBoxSize = (size) => {
    const labels = {
      'extra-small': 'XS - Extra Small',
      'small': 'S - Small',
      'medium': 'M - Medium',
      'large': 'L - Large',
      'extra-large': 'XL - Extra Large'
    }
    return labels[size] || size
  }
  
  onMounted(() => {
    selectedMonth.value = `${currentYear}-${String(currentMonth).padStart(2, '0')}`
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