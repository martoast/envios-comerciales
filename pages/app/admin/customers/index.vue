<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Admin Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <!-- Mobile Layout -->
          <div class="lg:hidden space-y-4">
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-extrabold text-gray-900">{{ t.customers }}</h1>
              <NuxtLink 
                to="/app/admin/dashboard" 
                class="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
  
          <!-- Desktop Layout -->
          <div class="hidden lg:flex lg:items-center lg:justify-between">
            <div class="flex items-center gap-8 animate-fadeIn">
              <h1 class="text-3xl font-extrabold text-gray-900">{{ t.customers }}</h1>
            </div>
  
            <!-- Dashboard Link Desktop -->
            <NuxtLink 
              to="/app/admin/dashboard" 
              class="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 animate-fadeIn"
              style="animation-delay: 0.1s"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              {{ t.dashboard }}
            </NuxtLink>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <!-- Stats Cards - Horizontal scroll on mobile -->
        <div class="mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div class="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 pb-4 sm:pb-0 scrollbar-hide">
            <div 
              v-for="(stat, index) in stats" 
              :key="stat.label"
              class="min-w-[160px] sm:min-w-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-fadeIn hover:shadow-md transition-all duration-300"
              :style="`animation-delay: ${(index + 2) * 0.1}s`"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-medium text-gray-600 uppercase tracking-wider">{{ stat.label }}</p>
                  <p class="mt-2 text-2xl font-bold text-gray-900">{{ stat.value }}</p>
                </div>
                <div :class="['p-2.5 rounded-xl', stat.bgColor]">
                  <svg class="w-5 h-5" :class="stat.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Customers Section -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn" style="animation-delay: 0.3s">
          <!-- Search and Filters Section -->
          <div class="px-4 sm:px-6 py-4 bg-gray-50/50 border-b border-gray-100">
            <div class="space-y-3">
              <!-- Search Input -->
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="t.searchPlaceholder"
                  class="block w-full pl-10 pr-10 py-3 sm:py-2.5 border border-gray-200 rounded-xl bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  style="max-width: 500px;"
                >
                <!-- Clear button -->
                <button
                  v-if="searchQuery"
                  @click="searchQuery = ''"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              
              <!-- Active Filter - Full Width on Mobile, Inline on Desktop -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input 
                    v-model="activeOnly" 
                    type="checkbox"
                    class="w-4 h-4 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500 focus:ring-2 cursor-pointer"
                  >
                  <span class="text-sm text-gray-700">{{ t.showActiveOnly }}</span>
                </label>
                
                <!-- Active Filters Count (Desktop) -->
                <div v-if="(searchQuery || activeOnly) && !loading" class="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                  <span>{{ t.showingFiltered }}</span>
                  <button 
                    @click="clearFilters"
                    class="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {{ t.clearFilters }}
                  </button>
                </div>
              </div>
  
              <!-- Active Filters Count (Mobile) -->
              <div v-if="(searchQuery || activeOnly) && !loading" class="sm:hidden flex items-center justify-between text-sm">
                <span class="text-gray-600">{{ t.showingFiltered }}</span>
                <button 
                  @click="clearFilters"
                  class="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {{ t.clearFilters }}
                </button>
              </div>
            </div>
          </div>
  
          <!-- Loading State -->
          <div v-if="loading" class="px-6 py-16 text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4">
              <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p class="text-gray-500">{{ t.loadingCustomers }}</p>
          </div>
  
          <!-- Empty State -->
          <div v-else-if="!loading && customers.length === 0" class="px-6 py-16 text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ t.noCustomers }}</h3>
            <p class="text-gray-500 mb-6 max-w-md mx-auto">{{ t.noCustomersFound }}</p>
          </div>
  
          <!-- Customers List - Mobile Cards / Desktop Table -->
          <div v-else>
            <!-- Mobile Cards -->
            <div class="sm:hidden divide-y divide-gray-100">
              <NuxtLink
                v-for="customer in customers" 
                :key="customer.id"
                :to="`/app/admin/customers/${customer.id}`"
                class="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <p class="font-semibold text-gray-900">{{ customer.name }}</p>
                    <p class="text-sm text-gray-500">{{ customer.email }}</p>
                    <p v-if="customer.phone" class="text-xs text-gray-500 mt-1">{{ customer.phone }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-semibold text-gray-900">{{ customer.orders_count }}</p>
                    <p class="text-xs text-gray-500">{{ t.orders.toLowerCase() }}</p>
                  </div>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4 text-sm">
                    <span :class="[
                      'inline-flex items-center gap-1',
                      customer.active_orders_count > 0 ? 'text-green-600' : 'text-gray-400'
                    ]">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      <span class="font-medium">{{ customer.active_orders_count }}</span> {{ t.active.toLowerCase() }}
                    </span>
                  </div>
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </NuxtLink>
            </div>
  
            <!-- Desktop Table -->
            <div class="hidden sm:block overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {{ t.customer }}
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {{ t.contact }}
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {{ t.orders }}
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {{ t.activeOrders }}
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {{ t.joined }}
                    </th>
                    <th class="relative px-6 py-3">
                      <span class="sr-only">{{ t.actions }}</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr 
                    v-for="customer in customers" 
                    :key="customer.id"
                    class="hover:bg-gray-50 transition-colors cursor-pointer"
                    @click="navigateTo(`/app/admin/customers/${customer.id}`)"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span class="text-primary-700 font-medium text-sm">
                            {{ customer.name.charAt(0).toUpperCase() }}
                          </span>
                        </div>
                        <div class="ml-4">
                          <p class="text-sm font-medium text-gray-900">{{ customer.name }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p class="text-sm text-gray-900">{{ customer.email }}</p>
                        <p v-if="customer.phone" class="text-sm text-gray-500">{{ customer.phone }}</p>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-sm font-semibold text-gray-900">{{ customer.orders_count }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center gap-2">
                        <span :class="[
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          customer.active_orders_count > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        ]">
                          {{ customer.active_orders_count }}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(customer.created_at) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <NuxtLink 
                        :to="`/app/admin/customers/${customer.id}`"
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
                  {{ t.showing }} <span class="font-medium">{{ pagination.from }}</span> {{ t.to }} 
                  <span class="font-medium">{{ pagination.to }}</span> {{ t.of }} 
                  <span class="font-medium">{{ pagination.total }}</span> {{ t.results }}
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
  import { ref, computed, onMounted, watch } from 'vue'
  
  // Define page meta
  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin']
  })
  
  // Nuxt imports
  const { $customFetch } = useNuxtApp()
  
  // Use language composable
  const { t: createTranslations } = useLanguage()
  
  // State
  const customers = ref([])
  const allCustomers = ref([]) // Store all customers for stats
  const loading = ref(true)
  const searchQuery = ref('')
  const activeOnly = ref(false)
  const searchDebounce = ref(null)
  const pagination = ref({
    currentPage: 1,
    lastPage: 1,
    from: 0,
    to: 0,
    total: 0
  })
  
  // Translations
  const translations = {
    customers: {
      es: 'Clientes',
      en: 'Customers'
    },
    dashboard: {
      es: 'Panel de Control',
      en: 'Dashboard'
    },
    searchPlaceholder: {
      es: 'Buscar por nombre, correo o teléfono...',
      en: 'Search by name, email or phone...'
    },
    showActiveOnly: {
      es: 'Mostrar solo clientes con órdenes activas',
      en: 'Show only customers with active orders'
    },
    showingFiltered: {
      es: 'Mostrando resultados filtrados',
      en: 'Showing filtered results'
    },
    clearFilters: {
      es: 'Limpiar filtros',
      en: 'Clear filters'
    },
    loadingCustomers: {
      es: 'Cargando clientes...',
      en: 'Loading customers...'
    },
    noCustomers: {
      es: 'No se encontraron clientes',
      en: 'No customers found'
    },
    noCustomersFound: {
      es: 'No se encontraron clientes con los filtros actuales.',
      en: 'No customers found with current filters.'
    },
    customer: {
      es: 'Cliente',
      en: 'Customer'
    },
    contact: {
      es: 'Contacto',
      en: 'Contact'
    },
    orders: {
      es: 'Órdenes',
      en: 'Orders'
    },
    activeOrders: {
      es: 'Órdenes Activas',
      en: 'Active Orders'
    },
    joined: {
      es: 'Se unió',
      en: 'Joined'
    },
    actions: {
      es: 'Acciones',
      en: 'Actions'
    },
    viewDetails: {
      es: 'Ver detalles',
      en: 'View details'
    },
    active: {
      es: 'Activas',
      en: 'Active'
    },
    showing: {
      es: 'Mostrando',
      en: 'Showing'
    },
    to: {
      es: 'a',
      en: 'to'
    },
    of: {
      es: 'de',
      en: 'of'
    },
    results: {
      es: 'resultados',
      en: 'results'
    },
    previous: {
      es: 'Anterior',
      en: 'Previous'
    },
    next: {
      es: 'Siguiente',
      en: 'Next'
    },
    // Stats
    totalCustomers: {
      es: 'Total de Clientes',
      en: 'Total Customers'
    },
    withActiveOrders: {
      es: 'Con Órdenes Activas',
      en: 'With Active Orders'
    },
    newThisMonth: {
      es: 'Nuevos Este Mes',
      en: 'New This Month'
    },
    averageOrders: {
      es: 'Promedio de Órdenes',
      en: 'Average Orders'
    }
  }
  
  const t = createTranslations(translations)
  
  // Computed stats
  const stats = computed(() => {
    const customersForStats = allCustomers.value.length > 0 ? allCustomers.value : customers.value
    const totalCustomers = customersForStats.length
    const withActiveOrders = customersForStats.filter(c => c.active_orders_count > 0).length
    
    // Calculate new this month
    const thisMonth = new Date()
    thisMonth.setDate(1)
    thisMonth.setHours(0, 0, 0, 0)
    const newThisMonth = customersForStats.filter(c => new Date(c.created_at) >= thisMonth).length
    
    // Calculate average orders per customer
    const totalOrders = customersForStats.reduce((sum, c) => sum + c.orders_count, 0)
    const avgOrders = totalCustomers > 0 ? (totalOrders / totalCustomers).toFixed(1) : 0
  
    return [
      {
        label: t.value.totalCustomers,
        value: totalCustomers,
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
        bgColor: 'bg-primary-50',
        iconColor: 'text-primary-600'
      },
      {
        label: t.value.withActiveOrders,
        value: withActiveOrders,
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600'
      },
      {
        label: t.value.newThisMonth,
        value: newThisMonth,
        icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
        bgColor: 'bg-yellow-50',
        iconColor: 'text-yellow-600'
      },
      {
        label: t.value.averageOrders,
        value: avgOrders,
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        bgColor: 'bg-slate-50',
        iconColor: 'text-slate-600'
      }
    ]
  })
  
  // Methods
  const fetchCustomers = async (page = 1) => {
    loading.value = true
    try {
      const params = {
        page,
        search: searchQuery.value || undefined,
        active_only: activeOnly.value || undefined
      }
  
      const response = await $customFetch('/admin/customers', { params })
      
      customers.value = response.data.data
      pagination.value = {
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        from: response.data.from,
        to: response.data.to,
        total: response.data.total
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      loading.value = false
    }
  }
  
  // Fetch all customers for stats (without filters)
  const fetchAllCustomersForStats = async () => {
    try {
      const response = await $customFetch('/admin/customers', {
        params: {
          page: 1,
          per_page: 1000 // Get all customers for stats
        }
      })
      allCustomers.value = response.data.data
    } catch (error) {
      console.error('Error fetching all customers:', error)
    }
  }
  
  const changePage = (page) => {
    if (page >= 1 && page <= pagination.value.lastPage) {
      fetchCustomers(page)
    }
  }
  
  const clearFilters = () => {
    searchQuery.value = ''
    activeOnly.value = false
    fetchCustomers(1)
  }
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  // Watch search query with debounce
  watch(searchQuery, () => {
    clearTimeout(searchDebounce.value)
    searchDebounce.value = setTimeout(() => {
      fetchCustomers(1)
    }, 300)
  })
  
  // Watch active only filter
  watch(activeOnly, () => {
    fetchCustomers(1)
  })
  
  // Fetch data on mount
  onMounted(() => {
    fetchCustomers()
    fetchAllCustomersForStats()
  })
  
  // Cleanup
  onUnmounted(() => {
    clearTimeout(searchDebounce.value)
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
  
  /* Hide scrollbar for stats cards on mobile */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  </style>