<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Admin Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <!-- Mobile Layout -->
          <div class="lg:hidden space-y-4">
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-extrabold text-gray-900">{{ t.allOrders }}</h1>
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
              <h1 class="text-3xl font-extrabold text-gray-900">{{ t.allOrders }}</h1>
              
              
            </div>
  
           
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
  
        <!-- Orders Section -->
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
              
              <!-- Status Filter - Full Width on Mobile, Inline on Desktop -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <select 
                  v-model="statusFilter" 
                  class="w-full sm:w-auto px-4 py-3 sm:py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="">{{ t.allStatuses }}</option>
                  <option v-for="status in orderStatuses" :key="status.value" :value="status.value">
                    {{ status.label }}
                  </option>
                </select>
                
                <!-- Active Filters Count (Desktop) -->
                <div v-if="(searchQuery || statusFilter) && !loading" class="hidden sm:flex items-center gap-2 text-sm text-gray-600">
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
              <div v-if="(searchQuery || statusFilter) && !loading" class="sm:hidden flex items-center justify-between text-sm">
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
            <p class="text-gray-500">{{ t.loadingOrders }}</p>
          </div>
  
          <!-- Empty State -->
          <div v-else-if="!loading && orders.length === 0" class="px-6 py-16 text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ t.noOrders }}</h3>
            <p class="text-gray-500 mb-6 max-w-md mx-auto">{{ t.noOrdersFound }}</p>
          </div>
  
          <!-- Orders List - Mobile Cards / Desktop Table -->
          <div v-else>
            <!-- Mobile Cards -->
            <div class="sm:hidden divide-y divide-gray-100">
              <NuxtLink
                v-for="order in orders" 
                :key="order.id"
                :to="`/app/admin/orders/${order.id}`"
                class="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <p class="font-semibold text-gray-900">{{ order.order_number }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ order.user?.name }}</p>
                  </div>
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStatusColor(order.status)
                  ]">
                    {{ getStatusLabel(order.status) }}
                  </span>
                </div>
                
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center gap-4">
                    <span class="text-gray-500">
                      <span class="font-medium text-gray-900">{{ order.items?.length || 0 }}</span> {{ t.items.toLowerCase() }}
                    </span>
                    <span class="text-gray-500">{{ formatDate(order.created_at) }}</span>
                  </div>
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
  
                <!-- Progress bar for awaiting packages -->
                <div v-if="order.status === 'awaiting_packages'" class="mt-3">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div 
                        class="bg-primary-500 h-1.5 rounded-full transition-all duration-300"
                        :style="`width: ${order.arrival_progress || 0}%`"
                      ></div>
                    </div>
                    <span class="text-xs text-gray-500">{{ order.arrival_progress || 0 }}%</span>
                  </div>
                </div>
              </NuxtLink>
            </div>
  
            <!-- Desktop Table -->
            <div class="hidden sm:block overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {{ t.orderInfo }}
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {{ t.customer }}
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {{ t.status }}
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {{ t.items }}
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {{ t.created }}
                    </th>
                    <th class="relative px-6 py-3">
                      <span class="sr-only">{{ t.actions }}</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr 
                    v-for="order in orders" 
                    :key="order.id"
                    class="hover:bg-gray-50 transition-colors cursor-pointer"
                    @click="navigateTo(`/app/admin/orders/${order.id}`)"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p class="text-sm font-semibold text-gray-900">{{ order.order_number }}</p>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p class="text-sm font-medium text-gray-900">{{ order.user?.name }}</p>
                        <p class="text-sm text-gray-500">{{ order.user?.email }}</p>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getStatusColor(order.status)
                      ]">
                        {{ getStatusLabel(order.status) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center gap-3">
                        <span class="text-sm text-gray-900">{{ order.items?.length || 0 }}</span>
                        <div v-if="order.status === 'awaiting_packages'" class="flex items-center gap-2">
                          <div class="w-24 bg-gray-200 rounded-full h-1.5">
                            <div 
                              class="bg-primary-500 h-1.5 rounded-full transition-all duration-300"
                              :style="`width: ${order.arrival_progress || 0}%`"
                            ></div>
                          </div>
                          <span class="text-xs text-gray-500">{{ order.arrival_progress || 0 }}%</span>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(order.created_at) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <NuxtLink 
                        :to="`/app/admin/orders/${order.id}`"
                        class="text-primary-600 hover:text-primary-900"
                        @click.stop
                      >
                        {{ t.manage }}
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
  
  // Define page meta to use app layout with admin middleware
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
  const orders = ref([])
  const allOrders = ref([]) // Store all orders for stats calculation
  const loading = ref(true)
  const statusFilter = ref('')
  const searchQuery = ref('')
  const searchDebounce = ref(null)
  const pagination = ref({
    currentPage: 1,
    lastPage: 1,
    from: 0,
    to: 0,
    total: 0
  })
  
  // Define translations
  const translations = {
    allOrders: {
      es: 'Órdenes',
      en: 'All Orders'
    },
   
    manageAllOrders: {
      es: 'Gestiona todas las órdenes del sistema',
      en: 'Manage all system orders'
    },
    dashboard: {
      es: 'Panel de Control',
      en: 'Dashboard'
    },
    customer: {
      es: 'Cliente',
      en: 'Customer'
    },
    manage: {
      es: 'Gestionar',
      en: 'Manage'
    },
    allStatuses: {
      es: 'Todos los estados',
      en: 'All statuses'
    },
    searchPlaceholder: {
      es: 'Buscar por nombre, número, cliente o tracking...',
      en: 'Search by name, number, customer or tracking...'
    },
    loadingOrders: {
      es: 'Cargando órdenes...',
      en: 'Loading orders...'
    },
    noOrders: {
      es: 'No se encontraron órdenes',
      en: 'No orders found'
    },
    noOrdersFound: {
      es: 'No se encontraron órdenes con los filtros actuales.',
      en: 'No orders found with current filters.'
    },
    orderInfo: {
      es: 'Información de Orden',
      en: 'Order Info'
    },
    status: {
      es: 'Estado',
      en: 'Status'
    },
    items: {
      es: 'Artículos',
      en: 'Items'
    },
    created: {
      es: 'Creado',
      en: 'Created'
    },
    actions: {
      es: 'Acciones',
      en: 'Actions'
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
    showingFiltered: {
      es: 'Mostrando resultados filtrados',
      en: 'Showing filtered results'
    },
    clearFilters: {
      es: 'Limpiar filtros',
      en: 'Clear filters'
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
    shipped: {
      es: 'Enviado',
      en: 'Shipped'
    },
    delivered: {
      es: 'Entregado',
      en: 'Delivered'
    },
    // Stats
    totalOrders: {
      es: 'Total',
      en: 'Total'
    },
    
    inTransit: {
      es: 'En Tránsito',
      en: 'In Transit'
    },
    awaitingPackages: {
      es: 'Esperando Paquetes',
      en: 'Awaiting Packages'
    },
    deliveredPackages: {
      es: 'Paquetes Entregados',
      en: 'Delivered Packages'
    }
  }
  
  // Get reactive translations
  const t = createTranslations(translations)
  
  // Order statuses
  const orderStatuses = computed(() => [
    { value: 'collecting', label: t.value.collecting },
    { value: 'awaiting_packages', label: t.value.awaiting_packages },
    { value: 'packages_complete', label: t.value.packages_complete },
    { value: 'shipped', label: t.value.shipped },
    { value: 'delivered', label: t.value.delivered }
  ])
  
  // Computed stats - based on ALL orders, not filtered
  const stats = computed(() => {
    // Use allOrders for stats if available, otherwise use current orders
    const ordersForStats = allOrders.value.length > 0 ? allOrders.value : orders.value
    const totalOrders = ordersForStats.length
    const inTransit = ordersForStats.filter(o => o.status === 'shipped').length
    const awaitingPackages = ordersForStats.filter(o => o.status === 'awaiting_packages').length
    const deliveredPackages = ordersForStats.filter(o => o.status == 'delivered').length
  
    return [
      {
        label: t.value.totalOrders,
        value: totalOrders,
        icon: 'M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z',
        bgColor: 'bg-primary-50',
        iconColor: 'text-primary-600'
      },
      
      {
        label: t.value.awaitingPackages,
        value: awaitingPackages,
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        bgColor: 'bg-yellow-50',
        iconColor: 'text-yellow-600'
      },
      {
        label: t.value.inTransit,
        value: inTransit,
        icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
        bgColor: 'bg-indigo-50',
        iconColor: 'text-indigo-600'
      },
      {
        label: t.value.deliveredPackages,
        value: deliveredPackages,
        icon: 'M5 13l4 4L19 7',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600'
      }

    ]
  })
  
  // Methods
  const fetchOrders = async (page = 1) => {
    loading.value = true
    try {
      const response = await $customFetch('/admin/orders', {
        params: {
          page,
          status: statusFilter.value || undefined,
          search: searchQuery.value || undefined
        }
      })
      
      orders.value = response.data.data
      pagination.value = {
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        from: response.data.from,
        to: response.data.to,
        total: response.data.total
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      loading.value = false
    }
  }
  
  // Fetch all orders for stats (without filters)
  const fetchAllOrdersForStats = async () => {
    try {
      const response = await $customFetch('/admin/orders', {
        params: {
          page: 1,
          per_page: 1000 // Get all orders for accurate stats
        }
      })
      allOrders.value = response.data.data
    } catch (error) {
      console.error('Error fetching all orders:', error)
    }
  }
  
  const changePage = (page) => {
    if (page >= 1 && page <= pagination.value.lastPage) {
      fetchOrders(page)
    }
  }
  
  const clearFilters = () => {
    searchQuery.value = ''
    statusFilter.value = ''
    fetchOrders(1)
  }
  
  const getStatusColor = (status) => {
    const colors = {
      collecting: 'bg-gray-100 text-gray-700',
      awaiting_packages: 'bg-yellow-100 text-yellow-700',
      packages_complete: 'bg-primary-100 text-primary-700',
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
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  // Watch status filter
  watch(statusFilter, () => {
    fetchOrders(1)
  })
  
  // Watch search query with debounce
  watch(searchQuery, (newValue) => {
    clearTimeout(searchDebounce.value)
    searchDebounce.value = setTimeout(() => {
      fetchOrders(1)
    }, 300) // 300ms debounce
  })
  
  // Fetch orders on mount
  onMounted(() => {
    fetchOrders()
    fetchAllOrdersForStats()
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