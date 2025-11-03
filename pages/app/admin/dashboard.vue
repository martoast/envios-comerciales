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

            <button
              @click="showMetricsModal = true"
              class="inline-flex items-center px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              {{ t.editMetrics }}
            </button>

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
        <!-- Quick Stats Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Total Orders Card -->
          <div class="bg-bg-card rounded-2xl shadow-sm border border-border p-6 animate-fadeIn">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2.5 rounded-xl bg-primary-50">
                <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
            </div>
            <p class="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{{ t.totalOrders }}</p>
            <p class="text-2xl font-bold text-text-primary">{{ totalOrdersCount }}</p>
            <p class="text-xs text-text-secondary mt-1">{{ t.allStatuses }}</p>
          </div>

          <!-- Active Orders Card -->
          <div class="bg-bg-card rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 0.1s">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2.5 rounded-xl bg-primary-50">
                <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
            </div>
            <p class="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{{ t.activeOrders }}</p>
            <p class="text-2xl font-bold text-text-primary">{{ dashboardData?.overview?.active_orders || 0 }}</p>
            <p class="text-xs text-text-secondary mt-1">{{ t.inProgress }}</p>
          </div>

          <!-- Total Packages Card -->
          <div class="bg-bg-card rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 0.2s">
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
          <div class="bg-bg-card rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 0.3s">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2.5 rounded-xl bg-accent-green-light">
                <svg class="w-5 h-5 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
            </div>
            <p class="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{{ t.totalCustomers }}</p>
            <p class="text-2xl font-bold text-text-primary">{{ dashboardData?.overview?.total_customers || 0 }}</p>
            <p class="text-xs text-text-secondary mt-1">{{ dashboardData?.overview?.active_customers || 0 }} {{ t.active }}</p>
          </div>
        </div>

        <!-- Financial Overview Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Revenue Card -->
          <div class="bg-gradient-to-br from-accent-green-light to-green-50 rounded-2xl shadow-sm border border-green-200 p-6 animate-fadeIn" style="animation-delay: 0.4s">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 rounded-xl bg-accent-green text-white">
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
          <div class="bg-gradient-to-br from-accent-red-light to-red-50 rounded-2xl shadow-sm border border-accent-red p-6 animate-fadeIn" style="animation-delay: 0.5s">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 rounded-xl bg-accent-red text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
                </svg>
              </div>
            </div>
            <p class="text-sm font-medium text-red-900 uppercase tracking-wider">{{ t.totalExpenses }}</p>
            <p class="mt-2 text-3xl font-bold text-red-900">${{ formatMoney(dashboardData?.financial?.expenses?.total || 0) }}</p>
            <p class="text-xs text-red-700 mt-1">{{ t.allCategories }}</p>
          </div>

          <!-- Profit Card -->
          <div class="bg-gradient-to-br from-accent-blue-light to-primary-50 rounded-2xl shadow-sm border border-primary-300 p-6 animate-fadeIn" style="animation-delay: 0.6s">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 rounded-xl bg-primary-500 text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <p class="text-sm font-medium text-primary-900 uppercase tracking-wider">{{ t.netProfit }}</p>
            <p :class="['mt-2 text-3xl font-bold', profit >= 0 ? 'text-primary-900' : 'text-accent-red']">
              ${{ formatMoney(Math.abs(profit)) }}
            </p>
            <p class="text-xs text-primary-700 mt-1">{{ formatPercentage(profitMargin) }}% {{ t.margin }}</p>
          </div>
        </div>

        <!-- Marketing Metrics Row -->
        <div v-if="hasMetrics" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- CAC Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 0.7s">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2.5 rounded-xl bg-amber-50">
                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
            </div>
            <p class="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{{ t.cac }}</p>
            <p class="text-2xl font-bold text-text-primary">${{ formatMoney(dashboardData?.financial?.metrics?.cac || 0) }}</p>
            <p class="text-xs text-text-secondary mt-1">{{ t.costPerCustomer }}</p>
          </div>

          <!-- ROAS Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 0.8s">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2.5 rounded-xl bg-primary-50">
                <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
            </div>
            <p class="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{{ t.roas }}</p>
            <p class="text-2xl font-bold text-text-primary">{{ formatRatio(dashboardData?.financial?.metrics?.roas || 0) }}x</p>
            <p class="text-xs text-text-secondary mt-1">{{ t.returnOnAdSpend }}</p>
          </div>

          <!-- Conversion Rate Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 0.9s">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2.5 rounded-xl bg-primary-50">
                <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
            </div>
            <p class="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{{ t.conversionRate }}</p>
            <p class="text-2xl font-bold text-text-primary">{{ formatPercentage(dashboardData?.financial?.metrics?.conversion_rate || 0) }}%</p>
            <p class="text-xs text-text-secondary mt-1">{{ t.signupsToOrders }}</p>
          </div>

          <!-- Conversations Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 1s">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2.5 rounded-xl bg-accent-green-light">
                <svg class="w-5 h-5 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
            </div>
            <p class="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{{ t.conversations }}</p>
            <p class="text-2xl font-bold text-text-primary">{{ dashboardData?.financial?.manual_metrics?.conversations || 0 }}</p>
            <p class="text-xs text-text-secondary mt-1">{{ t.thisMonth }}</p>
          </div>
        </div>

        <!-- No Metrics Warning -->
        <div v-else class="bg-amber-50 border border-amber-300 rounded-2xl p-6 animate-fadeIn">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-sm font-medium text-text-primary">{{ t.noMetricsTitle }}</h3>
              <p class="text-sm text-text-secondary mt-1">{{ t.noMetricsDescription }}</p>
              <button
                @click="showMetricsModal = true"
                class="mt-3 inline-flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                {{ t.addMetrics }}
              </button>
            </div>
          </div>
        </div>

        <!-- Expense Breakdown -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Expense Categories -->
          <div class="bg-bg-card rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 1.1s">
            <h3 class="text-lg font-bold text-text-primary mb-4">{{ t.expenseBreakdown }}</h3>
            <div class="space-y-2">
              <div v-for="(amount, category) in expenses" :key="category" class="flex items-center justify-between py-2 border-b border-border-light last:border-0">
                <span class="text-sm font-medium text-text-primary">{{ getCategoryLabel(category) }}</span>
                <span class="text-lg font-bold text-text-primary">${{ formatMoney(amount) }}</span>
              </div>
            </div>
          </div>

          <!-- Box Sizes -->
          <div class="bg-bg-card rounded-2xl shadow-sm border border-border p-6 animate-fadeIn" style="animation-delay: 1.2s">
            <h3 class="text-lg font-bold text-text-primary mb-4">{{ t.boxSizeDistribution }}</h3>
            <div class="space-y-2">
              <div v-for="(count, size) in boxDistribution" :key="size" class="flex items-center justify-between py-2 border-b border-border-light last:border-0">
                <span class="text-sm font-medium text-text-primary">{{ formatBoxSize(size) }}</span>
                <span class="text-lg font-bold text-text-primary">{{ count }}</span>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>

    <!-- Manual Metrics Modal -->
    <div v-if="showMetricsModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" @click.self="showMetricsModal = false">
      <div class="bg-bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-text-primary">{{ t.editMetrics }}</h3>
          <button @click="showMetricsModal = false" class="text-text-secondary hover:text-text-primary transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveMetrics" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-text-primary mb-2">{{ t.totalConversations }}</label>
            <input
              v-model.number="metricsForm.total_conversations"
              type="number"
              min="0"
              required
              class="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              :placeholder="t.conversationsPlaceholder"
            />
            <p class="text-xs text-text-secondary mt-1">{{ t.conversationsHelp }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-text-primary mb-2">{{ t.notes }}</label>
            <textarea
              v-model="metricsForm.notes"
              rows="4"
              class="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              :placeholder="t.notesPlaceholder"
            ></textarea>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showMetricsModal = false"
              class="flex-1 px-4 py-2 border border-border text-text-secondary rounded-xl hover:bg-bg-main transition-colors"
            >
              {{ t.cancel }}
            </button>
            <button
              type="submit"
              :disabled="savingMetrics"
              class="flex-1 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50"
            >
              {{ savingMetrics ? t.saving : t.save }}
            </button>
          </div>
        </form>
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
const router = useRouter()
const user = useUser().value
const { t: createTranslations } = useLanguage()

// State
const loading = ref(true)
const dashboardData = ref(null)
const selectedMonth = ref('')
const showMetricsModal = ref(false)
const savingMetrics = ref(false)
const metricsForm = ref({
  total_conversations: 0,
  notes: ''
})

// Get current date
const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth() + 1

// Available months
const availableMonths = computed(() => {
  const months = []
  for (let i = 1; i <= 12; i++) {
    const date = new Date(currentYear, i - 1)
    const label = date.toLocaleDateString(user?.preferred_language === 'es' ? 'es-MX' : 'en-US', {
      month: 'long',
      year: 'numeric'
    })
    months.push({
      value: `${currentYear}-${String(i).padStart(2, '0')}`,
      label
    })
  }
  return months.reverse()
})

// Computed - Total orders count
const totalOrdersCount = computed(() => {
  if (!dashboardData.value?.orders?.by_status) return 0
  const orders = dashboardData.value.orders.by_status
  return Object.values(orders).reduce((sum, count) => sum + count, 0)
})

// Computed - Financial metrics
const profit = computed(() => dashboardData.value?.financial?.profit?.amount || 0)
const profitMargin = computed(() => dashboardData.value?.financial?.profit?.margin || 0)

// Computed - Check if metrics exist
const hasMetrics = computed(() => {
  return dashboardData.value?.financial?.manual_metrics && 
         dashboardData.value.financial.manual_metrics.conversations > 0
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
  return dist
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
  cac: { es: 'CAC', en: 'CAC' },
  costPerCustomer: { es: 'Costo por cliente', en: 'Cost per customer' },
  roas: { es: 'ROAS', en: 'ROAS' },
  returnOnAdSpend: { es: 'Retorno de inversión publicitaria', en: 'Return on ad spend' },
  conversionRate: { es: 'Tasa de Conversión', en: 'Conversion Rate' },
  conversations: { es: 'Conversaciones', en: 'Conversations' },
  signupsToOrders: { es: 'registros a órdenes', en: 'signups to orders' },
  thisMonth: { es: 'este mes', en: 'this month' },
  totalOrders: { es: 'Órdenes Totales', en: 'Total Orders' },
  activeOrders: { es: 'Órdenes Activas', en: 'Active Orders' },
  totalPackages: { es: 'Paquetes Totales', en: 'Total Packages' },
  totalCustomers: { es: 'Clientes Totales', en: 'Total Customers' },
  allStatuses: { es: 'todos los estados', en: 'all statuses' },
  inProgress: { es: 'en progreso', en: 'in progress' },
  awaiting: { es: 'esperando', en: 'awaiting' },
  active: { es: 'activos', en: 'active' },
  expenseBreakdown: { es: 'Desglose de Gastos', en: 'Expense Breakdown' },
  boxSizeDistribution: { es: 'Distribución de Tamaños', en: 'Box Size Distribution' },
  expectedToday: { es: 'Esperados Hoy', en: 'Expected Today' },
  overdue: { es: 'Retrasados', en: 'Overdue' },
  arrivingSoon: { es: 'Próximos', en: 'Arriving Soon' },
  today: { es: 'Hoy', en: 'Today' },
  alert: { es: '¡Alerta!', en: 'Alert!' },
  recentOrders: { es: 'Actividad de Hoy', en: "Today's Activity" },
  viewAll: { es: 'Ver Todas', en: 'View All' },
  noRecentOrders: { es: 'No hay actividad hoy', en: 'No activity today' },
  allCategories: { es: 'todas las categorías', en: 'all categories' },
  todayActivity: { es: 'Actividad', en: 'Activity' },
  count: { es: 'Cantidad', en: 'Count' },
  ordersCreated: { es: 'Órdenes Creadas', en: 'Orders Created' },
  packagesArrived: { es: 'Paquetes Llegados', en: 'Packages Arrived' },
  invoicesSent: { es: 'Facturas Enviadas', en: 'Invoices Sent' },
  paymentsReceived: { es: 'Pagos Recibidos', en: 'Payments Received' },
  ordersShipped: { es: 'Órdenes Enviadas', en: 'Orders Shipped' },
  // No metrics warning
  noMetricsTitle: { es: 'Métricas Manuales Faltantes', en: 'Missing Manual Metrics' },
  noMetricsDescription: { es: 'Agrega el número de conversaciones para calcular CAC, ROAS y tasa de conversión.', en: 'Add conversation count to calculate CAC, ROAS, and conversion rate.' },
  addMetrics: { es: 'Agregar Métricas', en: 'Add Metrics' },
  // Modal
  totalConversations: { es: 'Total de Conversaciones', en: 'Total Conversations' },
  conversationsPlaceholder: { es: 'Ej: 450', en: 'Ex: 450' },
  conversationsHelp: { es: 'Conversaciones en WhatsApp, Meta, etc.', en: 'Conversations on WhatsApp, Meta, etc.' },
  notes: { es: 'Notas', en: 'Notes' },
  notesPlaceholder: { es: 'Notas opcionales sobre este mes...', en: 'Optional notes about this month...' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  save: { es: 'Guardar', en: 'Save' },
  saving: { es: 'Guardando...', en: 'Saving...' },
  // Expense categories
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
    
    // Populate metrics form if data exists
    if (response.data?.financial?.manual_metrics) {
      metricsForm.value = {
        total_conversations: response.data.financial.manual_metrics.conversations || 0,
        notes: response.data.financial.manual_metrics.notes || ''
      }
    }
  } catch (error) {
    console.error('Error fetching dashboard:', error)
  } finally {
    loading.value = false
  }
}

const saveMetrics = async () => {
  savingMetrics.value = true
  try {
    const [year, month] = selectedMonth.value.split('-')
    
    await $customFetch('/admin/dashboard/manual-metrics', {
      method: 'PUT',
      body: {
        year: parseInt(year),
        month: parseInt(month),
        total_conversations: metricsForm.value.total_conversations,
        notes: metricsForm.value.notes
      }
    })
    
    showMetricsModal.value = false
    await fetchDashboard()
  } catch (error) {
    console.error('Error saving metrics:', error)
    alert(t.value.errorSaving || 'Error saving metrics')
  } finally {
    savingMetrics.value = false
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

const formatRatio = (ratio) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(ratio)
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
  // Set default to current month
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