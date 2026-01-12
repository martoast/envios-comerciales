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
          <!-- Mobile: Search + Filter Button -->
          <div class="sm:hidden">
            <div class="flex items-center gap-2 mb-3">
              <!-- Search Input -->
              <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="t.searchPlaceholder"
                  class="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
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

              <!-- Filter Button -->
              <button
                @click="showMobileFilters = true"
                :class="[
                  'relative flex items-center justify-center w-11 h-11 rounded-xl border transition-all',
                  activeFilterCount > 0
                    ? 'bg-primary-50 border-primary-300 text-primary-600'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <!-- Badge -->
                <span
                  v-if="activeFilterCount > 0"
                  class="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {{ activeFilterCount }}
                </span>
              </button>
            </div>

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
              <div class="flex items-center gap-2">
                <button
                  @click="printBulkLabels"
                  class="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-all duration-300"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                  </svg>
                  {{ t.printLabels }}
                </button>
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
            </div>
          </div>

          <!-- Desktop: Inline Search and Filters -->
          <div class="hidden sm:block space-y-3">
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
              <div class="flex items-center gap-2">
                <button
                  @click="printBulkLabels"
                  class="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-all duration-300"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                  </svg>
                  {{ t.printLabels }} ({{ selectedOrders.length }})
                </button>
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
                class="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                style="max-width: 500px;"
              >
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

            <!-- Filters Row -->
            <div class="flex items-center gap-3 flex-wrap">
              <!-- Status Filter -->
              <select
                v-model="statusFilter"
                class="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="">{{ t.allStatuses }}</option>
                <option v-for="status in orderStatuses" :key="status.value" :value="status.value">
                  {{ status.label }}
                </option>
              </select>

              <!-- Date Range Picker -->
              <div class="relative">
                <button
                  @click="showDatePicker = !showDatePicker"
                  :class="[
                    'px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all flex items-center gap-2',
                    (fromDate || toDate) ? 'border-primary-300 bg-primary-50' : 'border-gray-200'
                  ]"
                >
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span :class="(fromDate || toDate) ? 'text-primary-700 font-medium' : 'text-gray-600'">
                    {{ dateRangeLabel || t.selectDateRange }}
                  </span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- Date Picker Dropdown -->
                <Transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-1"
                >
                  <div
                    v-if="showDatePicker"
                    class="absolute left-0 mt-2 w-[380px] bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                  >
                    <!-- Quick Presets -->
                    <div class="p-3 border-b border-gray-100 bg-gray-50/50">
                      <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{{ t.dateRange }}</p>
                      <div class="grid grid-cols-2 gap-2">
                        <button
                          v-for="preset in datePresets"
                          :key="preset.value"
                          @click="applyDatePreset(preset.value)"
                          :class="[
                            'px-3 py-2 text-sm font-medium rounded-lg transition-all text-left',
                            datePreset === preset.value
                              ? 'bg-primary-100 text-primary-700 border border-primary-200'
                              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                          ]"
                        >
                          {{ preset.label }}
                        </button>
                      </div>
                    </div>

                    <!-- Custom Date Range -->
                    <div class="p-4">
                      <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{{ t.customRange }}</p>
                      <div class="grid grid-cols-2 gap-3">
                        <div>
                          <label class="block text-xs font-medium text-gray-600 mb-1.5">{{ t.from }}</label>
                          <input
                            v-model="fromDate"
                            type="date"
                            class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            @change="datePreset = ''"
                          />
                        </div>
                        <div>
                          <label class="block text-xs font-medium text-gray-600 mb-1.5">{{ t.toDate }}</label>
                          <input
                            v-model="toDate"
                            type="date"
                            class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            @change="datePreset = ''"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Actions -->
                    <div class="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
                      <button
                        v-if="fromDate || toDate"
                        @click="clearDateRange"
                        class="text-sm text-gray-600 hover:text-gray-800 font-medium"
                      >
                        {{ t.clearDates }}
                      </button>
                      <div class="flex items-center gap-2 ml-auto">
                        <button
                          @click="showDatePicker = false"
                          class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          {{ t.cancel }}
                        </button>
                        <button
                          @click="applyCustomDateRange"
                          class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                        >
                          {{ t.apply }}
                        </button>
                      </div>
                    </div>
                  </div>
                </Transition>

                <!-- Backdrop to close picker -->
                <div
                  v-if="showDatePicker"
                  class="fixed inset-0 z-40"
                  @click="showDatePicker = false"
                ></div>
              </div>

              <!-- Per Page Selector -->
              <select
                v-model="perPage"
                class="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option v-for="option in perPageOptions" :key="option" :value="option">
                  {{ option }} {{ t.perPageLabel }}
                </option>
              </select>

              <!-- Active Filters Count -->
              <div v-if="hasActiveFilters && !loading" class="flex items-center gap-2 text-sm text-gray-600 ml-auto">
                <span>{{ t.showingFiltered }}</span>
                <button
                  @click="clearFilters"
                  class="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {{ t.clearFilters }}
                </button>
              </div>
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
                    <!-- USE COMPOSABLE -->
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
                    <!-- USE COMPOSABLE -->
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

    <!-- Mobile Filter Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showMobileFilters" class="fixed inset-0 z-50 sm:hidden">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/50" @click="showMobileFilters = false"></div>

          <!-- Modal -->
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="translate-y-full"
            enter-to-class="translate-y-0"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="translate-y-0"
            leave-to-class="translate-y-full"
          >
            <div
              v-if="showMobileFilters"
              class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col"
            >
              <!-- Header -->
              <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 class="text-lg font-bold text-gray-900">{{ t.filters }}</h3>
                <button
                  @click="showMobileFilters = false"
                  class="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Filter Content -->
              <div class="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                <!-- Order Status -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t.status }}</label>
                  <select
                    v-model="statusFilter"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">{{ t.allStatuses }}</option>
                    <option v-for="status in orderStatuses" :key="status.value" :value="status.value">
                      {{ status.label }}
                    </option>
                  </select>
                </div>

                <!-- Per Page -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t.perPageLabel }}</label>
                  <select
                    v-model="perPage"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option v-for="option in perPageOptions" :key="option" :value="option">
                      {{ option }} {{ t.results }}
                    </option>
                  </select>
                </div>

                <!-- Date Range -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t.dateRange }}</label>

                  <!-- Quick Presets -->
                  <div class="grid grid-cols-2 gap-2 mb-4">
                    <button
                      v-for="preset in datePresets"
                      :key="preset.value"
                      @click="applyDatePresetMobile(preset.value)"
                      :class="[
                        'px-3 py-2.5 text-sm font-medium rounded-xl transition-all text-center',
                        datePreset === preset.value
                          ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                          : 'bg-gray-50 text-gray-700 border border-gray-200'
                      ]"
                    >
                      {{ preset.label }}
                    </button>
                  </div>

                  <!-- Custom Range -->
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{{ t.customRange }}</p>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-medium text-gray-600 mb-1.5">{{ t.from }}</label>
                      <input
                        v-model="fromDate"
                        type="date"
                        class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        @change="datePreset = ''"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-600 mb-1.5">{{ t.toDate }}</label>
                      <input
                        v-model="toDate"
                        type="date"
                        class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        @change="datePreset = ''"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer Actions -->
              <div class="px-5 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <button
                  v-if="hasActiveFilters"
                  @click="clearFilters(); showMobileFilters = false"
                  class="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {{ t.clearAll }}
                </button>
                <button
                  @click="applyMobileFilters"
                  class="flex-1 px-4 py-3 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors"
                >
                  {{ t.applyFilters }} {{ activeFilterCount > 0 ? `(${activeFilterCount})` : '' }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

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

// Use composable for status colors and labels
const { getStatusColor, getStatusLabel, getAllStatuses } = useOrderStatus()

// Define page meta to use app layout with admin middleware
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

// Nuxt imports
const { $customFetch } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const user = useUser().value
const { storeReturnUrl } = useListReturnUrl('orders')

// Use the language composable
const { t: createTranslations } = useLanguage()

// State
const orders = ref([])
const allOrders = ref([]) // Store all orders for stats calculation
const loading = ref(true)
const statusFilter = ref('')
const searchQuery = ref('')
const searchDebounce = ref(null)
const perPage = ref(25)
const fromDate = ref('')
const toDate = ref('')
const datePreset = ref('')
const showDatePicker = ref(false)
const showMobileFilters = ref(false)
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
  allOrders: { es: 'Órdenes', en: 'All Orders' },
  createOrder: { es: 'Crear Orden', en: 'Create Order' },
  createFirstOrder: { es: 'Crear Primera Orden', en: 'Create First Order' },
  allStatuses: { es: 'Todos los estados', en: 'All statuses' },
  searchPlaceholder: { es: 'Buscar por nombre, número, cliente o tracking...', en: 'Search by name, number, customer or tracking...' },
  loadingOrders: { es: 'Cargando órdenes...', en: 'Loading orders...' },
  noOrders: { es: 'No se encontraron órdenes', en: 'No orders found' },
  noOrdersFound: { es: 'No se encontraron órdenes con los filtros actuales.', en: 'No orders found with current filters.' },
  orderInfo: { es: 'Información de Orden', en: 'Order Info' },
  customer: { es: 'Cliente', en: 'Customer' },
  status: { es: 'Estado', en: 'Status' },
  items: { es: 'Artículos', en: 'Items' },
  created: { es: 'Creado', en: 'Created' },
  actions: { es: 'Acciones', en: 'Actions' },
  showing: { es: 'Mostrando', en: 'Showing' },
  to: { es: 'a', en: 'to' },
  of: { es: 'de', en: 'of' },
  results: { es: 'resultados', en: 'results' },
  previous: { es: 'Anterior', en: 'Previous' },
  next: { es: 'Siguiente', en: 'Next' },
  showingFiltered: { es: 'Mostrando resultados filtrados', en: 'Showing filtered results' },
  clearFilters: { es: 'Limpiar filtros', en: 'Clear filters' },
  selected: { es: 'seleccionado(s)', en: 'selected' },
  clearSelection: { es: 'Limpiar selección', en: 'Clear selection' },
  deleteSelected: { es: 'Eliminar seleccionadas', en: 'Delete selected' },
  deleting: { es: 'Eliminando...', en: 'Deleting...' },
  confirmDelete: { es: '¿Eliminar órdenes?', en: 'Delete orders?' },
  confirmDeleteMessage: { es: '¿Estás seguro de que quieres eliminar {count} orden(es)? Esta acción no se puede deshacer.', en: 'Are you sure you want to delete {count} order(s)? This action cannot be undone.' },
  yesDelete: { es: 'Sí, eliminar', en: 'Yes, delete' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  deleteSuccess: { es: 'Órdenes eliminadas exitosamente', en: 'Orders deleted successfully' },
  deleteError: { es: 'Error al eliminar órdenes', en: 'Error deleting orders' },
  manage: { es: 'Gestionar', en: 'Manage' },
  printLabels: { es: 'Imprimir Etiquetas', en: 'Print Labels' },
  // Date range
  dateRange: { es: 'Rango de Fechas', en: 'Date Range' },
  selectDateRange: { es: 'Seleccionar fechas', en: 'Select dates' },
  from: { es: 'Desde', en: 'From' },
  toDate: { es: 'Hasta', en: 'To' },
  apply: { es: 'Aplicar', en: 'Apply' },
  today: { es: 'Hoy', en: 'Today' },
  yesterday: { es: 'Ayer', en: 'Yesterday' },
  last7Days: { es: 'Últimos 7 días', en: 'Last 7 days' },
  last30Days: { es: 'Últimos 30 días', en: 'Last 30 days' },
  thisMonth: { es: 'Este mes', en: 'This month' },
  lastMonth: { es: 'Mes pasado', en: 'Last month' },
  thisYear: { es: 'Este año', en: 'This year' },
  customRange: { es: 'Personalizado', en: 'Custom' },
  clearDates: { es: 'Limpiar fechas', en: 'Clear dates' },
  // Mobile filters
  filters: { es: 'Filtros', en: 'Filters' },
  clearAll: { es: 'Limpiar todo', en: 'Clear all' },
  applyFilters: { es: 'Aplicar filtros', en: 'Apply filters' },
  // Per page
  perPageLabel: { es: 'Por página', en: 'Per page' }
}

// Get reactive translations
const t = createTranslations(translations)

// Order statuses from composable
const orderStatuses = computed(() => getAllStatuses())

// Per page options
const perPageOptions = [10, 25, 50, 100, 200]

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return searchQuery.value || statusFilter.value || fromDate.value || toDate.value
})

