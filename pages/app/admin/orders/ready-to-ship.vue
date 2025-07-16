<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.readyToQuote }}</h1>
              <p class="text-sm text-gray-600 mt-1">{{ t.subtitle }}</p>
            </div>
            <button 
              @click="refreshData"
              :disabled="loading"
              class="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
            >
              <svg :class="['w-5 h-5', loading && 'animate-spin']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              {{ t.refresh }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
  
        <!-- Filters Section -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 animate-fadeIn" style="animation-delay: 0.4s">
          <div class="space-y-4">
            <!-- Search and Sort Row -->
            <div class="flex flex-col sm:flex-row gap-4">
              <!-- Search Input -->
              <div class="flex-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="t.searchPlaceholder"
                  class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  style="max-width: 500px;"
                >
              </div>
  
            </div>
  
            <!-- Active Filters -->
            <div v-if="hasActiveFilters" class="flex items-center justify-between">
              <span class="text-sm text-gray-600">{{ t.showingFiltered }}</span>
              <button 
                @click="clearFilters"
                class="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {{ t.clearFilters }}
              </button>
            </div>
          </div>
        </div>
  
        <!-- Orders List -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn" style="animation-delay: 0.5s">
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
          <div v-else-if="filteredOrders.length === 0" class="px-6 py-16 text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ t.noOrdersReady }}</h3>
            <p class="text-gray-500">{{ t.checkBackLater }}</p>
          </div>
  
          <!-- Orders Table (Desktop) -->
          <div v-else class="hidden lg:block overflow-x-auto">
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
                    {{ t.packageDetails }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.estimatedCost }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.waitingTime }}
                  </th>
                  <th class="relative px-6 py-3">
                    <span class="sr-only">{{ t.actions }}</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr 
                  v-for="order in paginatedOrders" 
                  :key="order.id"
                  class="hover:bg-gray-50 transition-colors"
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
                      <span v-if="order.is_rural" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                        {{ t.rural }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p class="text-sm text-gray-900">
                        <span class="font-medium">{{ order.items?.length || 0 }}</span> {{ t.items }}
                      </p>
                      <p v-if="order.total_weight" class="text-sm text-gray-500">
                        {{ order.total_weight }} kg
                      </p>
                      <p v-else class="text-sm text-orange-600">
                        {{ t.weightPending }}
                      </p>
                      <span v-if="order.recommended_box_size" :class="[
                        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1',
                        getBoxSizeColor(order.recommended_box_size)
                      ]">
                        {{ t.box }} {{ order.recommended_box_size.toUpperCase() }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div v-if="order.total_weight">
                      <p class="text-sm font-medium text-gray-900">
                        {{ formatCurrency(calculateEstimatedTotal(order)) }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ t.shipping }}: {{ formatCurrency(calculateShippingCost(order)) }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ t.iva }}: {{ formatCurrency(calculateIVA(order)) }}
                      </p>
                    </div>
                    <p v-else class="text-sm text-gray-500">{{ t.pendingWeight }}</p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <span :class="[
                        'text-sm font-medium',
                        getDaysWaitingColor(getDaysWaiting(order.completed_at))
                      ]">
                        {{ getDaysWaiting(order.completed_at) }} {{ t.days }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end gap-2">
                      <button
                        @click="openQuoteModal(order)"
                        :disabled="!order.total_weight"
                        class="inline-flex items-center px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        {{ t.sendQuote }}
                      </button>
                      <NuxtLink
                        :to="`/app/admin/orders/${order.id}`"
                        class="text-gray-600 hover:text-gray-900"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </NuxtLink>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Orders Cards (Mobile) -->
          <div class="lg:hidden divide-y divide-gray-100">
            <div
              v-for="order in paginatedOrders"
              :key="order.id"
              class="p-4 hover:bg-gray-50 transition-colors"
            >
              <!-- Order Header -->
              <div class="flex items-start justify-between mb-3">
                <div>
                  <p class="font-semibold text-gray-900">{{ order.order_number }}</p>
                </div>
                <span :class="[
                  'text-xs font-medium px-2 py-1 rounded-full',
                  getDaysWaitingColor(getDaysWaiting(order.completed_at))
                ]">
                  {{ getDaysWaiting(order.completed_at) }} {{ t.days }}
                </span>
              </div>
  
              <!-- Customer Info -->
              <div class="mb-3">
                <p class="text-sm font-medium text-gray-900">{{ order.user?.name }}</p>
                <p class="text-xs text-gray-500">{{ order.user?.email }}</p>
                <span v-if="order.is_rural" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                  {{ t.rural }}
                </span>
              </div>
  
              <!-- Package Info -->
              <div class="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <p class="text-gray-500">{{ t.items }}</p>
                  <p class="font-medium text-gray-900">{{ order.items?.length || 0 }}</p>
                </div>
                <div>
                  <p class="text-gray-500">{{ t.weight }}</p>
                  <p v-if="order.total_weight" class="font-medium text-gray-900">
                    {{ order.total_weight }} kg
                  </p>
                  <p v-else class="text-orange-600">{{ t.pending }}</p>
                </div>
              </div>
  
              <!-- Estimated Cost -->
              <div v-if="order.total_weight" class="mb-4 p-3 bg-gray-50 rounded-lg">
                <p class="text-sm font-medium text-gray-900 mb-1">
                  {{ t.estimatedTotal }}: {{ formatCurrency(calculateEstimatedTotal(order)) }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ t.shipping }}: {{ formatCurrency(calculateShippingCost(order)) }} | {{ t.iva }}: {{ formatCurrency(calculateIVA(order)) }}
                </p>
              </div>
  
              <!-- Actions -->
              <div class="flex gap-2">
                <button
                  @click="openQuoteModal(order)"
                  :disabled="!order.total_weight"
                  class="flex-1 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {{ t.sendQuote }}
                </button>
                <NuxtLink
                  :to="`/app/admin/orders/${order.id}`"
                  class="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {{ t.viewDetails }}
                </NuxtLink>
              </div>
            </div>
          </div>
  
          <!-- Pagination -->
          <div v-if="totalPages > 1" class="px-4 sm:px-6 py-4 border-t border-gray-100">
            <div class="flex items-center justify-between">
              <p class="text-sm text-gray-700 hidden sm:block">
                {{ t.showing }} <span class="font-medium">{{ startItem }}</span> {{ t.to }} 
                <span class="font-medium">{{ endItem }}</span> {{ t.of }} 
                <span class="font-medium">{{ filteredOrders.length }}</span> {{ t.results }}
              </p>
              <p class="text-sm text-gray-700 sm:hidden">
                {{ startItem }}-{{ endItem }} {{ t.of }} {{ filteredOrders.length }}
              </p>
              <div class="flex gap-2">
                <button 
                  @click="currentPage--"
                  :disabled="currentPage === 1"
                  class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {{ t.previous }}
                </button>
                <button 
                  @click="currentPage++"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {{ t.next }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Send Quote Modal -->
      <TransitionRoot as="template" :show="showQuoteModal">
        <Dialog as="div" class="relative z-50" @close="closeQuoteModal">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
          </TransitionChild>
  
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <div>
                    <!-- Modal Header -->
                    <div class="flex items-center justify-between mb-5">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-900">{{ t.sendQuoteTo }} {{ selectedOrder?.user?.name }}</h3>
                        <p class="text-sm text-gray-500">{{ selectedOrder?.order_number }}</p>
                      </div>
                      <button @click="closeQuoteModal" class="text-gray-400 hover:text-gray-500">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
  
                    <!-- Weight & Box Size -->
                    <div class="space-y-4 mb-6">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.totalWeight }}</label>
                        <div class="flex items-center gap-2">
                          <input
                            v-model.number="quoteForm.weight"
                            type="number"
                            step="0.01"
                            min="0.1"
                            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                          <span class="text-gray-500">kg</span>
                        </div>
                      </div>
  
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.boxSize }}</label>
                        <select
                          v-model="quoteForm.boxSize"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="small">{{ t.small }} (30x30x30 cm)</option>
                          <option value="medium">{{ t.medium }} (40x40x40 cm)</option>
                          <option value="large">{{ t.large }} (50x50x50 cm)</option>
                          <option value="xl">{{ t.extraLarge }} (60x60x60 cm)</option>
                        </select>
                      </div>
                    </div>
  
                    <!-- Cost Breakdown -->
                    <div class="bg-gray-50 rounded-lg p-4 mb-6">
                      <h4 class="font-medium text-gray-900 mb-3">{{ t.costBreakdown }}</h4>
                      <div class="space-y-2">
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600">{{ t.shippingCost }}</span>
                          <span class="font-medium">{{ formatCurrency(calculateModalShipping()) }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600">{{ t.iva }} (16%)</span>
                          <span class="font-medium">{{ formatCurrency(calculateModalIVA()) }}</span>
                        </div>
                        <div class="flex justify-between text-sm pt-2 border-t">
                          <span class="font-medium text-gray-900">{{ t.total }}</span>
                          <span class="font-bold text-lg text-primary-600">{{ formatCurrency(calculateModalTotal()) }}</span>
                        </div>
                      </div>
                    </div>
  
                    <!-- Custom Message -->
                    <div class="mb-6">
                      <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.customMessage }}</label>
                      <textarea
                        v-model="quoteForm.message"
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        :placeholder="t.messagePlaceholder"
                      ></textarea>
                    </div>
                  </div>
  
                  <!-- Modal Footer -->
                  <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      @click="sendQuote"
                      :disabled="sendingQuote || !quoteForm.weight || !quoteForm.boxSize"
                      class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <svg v-if="sendingQuote" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ sendingQuote ? t.sending : t.sendQuoteButton }}
                    </button>
                    <button
                      type="button"
                      @click="closeQuoteModal"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    >
                      {{ t.cancel }}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
  
  // Define page meta
  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin']
  })
  
  // Nuxt imports
  const { $customFetch, $toast } = useNuxtApp()
  
  // Use the language composable
  const { t: createTranslations } = useLanguage()
  
  // State
  const orders = ref([])
  const loading = ref(true)
  const searchQuery = ref('')
  const sortBy = ref('oldest')
  const currentPage = ref(1)
  const itemsPerPage = 10
  const showQuoteModal = ref(false)
  const selectedOrder = ref(null)
  const sendingQuote = ref(false)
  
  // Quote form
  const quoteForm = ref({
    weight: 0,
    boxSize: 'medium',
    message: ''
  })
  
  // Translations
  const translations = {
    readyToQuote: {
      es: 'Órdenes Listas para Cotizar',
      en: 'Orders Ready to Quote'
    },
    subtitle: {
      es: 'Órdenes con todos los paquetes recibidos, listas para cotización de consolidación',
      en: 'Orders with all packages received, ready for consolidation quote'
    },
    refresh: {
      es: 'Actualizar',
      en: 'Refresh'
    },
    searchPlaceholder: {
      es: 'Buscar por número de orden, cliente o email...',
      en: 'Search by order number, customer or email...'
    },
    oldestFirst: {
      es: 'Más antiguos primero',
      en: 'Oldest first'
    },
    mostItems: {
      es: 'Más artículos',
      en: 'Most items'
    },
    heaviest: {
      es: 'Más pesados',
      en: 'Heaviest'
    },
    showingFiltered: {
      es: 'Mostrando resultados filtrados',
      en: 'Showing filtered results'
    },
    clearFilters: {
      es: 'Limpiar filtros',
      en: 'Clear filters'
    },
    loadingOrders: {
      es: 'Cargando órdenes...',
      en: 'Loading orders...'
    },
    noOrdersReady: {
      es: 'No hay órdenes listas para cotizar',
      en: 'No orders ready to quote'
    },
    checkBackLater: {
      es: 'Revisa más tarde cuando lleguen todos los paquetes de las órdenes.',
      en: 'Check back later when all packages have arrived for orders.'
    },
    orderInfo: {
      es: 'Información de Orden',
      en: 'Order Info'
    },
    customer: {
      es: 'Cliente',
      en: 'Customer'
    },
    packageDetails: {
      es: 'Detalles de Paquetes',
      en: 'Package Details'
    },
    estimatedCost: {
      es: 'Costo Estimado',
      en: 'Estimated Cost'
    },
    waitingTime: {
      es: 'Tiempo de Espera',
      en: 'Waiting Time'
    },
    actions: {
      es: 'Acciones',
      en: 'Actions'
    },
    rural: {
      es: 'Rural',
      en: 'Rural'
    },
    items: {
      es: 'artículos',
      en: 'items'
    },
    weight: {
      es: 'Peso',
      en: 'Weight'
    },
    weightPending: {
      es: 'Peso pendiente',
      en: 'Weight pending'
    },
    pendingWeight: {
      es: 'Pendiente de pesar',
      en: 'Pending weight'
    },
    pending: {
      es: 'Pendiente',
      en: 'Pending'
    },
    box: {
      es: 'Caja',
      en: 'Box'
    },
    shipping: {
      es: 'Envío',
      en: 'Shipping'
    },
    iva: {
      es: 'IVA',
      en: 'VAT'
    },
    days: {
      es: 'días',
      en: 'days'
    },
    sendQuote: {
      es: 'Enviar Cotización',
      en: 'Send Quote'
    },
    viewDetails: {
      es: 'Ver Detalles',
      en: 'View Details'
    },
    estimatedTotal: {
      es: 'Total Estimado',
      en: 'Estimated Total'
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
    // Modal translations
    sendQuoteTo: {
      es: 'Enviar Cotización a',
      en: 'Send Quote to'
    },
    totalWeight: {
      es: 'Peso Total',
      en: 'Total Weight'
    },
    boxSize: {
      es: 'Tamaño de Caja',
      en: 'Box Size'
    },
    small: {
      es: 'Pequeña',
      en: 'Small'
    },
    medium: {
      es: 'Mediana',
      en: 'Medium'
    },
    large: {
      es: 'Grande',
      en: 'Large'
    },
    extraLarge: {
      es: 'Extra Grande',
      en: 'Extra Large'
    },
    costBreakdown: {
      es: 'Desglose de Costos',
      en: 'Cost Breakdown'
    },
    shippingCost: {
      es: 'Costo de Envío',
      en: 'Shipping Cost'
    },
    total: {
      es: 'Total',
      en: 'Total'
    },
    customMessage: {
      es: 'Mensaje Personalizado (Opcional)',
      en: 'Custom Message (Optional)'
    },
    messagePlaceholder: {
      es: 'Agrega una nota para el cliente sobre su cotización...',
      en: 'Add a note to the customer about their quote...'
    },
    sendQuoteButton: {
      es: 'Enviar Cotización',
      en: 'Send Quote'
    },
    sending: {
      es: 'Enviando...',
      en: 'Sending...'
    },
    cancel: {
      es: 'Cancelar',
      en: 'Cancel'
    },
    quoteSentSuccess: {
      es: 'Cotización enviada exitosamente',
      en: 'Quote sent successfully'
    },
    errorSendingQuote: {
      es: 'Error al enviar la cotización',
      en: 'Error sending quote'
    },
    // Stats
    totalReady: {
      es: 'Total Listas',
      en: 'Total Ready'
    },
    totalPackages: {
      es: 'Total Paquetes',
      en: 'Total Packages'
    },
    estimatedRevenue: {
      es: 'Ingresos Estimados',
      en: 'Estimated Revenue'
    },
    avgWaitTime: {
      es: 'Tiempo Promedio',
      en: 'Avg Wait Time'
    }
  }
  
  // Get reactive translations
  const t = createTranslations(translations)
  
  // Computed stats
  const stats = computed(() => [
    {
      label: t.value.totalReady,
      value: orders.value.length,
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      label: t.value.totalPackages,
      value: orders.value.reduce((sum, order) => sum + (order.items?.length || 0), 0),
      icon: 'M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      label: t.value.estimatedRevenue,
      value: formatCurrency(orders.value.reduce((sum, order) => sum + calculateEstimatedTotal(order), 0)),
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600'
    },
    {
      label: t.value.avgWaitTime,
      value: `${getAverageWaitTime()} ${t.value.days}`,
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    }
  ])
  
  // Filtered and sorted orders
  const filteredOrders = computed(() => {
    let filtered = [...orders.value]
  
    // Apply search filter
    if (searchQuery.value) {
      const search = searchQuery.value.toLowerCase()
      filtered = filtered.filter(order => 
        order.order_number.toLowerCase().includes(search) ||
        order.user?.name.toLowerCase().includes(search) ||
        order.user?.email.toLowerCase().includes(search)
      )
    }
  
    // Apply sorting
    switch (sortBy.value) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.completed_at) - new Date(b.completed_at))
        break
      case 'items':
        filtered.sort((a, b) => (b.items?.length || 0) - (a.items?.length || 0))
        break
      case 'weight':
        filtered.sort((a, b) => (b.total_weight || 0) - (a.total_weight || 0))
        break
    }
  
    return filtered
  })
  
  // Paginated orders
  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredOrders.value.slice(start, end)
  })
  
  // Pagination computed values
  const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage))
  const startItem = computed(() => (currentPage.value - 1) * itemsPerPage + 1)
  const endItem = computed(() => Math.min(currentPage.value * itemsPerPage, filteredOrders.value.length))
  
  // Has active filters
  const hasActiveFilters = computed(() => searchQuery.value || sortBy.value !== 'oldest')
  
  // Methods
  const fetchOrders = async () => {
    loading.value = true
    try {
      const response = await $customFetch('/admin/orders/ready-to-quote')
      orders.value = response.data.data
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      loading.value = false
    }
  }
  
  const refreshData = () => {
    fetchOrders()
  }
  
  const clearFilters = () => {
    searchQuery.value = ''
    sortBy.value = 'oldest'
    currentPage.value = 1
  }
  
  const openQuoteModal = (order) => {
    selectedOrder.value = order
    quoteForm.value = {
      weight: order.total_weight || 0,
      boxSize: order.recommended_box_size || 'medium',
      message: ''
    }
    showQuoteModal.value = true
  }
  
  const closeQuoteModal = () => {
    showQuoteModal.value = false
    selectedOrder.value = null
  }
  
  const sendQuote = async () => {
    if (!selectedOrder.value) return
  
    sendingQuote.value = true
    try {
      await $customFetch(`/admin/orders/${selectedOrder.value.id}/send-quote`, {
        method: 'POST',
        body: {
          weight: quoteForm.value.weight,
          box_size: quoteForm.value.boxSize,
          message: quoteForm.value.message
        }
      })
  
      $toast.success(t.value.quoteSentSuccess)
      closeQuoteModal()
      fetchOrders() // Refresh the list
    } catch (error) {
      console.error('Error sending quote:', error)
      $toast.error(error.data?.message || t.value.errorSendingQuote)
    } finally {
      sendingQuote.value = false
    }
  }
  
  // Calculation methods
  const calculateShippingCost = (order) => {
    if (!order.total_weight) return 0
    // Base rate: $20 MXN per kg
    const baseRate = 20
    const weight = order.total_weight
    let cost = weight * baseRate
  
    // Rural surcharge
    if (order.is_rural) {
      cost *= 1.15 // 15% surcharge
    }
  
    return cost
  }
  
  const calculateIVA = (order) => {
    if (!order.items) return 0
    const declaredValue = order.items.reduce((sum, item) => {
      return sum + (item.declared_value * item.quantity)
    }, 0)
    // Convert USD to MXN (assuming 1 USD = 17 MXN)
    const valueInMXN = declaredValue * 17
    return valueInMXN * 0.16 // 16% IVA
  }
  
  const calculateEstimatedTotal = (order) => {
    return calculateShippingCost(order) + calculateIVA(order)
  }
  
  // Modal calculations
  const calculateModalShipping = () => {
    if (!quoteForm.value.weight) return 0
    const baseRate = 20
    let cost = quoteForm.value.weight * baseRate
    
    if (selectedOrder.value?.is_rural) {
      cost *= 1.15
    }
    
    return cost
  }
  
  const calculateModalIVA = () => {
    if (!selectedOrder.value?.items) return 0
    const declaredValue = selectedOrder.value.items.reduce((sum, item) => {
      return sum + (item.declared_value * item.quantity)
    }, 0)
    const valueInMXN = declaredValue * 17
    return valueInMXN * 0.16
  }
  
  const calculateModalTotal = () => {
    return calculateModalShipping() + calculateModalIVA()
  }
  
  // Helper methods
  const getDaysWaiting = (completedAt) => {
    if (!completedAt) return 0
    const completed = new Date(completedAt)
    const now = new Date()
    const diffTime = Math.abs(now - completed)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  
  const getDaysWaitingColor = (days) => {
    if (days <= 2) return 'text-green-600'
    if (days <= 3) return 'text-yellow-600'
    return 'text-red-600'
  }
  
  const getBoxSizeColor = (size) => {
    const colors = {
      small: 'bg-blue-100 text-blue-800',
      medium: 'bg-green-100 text-green-800',
      large: 'bg-yellow-100 text-yellow-800',
      xl: 'bg-red-100 text-red-800'
    }
    return colors[size] || 'bg-gray-100 text-gray-800'
  }
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0)
  }
  
  const getAverageWaitTime = () => {
    if (orders.value.length === 0) return 0
    const totalDays = orders.value.reduce((sum, order) => {
      return sum + getDaysWaiting(order.completed_at)
    }, 0)
    return Math.round(totalDays / orders.value.length)
  }
  
  // Watch for page changes
  watch(currentPage, () => {
    window.scrollTo(0, 0)
  })
  
  // Fetch orders on mount
  onMounted(() => {
    fetchOrders()
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