<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Admin Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <!-- Mobile Layout -->
        <div class="lg:hidden space-y-4">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-extrabold text-gray-900">{{ t.affiliates }}</h1>
            <div class="flex items-center gap-2">
              <NuxtLink
                to="/app/admin/affiliates/create"
                class="p-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-sm"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden lg:flex lg:items-center lg:justify-between">
          <h1 class="text-3xl font-extrabold text-gray-900">{{ t.affiliates }}</h1>
          <NuxtLink
            to="/app/admin/affiliates/create"
            class="inline-flex items-center px-4 py-2.5 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ t.addAffiliate }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p class="text-sm text-gray-500 mb-1">{{ stat.label }}</p>
          <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
        </div>
      </div>

      <!-- Affiliates Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Search and Filters -->
        <div class="px-4 sm:px-6 py-4 bg-gray-50/50 border-b border-gray-100">
          <div class="space-y-3">
            <!-- Search Input -->
            <div class="relative" style="max-width: 500px">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="t.searchPlaceholder"
                class="block w-full pl-10 pr-10 py-3 sm:py-2.5 border border-gray-200 rounded-xl bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Filters Row -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
              <!-- Status Filter -->
              <select
                v-model="statusFilter"
                class="px-3 py-2 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">{{ t.allStatuses }}</option>
                <option value="active">{{ t.statusActive }}</option>
                <option value="pending">{{ t.statusPending }}</option>
                <option value="suspended">{{ t.statusSuspended }}</option>
              </select>

              <!-- Has Pending Earnings -->
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="hasPendingEarnings"
                  type="checkbox"
                  class="w-4 h-4 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500 focus:ring-2 cursor-pointer"
                />
                <span class="text-sm text-gray-700">{{ t.hasPendingEarnings }}</span>
              </label>

              <!-- Clear Filters -->
              <button
                v-if="searchQuery || statusFilter || hasPendingEarnings"
                @click="clearFilters"
                class="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                {{ t.clearFilters }}
              </button>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="px-6 py-16 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4">
            <svg class="animate-spin h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p class="text-gray-500">{{ t.loading }}</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="!loading && affiliates.length === 0" class="px-6 py-16 text-center">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ t.noAffiliates }}</h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">{{ t.noAffiliatesFound }}</p>
        </div>

        <!-- Affiliates List -->
        <div v-else>
          <!-- Mobile Cards -->
          <div class="sm:hidden divide-y divide-gray-100">
            <NuxtLink
              v-for="affiliate in affiliates"
              :key="affiliate.id"
              :to="`/app/admin/affiliates/${affiliate.id}`"
              class="block p-4 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-start justify-between mb-3">
                <div>
                  <p class="font-semibold text-gray-900">{{ affiliate.user?.name }}</p>
                  <p class="text-sm text-gray-500">{{ affiliate.user?.email }}</p>
                  <p class="text-xs text-primary-600 font-mono mt-1">{{ affiliate.affiliate_code }}</p>
                </div>
                <span :class="getStatusBadgeClass(affiliate.status)" class="text-xs px-2 py-1 rounded-full font-medium">
                  {{ getStatusLabel(affiliate.status) }}
                </span>
              </div>

              <div class="grid grid-cols-4 gap-2 text-center text-sm">
                <div>
                  <p class="font-semibold text-gray-900">{{ affiliate.referral_count || 0 }}</p>
                  <p class="text-xs text-gray-500">{{ t.referrals }}</p>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ affiliate.conversion_count || 0 }}</p>
                  <p class="text-xs text-gray-500">{{ t.conversions }}</p>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">${{ formatMoney(affiliate.total_earnings || 0) }}</p>
                  <p class="text-xs text-gray-500">{{ t.earned }}</p>
                </div>
                <div>
                  <p class="font-semibold text-green-600">${{ formatMoney(affiliate.pending_earnings || 0) }}</p>
                  <p class="text-xs text-gray-500">{{ t.pending }}</p>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Desktop Table -->
          <div class="hidden sm:block overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.affiliate }}</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.code }}</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.status }}</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.referrals }}</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.conversions }}</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.earnings }}</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.pendingPayout }}</th>
                  <th class="relative px-6 py-3"><span class="sr-only">{{ t.actions }}</span></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="affiliate in affiliates"
                  :key="affiliate.id"
                  class="hover:bg-gray-50 transition-colors cursor-pointer"
                  @click="navigateTo(`/app/admin/affiliates/${affiliate.id}`)"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span class="text-primary-700 font-medium text-sm">
                          {{ affiliate.user?.name?.charAt(0).toUpperCase() || 'A' }}
                        </span>
                      </div>
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">{{ affiliate.user?.name }}</p>
                        <p class="text-sm text-gray-500">{{ affiliate.user?.email }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="font-mono text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded">{{ affiliate.affiliate_code }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusBadgeClass(affiliate.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ getStatusLabel(affiliate.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <span class="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                      {{ affiliate.referral_count || 0 }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <span :class="[
                      'inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded-full text-sm font-semibold',
                      (affiliate.conversion_count || 0) > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    ]">
                      {{ affiliate.conversion_count || 0 }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                    ${{ formatMoney(affiliate.total_earnings || 0) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right">
                    <span :class="(affiliate.pending_earnings || 0) > 0 ? 'text-green-600 font-semibold' : 'text-gray-500'" class="text-sm">
                      ${{ formatMoney(affiliate.pending_earnings || 0) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <NuxtLink
                      :to="`/app/admin/affiliates/${affiliate.id}`"
                      class="text-primary-600 hover:text-primary-900"
                      @click.stop
                    >
                      {{ t.viewDetails }}
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="pagination.lastPage > 1" class="px-4 sm:px-6 py-4 border-t border-gray-100">
            <div class="flex items-center justify-between">
              <p class="text-sm text-gray-700 hidden sm:block">
                {{ t.showing }}
                <span class="font-medium">{{ pagination.from }}</span>
                {{ t.to }}
                <span class="font-medium">{{ pagination.to }}</span>
                {{ t.of }}
                <span class="font-medium">{{ pagination.total }}</span>
                {{ t.results }}
              </p>
              <p class="text-sm text-gray-700 sm:hidden">
                {{ pagination.from }}-{{ pagination.to }} {{ t.of }} {{ pagination.total }}
              </p>
              <div class="flex gap-2">
                <button
                  @click="changePage(pagination.currentPage - 1)"
                  :disabled="pagination.currentPage === 1"
                  class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {{ t.previous }}
                </button>
                <button
                  @click="changePage(pagination.currentPage + 1)"
                  :disabled="pagination.currentPage === pagination.lastPage"
                  class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {{ t.next }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

const { $customFetch } = useNuxtApp()
const { t: createTranslations } = useLanguage()

// State
const affiliates = ref([])
const loading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('')
const hasPendingEarnings = ref(false)
const searchDebounce = ref(null)
const pagination = ref({
  currentPage: 1,
  lastPage: 1,
  from: 0,
  to: 0,
  total: 0
})
const summaryStats = ref({
  total: 0,
  totalReferrals: 0,
  totalEarnings: 0,
  pendingPayouts: 0
})

// Translations
const translations = {
  affiliates: { es: 'Afiliados', en: 'Affiliates' },
  addAffiliate: { es: 'Agregar Afiliado', en: 'Add Affiliate' },
  searchPlaceholder: { es: 'Buscar por nombre, correo o código...', en: 'Search by name, email or code...' },
  allStatuses: { es: 'Todos los estados', en: 'All statuses' },
  statusActive: { es: 'Activo', en: 'Active' },
  statusPending: { es: 'Pendiente', en: 'Pending' },
  statusSuspended: { es: 'Suspendido', en: 'Suspended' },
  hasPendingEarnings: { es: 'Con ganancias pendientes', en: 'With pending earnings' },
  clearFilters: { es: 'Limpiar filtros', en: 'Clear filters' },
  loading: { es: 'Cargando afiliados...', en: 'Loading affiliates...' },
  noAffiliates: { es: 'No se encontraron afiliados', en: 'No affiliates found' },
  noAffiliatesFound: { es: 'No hay afiliados que coincidan con los filtros.', en: 'No affiliates match the current filters.' },
  affiliate: { es: 'Afiliado', en: 'Affiliate' },
  code: { es: 'Código', en: 'Code' },
  status: { es: 'Estado', en: 'Status' },
  commission: { es: 'Comisión', en: 'Commission' },
  referrals: { es: 'Referidos', en: 'Referrals' },
  conversions: { es: 'Conversiones', en: 'Conversions' },
  earnings: { es: 'Ganancias', en: 'Earnings' },
  earned: { es: 'Ganado', en: 'Earned' },
  pending: { es: 'Pendiente', en: 'Pending' },
  pendingPayout: { es: 'Por Pagar', en: 'Pending Payout' },
  actions: { es: 'Acciones', en: 'Actions' },
  viewDetails: { es: 'Ver detalles', en: 'View details' },
  showing: { es: 'Mostrando', en: 'Showing' },
  to: { es: 'a', en: 'to' },
  of: { es: 'de', en: 'of' },
  results: { es: 'resultados', en: 'results' },
  previous: { es: 'Anterior', en: 'Previous' },
  next: { es: 'Siguiente', en: 'Next' },
  // Stats
  totalAffiliates: { es: 'Total Afiliados', en: 'Total Affiliates' },
  totalReferrals: { es: 'Total Referidos', en: 'Total Referrals' },
  totalEarnings: { es: 'Ganancias Totales', en: 'Total Earnings' },
  pendingPayouts: { es: 'Pagos Pendientes', en: 'Pending Payouts' }
}

const t = createTranslations(translations)

// Computed stats
const stats = computed(() => [
  { label: t.value.totalAffiliates, value: summaryStats.value.total },
  { label: t.value.totalReferrals, value: summaryStats.value.totalReferrals },
  { label: t.value.totalEarnings, value: `$${formatMoney(summaryStats.value.totalEarnings)}` },
  { label: t.value.pendingPayouts, value: `$${formatMoney(summaryStats.value.pendingPayouts)}` }
])

// Methods
const fetchAffiliates = async (page = 1) => {
  loading.value = true
  try {
    const params = {
      page,
      search: searchQuery.value || undefined,
      status: statusFilter.value || undefined,
      has_pending_earnings: hasPendingEarnings.value || undefined
    }

    const response = await $customFetch('/admin/affiliates', { params })

    affiliates.value = response.data.data
    pagination.value = {
      currentPage: response.data.current_page,
      lastPage: response.data.last_page,
      from: response.data.from || 0,
      to: response.data.to || 0,
      total: response.data.total
    }

    // Update summary stats from API response
    if (response.summary) {
      summaryStats.value = {
        total: response.summary.total_affiliates || pagination.value.total,
        totalReferrals: response.summary.total_referrals || 0,
        totalEarnings: response.summary.total_earnings || 0,
        pendingPayouts: response.summary.total_pending || 0
      }
    }
  } catch (error) {
    console.error('Error fetching affiliates:', error)
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.lastPage) {
    fetchAffiliates(page)
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  hasPendingEarnings.value = false
  fetchAffiliates(1)
}

const formatMoney = (amount) => {
  return Number(amount || 0).toFixed(2)
}

const getStatusBadgeClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    suspended: 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const getStatusLabel = (status) => {
  const labels = {
    active: t.value.statusActive,
    pending: t.value.statusPending,
    suspended: t.value.statusSuspended
  }
  return labels[status] || status
}

// Watch filters
watch(searchQuery, () => {
  clearTimeout(searchDebounce.value)
  searchDebounce.value = setTimeout(() => {
    fetchAffiliates(1)
  }, 300)
})

watch([statusFilter, hasPendingEarnings], () => {
  fetchAffiliates(1)
})

// Lifecycle
onMounted(() => {
  fetchAffiliates()
})

onUnmounted(() => {
  clearTimeout(searchDebounce.value)
})
</script>