// Count active filters (excluding search)
const activeFilterCount = computed(() => {
  let count = 0
  if (statusFilter.value) count++
  if (fromDate.value || toDate.value) count++
  return count
})

// Date presets
const datePresets = computed(() => [
  { value: 'today', label: t.value.today },
  { value: 'yesterday', label: t.value.yesterday },
  { value: 'last7', label: t.value.last7Days },
  { value: 'last30', label: t.value.last30Days },
  { value: 'thisMonth', label: t.value.thisMonth },
  { value: 'lastMonth', label: t.value.lastMonth },
  { value: 'thisYear', label: t.value.thisYear },
])

// Format date for display
const formatDateDisplay = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('es-MX', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Get current date range label
const dateRangeLabel = computed(() => {
  if (datePreset.value) {
    const preset = datePresets.value.find(p => p.value === datePreset.value)
    return preset?.label || ''
  }
  if (fromDate.value && toDate.value) {
    return `${formatDateDisplay(fromDate.value)} - ${formatDateDisplay(toDate.value)}`
  }
  if (fromDate.value) {
    return `${t.value.from}: ${formatDateDisplay(fromDate.value)}`
  }
  if (toDate.value) {
    return `${t.value.toDate}: ${formatDateDisplay(toDate.value)}`
  }
  return ''
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
        per_page: perPage.value,
        status: statusFilter.value || undefined,
        search: searchQuery.value || undefined,
        from_date: fromDate.value || undefined,
        to_date: toDate.value || undefined
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

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.lastPage) {
    fetchOrders(page).then(() => updateQueryParams())
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  fromDate.value = ''
  toDate.value = ''
  datePreset.value = ''
  fetchOrders(1).then(() => updateQueryParams())
}

// Date helper functions
const formatDateForInput = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Apply date preset
const applyDatePreset = (preset) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let from, to

  switch (preset) {
    case 'today':
      from = to = formatDateForInput(today)
      break
    case 'yesterday':
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      from = to = formatDateForInput(yesterday)
      break
    case 'last7':
      const last7 = new Date(today)
      last7.setDate(last7.getDate() - 6)
      from = formatDateForInput(last7)
      to = formatDateForInput(today)
      break
    case 'last30':
      const last30 = new Date(today)
      last30.setDate(last30.getDate() - 29)
      from = formatDateForInput(last30)
      to = formatDateForInput(today)
      break
    case 'thisMonth':
      const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      from = formatDateForInput(firstOfMonth)
      to = formatDateForInput(today)
      break
    case 'lastMonth':
      const firstOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const lastOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      from = formatDateForInput(firstOfLastMonth)
      to = formatDateForInput(lastOfLastMonth)
      break
    case 'thisYear':
      const firstOfYear = new Date(today.getFullYear(), 0, 1)
      from = formatDateForInput(firstOfYear)
      to = formatDateForInput(today)
      break
    default:
      return
  }

  datePreset.value = preset
  fromDate.value = from
  toDate.value = to
  showDatePicker.value = false
  fetchOrders(1).then(() => updateQueryParams())
}

const applyCustomDateRange = () => {
  datePreset.value = ''
  showDatePicker.value = false
  fetchOrders(1).then(() => updateQueryParams())
}

const clearDateRange = () => {
  fromDate.value = ''
  toDate.value = ''
  datePreset.value = ''
  showDatePicker.value = false
  fetchOrders(1).then(() => updateQueryParams())
}

// Mobile filter functions
const applyDatePresetMobile = (preset) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let from, to

  switch (preset) {
    case 'today':
      from = to = formatDateForInput(today)
      break
    case 'yesterday':
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      from = to = formatDateForInput(yesterday)
      break
    case 'last7':
      const last7 = new Date(today)
      last7.setDate(last7.getDate() - 6)
      from = formatDateForInput(last7)
      to = formatDateForInput(today)
      break
    case 'last30':
      const last30 = new Date(today)
      last30.setDate(last30.getDate() - 29)
      from = formatDateForInput(last30)
      to = formatDateForInput(today)
      break
    case 'thisMonth':
      const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      from = formatDateForInput(firstOfMonth)
      to = formatDateForInput(today)
      break
    case 'lastMonth':
      const firstOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const lastOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      from = formatDateForInput(firstOfLastMonth)
      to = formatDateForInput(lastOfLastMonth)
      break
    case 'thisYear':
      const firstOfYear = new Date(today.getFullYear(), 0, 1)
      from = formatDateForInput(firstOfYear)
      to = formatDateForInput(today)
      break
    default:
      return
  }

  datePreset.value = preset
  fromDate.value = from
  toDate.value = to
}

