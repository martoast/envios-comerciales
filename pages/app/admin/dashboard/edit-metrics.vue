<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div class="flex items-center gap-3 sm:gap-4">
            <NuxtLink 
              to="/app/admin/dashboard" 
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{{ t.editMetrics }}</h1>
              <p class="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{{ t.editMetricsSubtitle }} - {{ monthName }} {{ year }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl">
            <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
  
        <!-- Error Alert -->
        <Transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="errorMessage" class="mb-4 sm:mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-3 sm:p-4 shadow-sm">
            <div class="flex">
              <svg class="w-5 h-5 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              <p class="ml-3 text-sm font-medium text-red-800 flex-1">{{ errorMessage }}</p>
              <button @click="errorMessage = ''" class="ml-3 flex-shrink-0">
                <svg class="w-5 h-5 text-red-400 hover:text-red-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </Transition>
  
        <!-- Success Alert -->
        <Transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="successMessage" class="mb-4 sm:mb-6 bg-green-50 border-l-4 border-green-500 rounded-lg p-3 sm:p-4 shadow-sm">
            <div class="flex">
              <svg class="w-5 h-5 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <p class="ml-3 text-sm font-medium text-green-800 flex-1">{{ successMessage }}</p>
              <button @click="successMessage = ''" class="ml-3 flex-shrink-0">
                <svg class="w-5 h-5 text-green-400 hover:text-green-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </Transition>
  
        <!-- Form -->
        <form v-if="!loading" @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
          <!-- Financial Metrics Card -->
          <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{{ t.financialMetrics }}</h2>
            
            <div class="space-y-3 sm:space-y-4">
              <!-- Revenue -->
              <div>
                <label for="total_revenue" class="block text-sm font-medium text-gray-700 mb-1.5">
                  {{ t.totalRevenue }} <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input
                    v-model.number="form.total_revenue"
                    type="number"
                    id="total_revenue"
                    step="0.01"
                    min="0"
                    :placeholder="t.revenuePlaceholder"
                    class="w-full pl-8 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                </div>
                <p class="text-xs text-gray-500 mt-1">{{ t.revenueHelp }}</p>
              </div>
  
              <!-- Expenses -->
              <div>
                <label for="total_expenses" class="block text-sm font-medium text-gray-700 mb-1.5">
                  {{ t.totalExpenses }} <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input
                    v-model.number="form.total_expenses"
                    type="number"
                    id="total_expenses"
                    step="0.01"
                    min="0"
                    :placeholder="t.expensesPlaceholder"
                    class="w-full pl-8 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                </div>
                <p class="text-xs text-gray-500 mt-1">{{ t.expensesHelp }}</p>
              </div>
  
              <!-- Profit (Calculated) -->
              <div class="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <label class="block text-sm font-medium text-primary-900 mb-1">{{ t.netProfit }}</label>
                <p :class="['text-2xl font-bold', calculatedProfit >= 0 ? 'text-green-600' : 'text-red-600']">
                  ${{ formatMoney(Math.abs(calculatedProfit)) }}
                </p>
                <p class="text-xs text-primary-700 mt-1">{{ t.autoCalculated }}</p>
              </div>
            </div>
          </div>
  
          <!-- Order Metrics Card -->
          <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{{ t.orderMetrics }}</h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <!-- Total Orders -->
              <div>
                <label for="total_orders" class="block text-sm font-medium text-gray-700 mb-1.5">
                  {{ t.totalOrders }} <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.total_orders"
                  type="number"
                  id="total_orders"
                  min="0"
                  :placeholder="t.ordersPlaceholder"
                  class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>
  
            
            </div>
          </div>
  
          <!-- Box Distribution Card -->
          <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{{ t.boxDistribution }}</h2>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <!-- Extra Small -->
              <div>
                <label for="boxes_extra_small" class="block text-sm font-medium text-gray-700 mb-1.5">
                  XS <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.boxes_extra_small"
                  type="number"
                  id="boxes_extra_small"
                  min="0"
                  placeholder="0"
                  class="w-full px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>
  
              <!-- Small -->
              <div>
                <label for="boxes_small" class="block text-sm font-medium text-gray-700 mb-1.5">
                  S <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.boxes_small"
                  type="number"
                  id="boxes_small"
                  min="0"
                  placeholder="0"
                  class="w-full px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>
  
              <!-- Medium -->
              <div>
                <label for="boxes_medium" class="block text-sm font-medium text-gray-700 mb-1.5">
                  M <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.boxes_medium"
                  type="number"
                  id="boxes_medium"
                  min="0"
                  placeholder="0"
                  class="w-full px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>
  
              <!-- Large -->
              <div>
                <label for="boxes_large" class="block text-sm font-medium text-gray-700 mb-1.5">
                  L <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.boxes_large"
                  type="number"
                  id="boxes_large"
                  min="0"
                  placeholder="0"
                  class="w-full px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>
  
              <!-- Extra Large -->
              <div>
                <label for="boxes_extra_large" class="block text-sm font-medium text-gray-700 mb-1.5">
                  XL <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.boxes_extra_large"
                  type="number"
                  id="boxes_extra_large"
                  min="0"
                  placeholder="0"
                  class="w-full px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>
            </div>
  
            <!-- Total Boxes Display -->
            <div class="mt-4 p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-600">{{ t.totalBoxes }}: <span class="font-bold text-gray-900">{{ totalBoxes }}</span></p>
            </div>
          </div>
  
          <!-- Marketing Metrics Card -->
          <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{{ t.marketingMetrics }}</h2>
            
            <div>
              <label for="total_conversations" class="block text-sm font-medium text-gray-700 mb-1.5">
                {{ t.totalConversations }} <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="form.total_conversations"
                type="number"
                id="total_conversations"
                min="0"
                :placeholder="t.conversationsPlaceholder"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                required
              >
              <p class="text-xs text-gray-500 mt-1">{{ t.conversationsHelp }}</p>
            </div>
          </div>
  
          <!-- Notes Card -->
          <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{{ t.notes }}</h2>
            
            <div>
              <label for="notes" class="block text-sm font-medium text-gray-700 mb-1.5">
                {{ t.notesLabel }}
              </label>
              <textarea
                v-model="form.notes"
                id="notes"
                rows="4"
                :placeholder="t.notesPlaceholder"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">{{ t.notesHelp }}</p>
            </div>
          </div>
  
          <!-- Action Buttons -->
          <div class="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between pt-2">
            <NuxtLink
              to="/app/admin/dashboard"
              class="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-700 font-medium rounded-lg sm:rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200 text-center text-sm sm:text-base"
            >
              {{ t.cancel }}
            </NuxtLink>
            
            <button
              type="submit"
              :disabled="saving"
              class="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:from-primary-600 hover:to-primary-700 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="!saving">{{ t.saveMetrics }}</span>
              <span v-else>{{ t.saving }}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin']
  })
  
  const { $customFetch } = useNuxtApp()
  const route = useRoute()
  const router = useRouter()
  const { t: createTranslations } = useLanguage()
  
  // Get year and month from query params
  const year = ref(parseInt(route.query.year) || new Date().getFullYear())
  const month = ref(parseInt(route.query.month) || new Date().getMonth() + 1)
  
  // State
  const loading = ref(true)
  const saving = ref(false)
  const errorMessage = ref('')
  const successMessage = ref('')
  
  const form = ref({
    total_revenue: 0,
    total_expenses: 0,
    total_orders: 0,
    boxes_extra_small: 0,
    boxes_small: 0,
    boxes_medium: 0,
    boxes_large: 0,
    boxes_extra_large: 0,
    total_conversations: 0,
    notes: ''
  })
  
  // Computed
  const calculatedProfit = computed(() => {
    return form.value.total_revenue - form.value.total_expenses
  })
  
  const totalBoxes = computed(() => {
    return form.value.boxes_extra_small +
           form.value.boxes_small +
           form.value.boxes_medium +
           form.value.boxes_large +
           form.value.boxes_extra_large
  })
  
  const monthName = computed(() => {
    const date = new Date(year.value, month.value - 1)
    return date.toLocaleDateString('es-MX', { month: 'long' })
  })
  
  // Translations
