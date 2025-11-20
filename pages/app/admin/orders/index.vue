<!-- pages/app/admin/orders/index.vue -->
<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Admin Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <!-- Mobile Layout -->
        <div class="lg:hidden space-y-4">
          <div class="flex items-center justify-between">
            <h1 class="text-xl sm:text-2xl font-extrabold text-gray-900">{{ t.allOrders }}</h1>
            <div class="flex items-center gap-2">
              <NuxtLink 
                to="/app/admin/orders/create"
                class="p-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-sm"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
    <!-- Desktop Layout -->
    <div class="hidden lg:flex lg:items-center lg:justify-between">
      <div class="flex items-center gap-8 animate-fadeIn">
        <h1 class="text-3xl font-extrabold text-gray-900">{{ t.allOrders }}</h1>
      </div>

      <div class="flex items-center gap-3">
        <NuxtLink 
          to="/app/admin/orders/create"
          class="inline-flex items-center px-4 py-2.5 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          {{ t.createOrder }}
        </NuxtLink>
      </div>
    </div>
  </div>
</div>

<!-- Main Content -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

  <!-- Orders Section -->
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn" style="animation-delay: 0.3s">
    <!-- Search and Filters Section -->
    <div class="px-4 sm:px-6 py-4 bg-gray-50/50 border-b border-gray-100">
      <div class="space-y-3">
        <!-- Bulk Actions Bar (only show when items selected) -->
        <div v-if="selectedOrders.length > 0" class="flex items-center justify-between p-3 bg-primary-50 border border-primary-200 rounded-xl">
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-primary-900">
              {{ selectedOrders.length }} {{ t.selected }}
            </span>
            <button
              @click="clearSelection"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {{ t.clearSelection }}
            </button>
          </div>
          <button
            @click="confirmBulkDelete"
            :disabled="deletingBulk"
            class="inline-flex items-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <svg v-if="!deletingBulk" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            <svg v-else class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ deletingBulk ? t.deleting : t.deleteSelected }}
          </button>
        </div>

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
      <NuxtLink 
        to="/app/admin/orders/create"
        class="inline-flex items-center px-4 py-2 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        {{ t.createFirstOrder }}
      </NuxtLink>
    </div>

    <!-- Orders List - Mobile Cards / Desktop Table -->
    <div v-else>
      <!-- Mobile Cards -->
      <div class="sm:hidden divide-y divide-gray-100">
        <div
          v-for="order in orders" 
          :key="order.id"
          class="p-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start gap-3">
            <!-- Checkbox -->
            <input
              type="checkbox"
              :checked="isSelected(order.id)"
              @change="toggleSelection(order.id)"
              class="mt-1 h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
            >
            
            <!-- Order Info (clickable) -->
            <NuxtLink
              :to="`/app/admin/orders/${order.id}`"
              class="flex-1"
            >
              <div class="flex items-start justify-between mb-3">
                <div>
                  <p class="font-semibold text-gray-900">{{ order.tracking_number }}</p>
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
        </div>
      </div>

      <!-- Desktop Table -->
      <div class="hidden sm:block overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  :checked="allSelected"
                  @change="toggleSelectAll"
                  class="h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                >
              </th>
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
              class="hover:bg-gray-50 transition-colors"
              :class="{ 'bg-primary-50/30': isSelected(order.id) }"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :checked="isSelected(order.id)"
                  @change="toggleSelection(order.id)"
                  @click.stop
                  class="h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap cursor-pointer" @click="navigateTo(`/app/admin/orders/${order.id}`)">
                <div>
                  <p class="text-sm font-semibold text-gray-900">{{ order.tracking_number }}</p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap cursor-pointer" @click="navigateTo(`/app/admin/orders/${order.id}`)">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ order.user?.name }}</p>
                  <p class="text-sm text-gray-500">{{ order.user?.email }}</p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap cursor-pointer" @click="navigateTo(`/app/admin/orders/${order.id}`)">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  getStatusColor(order.status)
                ]">
                  {{ getStatusLabel(order.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap cursor-pointer" @click="navigateTo(`/app/admin/orders/${order.id}`)">
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
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer" @click="navigateTo(`/app/admin/orders/${order.id}`)">
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

  <!-- Floating Action Button (Mobile Only) -->
  <div class="fixed bottom-6 right-6 sm:hidden">
    <NuxtLink 
      to="/app/admin/orders/create"
      class="flex items-center justify-center w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 hover:shadow-xl transition-all duration-300"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
    </NuxtLink>
  </div>
</div>

<!-- Confirmation Modal -->
<Teleport to="body">
  <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="showDeleteModal = false"></div>

      <!-- Modal panel -->
      <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="px-6 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ t.confirmDelete }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ t.confirmDeleteMessage.replace('{count}', selectedOrders.length) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
          <button
            @click="bulkDelete"
            :disabled="deletingBulk"
            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ deletingBulk ? t.deleting : t.yesDelete }}
          </button>
          <button
            @click="showDeleteModal = false"
            :disabled="deletingBulk"
            class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ t.cancel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</Teleport>
  </section>
</template>
<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'

// Define page meta to use app layout with admin middleware
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

// Nuxt imports
const { $customFetch } = useNuxtApp()
const router = useRouter()
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

// Bulk delete state
const selectedOrders = ref([])
const showDeleteModal = ref(false)
const deletingBulk = ref(false)

// Define translations
const translations = {
  allOrders: {
    es: 'Órdenes',
    en: 'All Orders'
  },
  createOrder: {
    es: 'Crear Orden',
    en: 'Create Order'
  },
  createFirstOrder: {
    es: 'Crear Primera Orden',
    en: 'Create First Order'
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
  // Bulk delete translations
  selected: {
    es: 'seleccionado(s)',
    en: 'selected'
  },
  clearSelection: {
    es: 'Limpiar selección',
    en: 'Clear selection'
  },
  deleteSelected: {
    es: 'Eliminar seleccionadas',
    en: 'Delete selected'
  },
  deleting: {
    es: 'Eliminando...',
    en: 'Deleting...'
  },
  confirmDelete: {
    es: '¿Eliminar órdenes?',
    en: 'Delete orders?'
  },
  confirmDeleteMessage: {
    es: '¿Estás seguro de que quieres eliminar {count} orden(es)? Esta acción no se puede deshacer.',
    en: 'Are you sure you want to delete {count} order(s)? This action cannot be undone.'
  },
  yesDelete: {
    es: 'Sí, eliminar',
    en: 'Yes, delete'
  },
  cancel: {
    es: 'Cancelar',
    en: 'Cancel'
  },
  deleteSuccess: {
    es: 'Órdenes eliminadas exitosamente',
    en: 'Orders deleted successfully'
  },
  deleteError: {
    es: 'Error al eliminar órdenes',
    en: 'Error deleting orders'
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
    es: "Cotización Enviada",
    en: "Quote Sent",
  },
  paid: {
    es: "Pagado",
    en: "Paid",
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

// Bulk selection computed
const allSelected = computed(() => {
  return orders.value.length > 0 && selectedOrders.value.length === orders.value.length
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
        per_page: 10
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

const navigateTo = (path) => {
  router.push(path)
}

const getStatusColor = (status) => {
  const colors = {
    collecting: "bg-primary-100 text-primary-700",
    awaiting_packages: "bg-amber-100 text-amber-700",
    packages_complete: "bg-primary-100 text-primary-700",
    processing: "bg-primary-100 text-primary-700",
    quote_sent: "bg-orange-100 text-orange-700",
    paid: "bg-green-100 text-green-700",
    shipped: "bg-primary-100 text-primary-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

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

// Bulk selection methods
const isSelected = (orderId) => {
  return selectedOrders.value.includes(orderId)
}

const toggleSelection = (orderId) => {
  const index = selectedOrders.value.indexOf(orderId)
  if (index > -1) {
    selectedOrders.value.splice(index, 1)
  } else {
    selectedOrders.value.push(orderId)
  }
}

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedOrders.value = []
  } else {
    selectedOrders.value = orders.value.map(o => o.id)
  }
}

const clearSelection = () => {
  selectedOrders.value = []
}

const confirmBulkDelete = () => {
  if (selectedOrders.value.length > 0) {
    showDeleteModal.value = true
  }
}

const bulkDelete = async () => {
  if (selectedOrders.value.length === 0) return
  
  deletingBulk.value = true
  try {
    const response = await $customFetch('/admin/orders/bulk', {
      method: 'DELETE',
      body: {
        order_ids: selectedOrders.value
      }
    })
    
    if (response.success) {
      // Show success message
      const toast = useToast()
      toast.success(t.value.deleteSuccess)
      
      // Clear selection
      selectedOrders.value = []
      showDeleteModal.value = false
      
      // Refresh orders list
      await fetchOrders(pagination.value.currentPage)
      await fetchAllOrdersForStats()
    }
  } catch (error) {
    console.error('Error deleting orders:', error)
    const toast = useToast()
    toast.error(t.value.deleteError)
  } finally {
    deletingBulk.value = false
  }
}

// Watch status filter
watch(statusFilter, () => {
  fetchOrders(1)
  clearSelection() // Clear selection when filters change
})

// Watch search query with debounce
watch(searchQuery, (newValue) => {
  clearTimeout(searchDebounce.value)
  searchDebounce.value = setTimeout(() => {
    fetchOrders(1)
    clearSelection() // Clear selection when search changes
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