const applyMobileFilters = () => {
  showMobileFilters.value = false
  fetchOrders(1).then(() => updateQueryParams())
}

const navigateTo = (path) => {
  router.push(path)
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

// Generate Code128 barcode as SVG (same as AdminOrderShippingLabel)
const generateBarcode = (text) => {
  const code128B = {
    ' ': '11011001100', '!': '11001101100', '"': '11001100110', '#': '10010011000',
    '$': '10010001100', '%': '10001001100', '&': '10011001000', "'": '10011000100',
    '(': '10001100100', ')': '11001001000', '*': '11001000100', '+': '11000100100',
    ',': '10110011100', '-': '10011011100', '.': '10011001110', '/': '10111001100',
    '0': '10011101100', '1': '10011100110', '2': '11001110010', '3': '11001011100',
    '4': '11001001110', '5': '11011100100', '6': '11001110100', '7': '11101101110',
    '8': '11101001100', '9': '11100101100', ':': '11100100110', ';': '11101100100',
    '<': '11100110100', '=': '11100110010', '>': '11011011000', '?': '11011000110',
    '@': '11000110110', 'A': '10100011000', 'B': '10001011000', 'C': '10001000110',
    'D': '10110001000', 'E': '10001101000', 'F': '10001100010', 'G': '11010001000',
    'H': '11000101000', 'I': '11000100010', 'J': '10110111000', 'K': '10110001110',
    'L': '10001101110', 'M': '10111011000', 'N': '10111000110', 'O': '10001110110',
    'P': '11101110110', 'Q': '11010001110', 'R': '11000101110', 'S': '11011101000',
    'T': '11011100010', 'U': '11011101110', 'V': '11101011000', 'W': '11101000110',
    'X': '11100010110', 'Y': '11101101000', 'Z': '11101100010', '[': '11100011010',
    '\\': '11101111010', ']': '11001000010', '^': '11110001010', '_': '10100110000',
    '`': '10100001100', 'a': '10010110000', 'b': '10010000110', 'c': '10000101100',
    'd': '10000100110', 'e': '10110010000', 'f': '10110000100', 'g': '10011010000',
    'h': '10011000010', 'i': '10000110100', 'j': '10000110010', 'k': '11000010010',
    'l': '11001010000', 'm': '11110111010', 'n': '11000010100', 'o': '10001111010',
    'p': '10100111100', 'q': '10010111100', 'r': '10010011110', 's': '10111100100',
    't': '10011110100', 'u': '10011110010', 'v': '11110100100', 'w': '11110010100',
    'x': '11110010010', 'y': '11011011110', 'z': '11011110110', '{': '11110110110',
    '|': '10101111000', '}': '10100011110', '~': '10001011110'
  }

  const startB = '11010010000'
  const stop = '1100011101011'

  let checksum = 104
  let encoded = startB

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const pattern = code128B[char]
    if (pattern) {
      encoded += pattern
      const value = char.charCodeAt(0) - 32
      checksum += value * (i + 1)
    }
  }

  checksum = checksum % 103
  const checksumChar = String.fromCharCode(checksum + 32)
  if (code128B[checksumChar]) {
    encoded += code128B[checksumChar]
  }

  encoded += stop

  const barWidth = 2
  const height = 50
  let x = 0
  let bars = ''

  for (let i = 0; i < encoded.length; i++) {
    if (encoded[i] === '1') {
      bars += `<rect x="${x}" y="0" width="${barWidth}" height="${height}" fill="black"/>`
    }
    x += barWidth
  }

  return `<svg width="${x}" height="${height}" xmlns="http://www.w3.org/2000/svg">${bars}</svg>`
}