const translations = {
  editMetrics: { es: 'Editar Métricas', en: 'Edit Metrics' },
  editMetricsSubtitle: { es: 'Editar métricas manuales del mes', en: 'Edit manual metrics for the month' },
  financialMetrics: { es: 'Métricas Financieras', en: 'Financial Metrics' },
  totalRevenue: { es: 'Ingresos Totales', en: 'Total Revenue' },
  revenuePlaceholder: { es: '45000.00', en: '45000.00' },
  revenueHelp: { es: 'Total de ingresos del mes en MXN', en: 'Total revenue for the month in MXN' },
  totalExpenses: { es: 'Gastos Totales', en: 'Total Expenses' },
  expensesPlaceholder: { es: '12000.00', en: '12000.00' },
  expensesHelp: { es: 'Total de gastos del mes en MXN', en: 'Total expenses for the month in MXN' },
  netProfit: { es: 'Ganancia Neta', en: 'Net Profit' },
  autoCalculated: { es: 'Calculado automáticamente', en: 'Automatically calculated' },
  orderMetrics: { es: 'Métricas de Órdenes', en: 'Order Metrics' },
  totalOrders: { es: 'Órdenes Totales', en: 'Total Orders' },
  ordersPlaceholder: { es: '87', en: '87' },
  ordersDelivered: { es: 'Órdenes Entregadas', en: 'Orders Delivered' },
  deliveredPlaceholder: { es: '82', en: '82' },
  boxDistribution: { es: 'Distribución de Cajas', en: 'Box Distribution' },
  totalBoxes: { es: 'Total de Cajas', en: 'Total Boxes' },
  marketingMetrics: { es: 'Métricas de Marketing', en: 'Marketing Metrics' },
  totalConversations: { es: 'Total de Conversaciones', en: 'Total Conversations' },
  conversationsPlaceholder: { es: '450', en: '450' },
  conversationsHelp: { es: 'Conversaciones en WhatsApp, Meta, etc.', en: 'Conversations on WhatsApp, Meta, etc.' },
  notes: { es: 'Notas', en: 'Notes' },
  notesLabel: { es: 'Notas Opcionales', en: 'Optional Notes' },
  notesPlaceholder: { es: 'Ej: Gran mes, temporada alta, promoción especial...', en: 'Ex: Great month, high season, special promotion...' },
  notesHelp: { es: 'Cualquier nota o comentario sobre este mes', en: 'Any notes or comments about this month' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  saveMetrics: { es: 'Guardar Métricas', en: 'Save Metrics' },
  saving: { es: 'Guardando...', en: 'Saving...' },
  successMessage: { es: '¡Métricas guardadas exitosamente!', en: 'Metrics saved successfully!' },
  errorSaving: { es: 'Error al guardar las métricas. Intenta de nuevo.', en: 'Error saving metrics. Please try again.' },
}

const t = createTranslations(translations)

// Methods
const fetchExistingMetrics = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    const response = await $customFetch('/admin/dashboard/manual-metrics', {
      params: {
        year: year.value,
        month: month.value
      }
    })
    
    if (response.data) {
      // Populate form with existing data
      form.value = {
        total_revenue: response.data.total_revenue || 0,
        total_expenses: response.data.total_expenses || 0,
        total_orders: response.data.total_orders || 0,
        boxes_extra_small: response.data.boxes_extra_small || 0,
        boxes_small: response.data.boxes_small || 0,
        boxes_medium: response.data.boxes_medium || 0,
        boxes_large: response.data.boxes_large || 0,
        boxes_extra_large: response.data.boxes_extra_large || 0,
        total_conversations: response.data.total_conversations || 0,
        notes: response.data.notes || ''
      }
    }
  } catch (error) {
    console.error('Error fetching metrics:', error)
    // If no metrics exist yet, that's okay - form will be empty
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  saving.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    // Calculate profit
    const total_profit = form.value.total_revenue - form.value.total_expenses
    
    await $customFetch('/admin/dashboard/manual-metrics', {
      method: 'POST',
      body: {
        year: year.value,
        month: month.value,
        total_revenue: form.value.total_revenue,
        total_expenses: form.value.total_expenses,
        total_profit: total_profit,
        total_orders: form.value.total_orders,
        boxes_extra_small: form.value.boxes_extra_small,
        boxes_small: form.value.boxes_small,
        boxes_medium: form.value.boxes_medium,
        boxes_large: form.value.boxes_large,
        boxes_extra_large: form.value.boxes_extra_large,
        total_conversations: form.value.total_conversations,
        notes: form.value.notes
      }
    })
    
    successMessage.value = t.value.successMessage
    
    // Redirect back to dashboard after 2 seconds
    setTimeout(() => {
      router.push('/app/admin/dashboard')
    }, 2000)
    
  } catch (error) {
    console.error('Error saving metrics:', error)
    errorMessage.value = t.value.errorSaving
  } finally {
    saving.value = false
  }
}

const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

onMounted(() => {
  fetchExistingMetrics()
})
</script>

<style scoped>
/* Reuse the same fade-in animation */
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