// Get full address for an order
const getFullAddress = (order) => {
  const addr = order?.delivery_address
  if (!addr) return ''
  if (addr.full_address) return addr.full_address

  const parts = []
  if (addr.street) {
    let line = addr.street
    if (addr.exterior_number) line += ` #${addr.exterior_number}`
    if (addr.interior_number) line += `, Int. ${addr.interior_number}`
    parts.push(line)
  }
  if (addr.colonia) parts.push(addr.colonia)
  if (addr.municipio) parts.push(addr.municipio)
  if (addr.estado) parts.push(addr.estado)
  if (addr.postal_code) parts.push(`C.P. ${addr.postal_code}`)
  return parts.join(', ')
}

// Format box details for an order
const formatBoxDetails = (order) => {
  if (!order?.boxes || order.boxes.length === 0) return ''
  return order.boxes.map(box => {
    const name = box.box_name || box.box_size
    const dims = (box.length || box.width || box.height)
      ? `${box.length || '-'} × ${box.width || '-'} × ${box.height || '-'} cm`
      : ''
    const weight = box.weight ? `${box.weight} kg` : ''
    const hasSpecs = dims || weight
    const specsHtml = hasSpecs
      ? `<div class="box-specs">${dims ? `<span class="box-dims">${dims}</span>` : ''}${weight ? `<span class="box-weight">${weight}</span>` : ''}</div>`
      : ''
    return `<div class="box-item"><div class="box-name">${name}</div>${specsHtml}</div>`
  }).join('')
}

// Print bulk order labels
const printBulkLabels = () => {
  if (selectedOrders.value.length === 0) return

  const selectedOrderData = orders.value.filter(o => selectedOrders.value.includes(o.id))

  const printWindow = window.open('', '_blank', 'width=450,height=650')

  const labelsHtml = selectedOrderData.map(order => {
    const barcodeSvg = generateBarcode(order.order_number)
    const fullAddress = getFullAddress(order)
    const hasBoxes = order.boxes && order.boxes.length > 0
    const boxesHtml = hasBoxes ? `
      <div class="boxes-section">
        <div class="boxes-label">Boxes:</div>
        <div class="boxes-list">${formatBoxDetails(order)}</div>
      </div>
    ` : ''

    return `
      <div class="shipping-label">
        <div class="label-header">
          <img src="/box.svg" alt="Boxly" class="logo" />
          <div class="order-info">
            <span class="order-number">Order #${order.order_number}</span>
          </div>
        </div>

        <div class="ship-to-section">
          <div class="section-title">SHIP TO:</div>
          <div class="recipient-name">${order.user?.name || ''}</div>
          <div class="address-text">${fullAddress}</div>
        </div>

        <div class="contact-section">
          ${order.user?.phone ? `<div class="contact-item"><span class="contact-label">Tel:</span><span>${order.user.phone}</span></div>` : ''}
          ${order.user?.email ? `<div class="contact-item"><span class="contact-label">Email:</span><span class="email-text">${order.user.email}</span></div>` : ''}
        </div>

        ${boxesHtml}

        <div class="barcode-section">
          <div class="barcode">${barcodeSvg}</div>
          <div class="barcode-text">${order.order_number}</div>
        </div>
      </div>
    `
  }).join('')

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Shipping Labels</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, Helvetica, sans-serif; }

        .shipping-label {
          width: 4in;
          height: 6in;
          padding: 0.25in;
          border: 2px solid #000;
          background: white;
          display: flex;
          flex-direction: column;
          page-break-after: always;
          margin-bottom: 0.25in;
        }

        .shipping-label:last-child {
          page-break-after: auto;
        }

        .label-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.12in;
          border-bottom: 2px solid #000;
          margin-bottom: 0.15in;
        }

        .logo { height: 0.5in; width: auto; }
        .order-number { font-size: 14px; font-weight: bold; }

        .ship-to-section { flex: 1; margin-bottom: 0.1in; }
        .section-title { font-size: 12px; font-weight: bold; color: #666; margin-bottom: 4px; }
        .recipient-name { font-size: 28px; font-weight: 600; margin-bottom: 8px; letter-spacing: 0.5px; }
        .address-text { font-size: 18px; line-height: 1.5; letter-spacing: 0.3px; }

        .contact-section {
          padding: 0.1in 0;
          border-top: 1px solid #ccc;
        }
        .contact-item { font-size: 12px; margin-bottom: 3px; }
        .contact-label { font-weight: bold; margin-right: 4px; }
        .email-text { word-break: break-all; }

        .boxes-section {
          padding: 0.1in 0;
          border-top: 1px solid #ccc;
          font-size: 15px;
        }
        .boxes-label { font-weight: 600; margin-bottom: 6px; font-size: 14px; letter-spacing: 0.3px; }
        .box-item { margin-bottom: 8px; }
        .box-name { font-weight: 600; font-size: 15px; letter-spacing: 0.3px; margin-bottom: 2px; }
        .box-specs { display: flex; flex-direction: column; gap: 2px; }
        .box-dims, .box-weight { color: #222; font-weight: 500; font-size: 14px; letter-spacing: 0.3px; }

        .barcode-section {
          margin-top: auto;
          padding-top: 0.15in;
          border-top: 1px solid #ccc;
          text-align: center;
        }
        .barcode { display: flex; justify-content: center; margin-bottom: 4px; }
        .barcode svg { max-width: 100%; height: 45px; }
        .barcode-text { font-size: 14px; font-weight: bold; font-family: monospace; letter-spacing: 2px; }

        @media print {
          @page { size: 4in 6in; margin: 0; }
          body { margin: 0; }
          .shipping-label { border: 2px solid #000; margin: 0; }
        }
      </style>
    </head>
    <body>
      ${labelsHtml}
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 250);
        }
      <\/script>
    </body>
    </html>
  `

  printWindow.document.write(html)
  printWindow.document.close()
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
      const toast = useToast()
      toast.success(t.value.deleteSuccess)
      selectedOrders.value = []
      showDeleteModal.value = false
      await fetchOrders(pagination.value.currentPage)
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
  clearSelection()
  updateQueryParams()
})

// Watch perPage
watch(perPage, () => {
  fetchOrders(1)
  clearSelection()
  updateQueryParams()
})

// Watch search query with debounce
watch(searchQuery, () => {
  clearTimeout(searchDebounce.value)
  searchDebounce.value = setTimeout(() => {
    fetchOrders(1)
    clearSelection()
    updateQueryParams()
  }, 300)
})

// Sync filters to URL query params
const updateQueryParams = () => {
  const query = {}
  if (statusFilter.value) query.status = statusFilter.value
  if (searchQuery.value) query.search = searchQuery.value
  if (fromDate.value) query.from_date = fromDate.value
  if (toDate.value) query.to_date = toDate.value
  if (perPage.value !== 25) query.per_page = perPage.value
  if (pagination.value.currentPage > 1) query.page = pagination.value.currentPage

  router.replace({ query })
}

// Initialize filters from URL query params
const initFiltersFromQuery = () => {
  const q = route.query
  if (q.status) statusFilter.value = q.status
  if (q.search) searchQuery.value = q.search
  if (q.from_date) fromDate.value = q.from_date
  if (q.to_date) toDate.value = q.to_date
  if (q.per_page) perPage.value = parseInt(q.per_page) || 25
}

// Store URL for back navigation whenever route changes
watch(() => route.fullPath, (newPath) => {
  storeReturnUrl(newPath)
}, { immediate: true })

// Fetch orders on mount
onMounted(() => {
  initFiltersFromQuery()
  const initialPage = parseInt(route.query.page) || 1
  fetchOrders(initialPage)
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
</style>