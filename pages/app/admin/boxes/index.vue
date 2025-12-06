<!-- pages/app/admin/boxes/index.vue -->
<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Admin Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <!-- Mobile Layout -->
        <div class="lg:hidden space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-indigo-100 rounded-xl">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h1 class="text-xl sm:text-2xl font-extrabold text-gray-900">{{ t.allBoxes }}</h1>
            </div>
          </div>
        </div>
        <!-- Desktop Layout -->
        <div class="hidden lg:flex lg:items-center lg:justify-between">
          <div class="flex items-center gap-4 animate-fadeIn">
            
            <div>
              <h1 class="text-3xl font-extrabold text-gray-900">{{ t.allBoxes }}</h1>
              <p class="text-sm text-gray-500 mt-0.5">{{ t.boxesSubtitle }}</p>
            </div>
          </div>

          <!-- Stats Summary -->
          <div v-if="!loading && pagination.total > 0" class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-2xl font-bold text-gray-900">{{ pagination.total }}</p>
              <p class="text-xs text-gray-500">{{ t.totalBoxes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

      <!-- Boxes Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn" style="animation-delay: 0.3s">
        <!-- Search and Filters Section -->
        <div class="px-4 sm:px-6 py-4 bg-gray-50/50 border-b border-gray-100">
          <!-- Mobile: Search + Filter Button -->
          <div class="sm:hidden">
            <div class="flex items-center gap-2">
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
                  :placeholder="t.searchPlaceholderShort"
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
          </div>

          <!-- Desktop: Inline Search and Filters -->
          <div class="hidden sm:block space-y-3">
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
              <!-- Box Size Filter -->
              <select
                v-model="boxSizeFilter"
                class="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="">{{ t.allSizes }}</option>
                <option v-for="size in boxSizes" :key="size.value" :value="size.value">
                  {{ size.label }}
                </option>
              </select>

              <!-- Order Status Filter -->
              <select
                v-model="orderStatusFilter"
                class="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="">{{ t.allOrderStatuses }}</option>
                <option v-for="status in orderStatuses" :key="status.value" :value="status.value">
                  {{ status.label }}
                </option>
              </select>

              <!-- Has GIA Filter -->
              <select
                v-model="hasGiaFilter"
                class="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="">{{ t.allGiaStatus }}</option>
                <option value="true">{{ t.withGia }}</option>
                <option value="false">{{ t.withoutGia }}</option>
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

                <!-- Date Picker Dropdown (Desktop) -->
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
                    class="absolute right-0 mt-2 w-[380px] bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden"
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
                    <!-- Box Size -->
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t.boxSize }}</label>
                      <select
                        v-model="boxSizeFilter"
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="">{{ t.allSizes }}</option>
                        <option v-for="size in boxSizes" :key="size.value" :value="size.value">
                          {{ size.label }}
                        </option>
                      </select>
                    </div>

                    <!-- Order Status -->
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t.orderStatus }}</label>
                      <select
                        v-model="orderStatusFilter"
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="">{{ t.allOrderStatuses }}</option>
                        <option v-for="status in orderStatuses" :key="status.value" :value="status.value">
                          {{ status.label }}
                        </option>
                      </select>
                    </div>

                    <!-- GIA Status -->
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t.giaStatus }}</label>
                      <select
                        v-model="hasGiaFilter"
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="">{{ t.allGiaStatus }}</option>
                        <option value="true">{{ t.withGia }}</option>
                        <option value="false">{{ t.withoutGia }}</option>
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

        <!-- Loading State -->
        <div v-if="loading" class="px-6 py-16 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-4">
            <svg class="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p class="text-gray-500">{{ t.loadingBoxes }}</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="!loading && boxes.length === 0" class="px-6 py-16 text-center">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ t.noBoxes }}</h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">{{ t.noBoxesFound }}</p>
          <button
            @click="clearFilters"
            class="inline-flex items-center px-4 py-2 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            {{ t.resetFilters }}
          </button>
        </div>

        <!-- Boxes List - Mobile Cards / Desktop Table -->
        <div v-else>
          <!-- Mobile Cards -->
          <div class="sm:hidden divide-y divide-gray-100">
            <div
              v-for="box in boxes"
              :key="box.id"
              class="p-4 hover:bg-gray-50 transition-colors"
            >
              <NuxtLink
                :to="`/app/admin/orders/${box.order?.id}`"
                class="block"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-lg flex items-center justify-center"
                      :class="getStatusColor(box.order?.status)"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">{{ box.box_name }}</p>
                      <p class="text-xs text-gray-500">{{ formatBoxSizeLabel(box.box_size) }}</p>
                    </div>
                  </div>
                  <p class="text-lg font-bold text-gray-900">${{ parseFloat(box.box_price).toFixed(2) }}</p>
                </div>

                <!-- Order Info -->
                <div class="flex items-center justify-between text-sm mb-2">
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">{{ t.order }}:</span>
                    <span class="font-medium text-gray-900">{{ box.order?.order_number }}</span>
                  </div>
                  <span :class="[
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                    getStatusColor(box.order?.status)
                  ]">
                    {{ getStatusLabel(box.order?.status) }}
                  </span>
                </div>

                <!-- Customer & Guia -->
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">{{ box.order?.user?.name }}</span>
                  <div class="flex items-center gap-2">
                    <span v-if="box.guia_number" class="font-mono text-xs text-primary-600">{{ box.guia_number }}</span>
                    <span v-if="box.gia_full_url" class="w-2 h-2 bg-green-500 rounded-full" :title="t.hasGia"></span>
                  </div>
                </div>

                <!-- Tracking Status -->
                <div v-if="box.guia_number" class="mt-2 pt-2 border-t border-gray-100">
                  <div class="flex items-center justify-between gap-2">
                    <!-- Tracking Info Available -->
                    <div v-if="getBoxTrackingInfo(box.guia_number)" class="flex items-center gap-2">
                      <span
                        :class="[
                          'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-lg border',
                          getTrackingStatusColor(getBoxTrackingInfo(box.guia_number).status.tag)
                        ]"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getTrackingStatusIcon(getBoxTrackingInfo(box.guia_number).status.tag)" />
                        </svg>
                        {{ getTrackingStatusLabel(getBoxTrackingInfo(box.guia_number).status.tag) }}
                      </span>
                    </div>
                    <!-- No tracking yet - show click to track -->
                    <span v-else-if="!isTrackingLoading(box.guia_number)" class="text-xs text-gray-400">
                      {{ t.clickToTrack }}
                    </span>
                    <!-- Loading -->
                    <div v-else class="flex items-center gap-1 text-gray-400">
                      <svg class="animate-spin w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <!-- Refresh Button -->
                    <button
                      @click.prevent.stop="refreshTracking(box.guia_number)"
                      :disabled="isTrackingLoading(box.guia_number)"
                      class="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50"
                      :title="t.refreshTracking"
                    >
                      <svg :class="['w-4 h-4', isTrackingLoading(box.guia_number) ? 'animate-spin' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Desktop Table -->
          <div class="hidden sm:block overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.box }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.order }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.customer }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.guiaNumber }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.trackingStatus }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.gia }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ t.price }}
                  </th>
                  <th class="relative px-6 py-3">
                    <span class="sr-only">{{ t.actions }}</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="box in boxes"
                  :key="box.id"
                  class="hover:bg-gray-50 transition-colors cursor-pointer"
                  @click="navigateTo(`/app/admin/orders/${box.order?.id}`)"
                >
                  <!-- Box Info -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        :class="getStatusColor(box.order?.status)"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">{{ box.box_name }}</p>
                        <p class="text-xs text-gray-500">{{ formatBoxSizeLabel(box.box_size) }}</p>
                      </div>
                    </div>
                  </td>

                  <!-- Order -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ box.order?.order_number }}</p>
                      <span :class="[
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1',
                        getStatusColor(box.order?.status)
                      ]">
                        {{ getStatusLabel(box.order?.status) }}
                      </span>
                    </div>
                  </td>

                  <!-- Customer -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ box.order?.user?.name }}</p>
                      <p class="text-xs text-gray-500">{{ box.order?.user?.email }}</p>
                    </div>
                  </td>

                  <!-- Guia Number -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div v-if="box.guia_number" class="flex items-center gap-2">
                      <NuxtLink
                        :to="`/track?tracking_number=${box.guia_number}`"
                        target="_blank"
                        @click.stop
                        class="font-mono text-sm text-primary-600 hover:text-primary-800 hover:underline"
                      >
                        {{ box.guia_number }}
                      </NuxtLink>
                      <button
                        @click.stop="copyToClipboard(box.guia_number)"
                        class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        :title="t.copyGuia"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <span v-else class="text-xs text-gray-400 italic">{{ t.notAssigned }}</span>
                  </td>

                  <!-- Tracking Status -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div v-if="box.guia_number" class="flex items-center gap-2">
                      <!-- Loading -->
                      <div v-if="isTrackingLoading(box.guia_number)" class="flex items-center gap-2 text-gray-400">
                        <svg class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                      <!-- Tracking Available -->
                      <div v-else-if="getBoxTrackingInfo(box.guia_number)">
                        <span
                          :class="[
                            'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border',
                            getTrackingStatusColor(getBoxTrackingInfo(box.guia_number).status.tag)
                          ]"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getTrackingStatusIcon(getBoxTrackingInfo(box.guia_number).status.tag)" />
                          </svg>
                          {{ getTrackingStatusLabel(getBoxTrackingInfo(box.guia_number).status.tag) }}
                        </span>
                        <p v-if="getBoxTrackingInfo(box.guia_number).destination?.location" class="text-xs text-gray-500 mt-1">
                          📍 {{ getBoxTrackingInfo(box.guia_number).destination.location }}
                        </p>
                      </div>
                      <!-- No Tracking Info Yet -->
                      <span v-else class="text-xs text-gray-400 italic">{{ t.clickToTrack }}</span>
                      <!-- Refresh Button -->
                      <button
                        @click.stop="refreshTracking(box.guia_number)"
                        :disabled="isTrackingLoading(box.guia_number)"
                        class="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50"
                        :title="t.refreshTracking"
                      >
                        <svg :class="['w-4 h-4', isTrackingLoading(box.guia_number) ? 'animate-spin' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                    <!-- No Guia -->
                    <span v-else class="text-xs text-gray-400">-</span>
                  </td>

                  <!-- GIA -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <NuxtLink
                      v-if="box.gia_full_url"
                      :to="box.gia_full_url"
                      target="_blank"
                      external
                      @click.stop
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                    >
                      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
                      </svg>
                      GIA
                    </NuxtLink>
                    <span v-else class="text-xs text-gray-400">-</span>
                  </td>

                  <!-- Price -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-sm font-bold text-gray-900">${{ parseFloat(box.box_price).toFixed(2) }}</p>
                  </td>

                  <!-- Actions -->
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <NuxtLink
                      :to="`/app/admin/orders/${box.order?.id}`"
                      class="text-primary-600 hover:text-primary-900"
                      @click.stop
                    >
                      {{ t.viewOrder }}
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
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'

// Use composable for status colors and labels
const { getStatusColor, getStatusLabel, getAllStatuses } = useOrderStatus()

// Define page meta to use app layout with admin middleware
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

// Nuxt imports
const { $customFetch, $toast } = useNuxtApp()
const router = useRouter()

// Use the language composable
const { t: createTranslations } = useLanguage()

// State
const boxes = ref([])
const loading = ref(true)
const searchQuery = ref('')
const boxSizeFilter = ref('')
const orderStatusFilter = ref('')
const hasGiaFilter = ref('')
const fromDate = ref('')
const toDate = ref('')
const datePreset = ref('')
const showDatePicker = ref(false)
const showMobileFilters = ref(false)
const searchDebounce = ref(null)
const pagination = ref({
  currentPage: 1,
  lastPage: 1,
  from: 0,
  to: 0,
  total: 0
})

// Tracking state - per guia number loading state
const trackingData = ref({})
const trackingLoadingMap = ref({})

// Define translations
const translations = {
  allBoxes: { es: 'Cajas', en: 'All Boxes' },
  boxesSubtitle: { es: 'Gestiona todas las cajas de envío', en: 'Manage all shipping boxes' },
  totalBoxes: { es: 'cajas totales', en: 'total boxes' },
  searchPlaceholder: { es: 'Buscar por cliente, orden, guía o nombre de caja...', en: 'Search by customer, order, guia or box name...' },
  allSizes: { es: 'Todos los tamaños', en: 'All sizes' },
  allOrderStatuses: { es: 'Todos los estados', en: 'All order statuses' },
  allGiaStatus: { es: 'GIA: Todos', en: 'GIA: All' },
  withGia: { es: 'Con GIA', en: 'With GIA' },
  withoutGia: { es: 'Sin GIA', en: 'Without GIA' },
  loadingBoxes: { es: 'Cargando cajas...', en: 'Loading boxes...' },
  noBoxes: { es: 'No se encontraron cajas', en: 'No boxes found' },
  noBoxesFound: { es: 'No se encontraron cajas con los filtros actuales.', en: 'No boxes found with current filters.' },
  resetFilters: { es: 'Restablecer filtros', en: 'Reset filters' },
  box: { es: 'Caja', en: 'Box' },
  order: { es: 'Orden', en: 'Order' },
  customer: { es: 'Cliente', en: 'Customer' },
  guiaNumber: { es: 'Guía', en: 'Guia' },
  trackingStatus: { es: 'Estado Envío', en: 'Tracking Status' },
  gia: { es: 'GIA', en: 'GIA' },
  price: { es: 'Precio', en: 'Price' },
  actions: { es: 'Acciones', en: 'Actions' },
  viewOrder: { es: 'Ver Orden', en: 'View Order' },
  showing: { es: 'Mostrando', en: 'Showing' },
  to: { es: 'a', en: 'to' },
  of: { es: 'de', en: 'of' },
  results: { es: 'resultados', en: 'results' },
  previous: { es: 'Anterior', en: 'Previous' },
  next: { es: 'Siguiente', en: 'Next' },
  showingFiltered: { es: 'Mostrando resultados filtrados', en: 'Showing filtered results' },
  clearFilters: { es: 'Limpiar filtros', en: 'Clear filters' },
  copyGuia: { es: 'Copiar guía', en: 'Copy guia' },
  copiedToClipboard: { es: '¡Copiado!', en: 'Copied!' },
  notAssigned: { es: 'No asignado', en: 'Not assigned' },
  hasGia: { es: 'Tiene GIA', en: 'Has GIA' },
  // Tracking status translations
  statusPending: { es: 'Pendiente', en: 'Pending' },
  statusInfoReceived: { es: 'Info Recibida', en: 'Info Received' },
  statusInTransit: { es: 'En Tránsito', en: 'In Transit' },
  statusOutForDelivery: { es: 'En Reparto', en: 'Out for Delivery' },
  statusDelivered: { es: 'Entregado', en: 'Delivered' },
  statusAttemptFail: { es: 'Intento Fallido', en: 'Attempt Failed' },
  statusException: { es: 'Excepción', en: 'Exception' },
  statusExpired: { es: 'Expirado', en: 'Expired' },
  statusUnknown: { es: 'Desconocido', en: 'Unknown' },
  noTrackingInfo: { es: 'Sin info', en: 'No info' },
  refreshTracking: { es: 'Actualizar', en: 'Refresh' },
  clickToTrack: { es: 'Click para rastrear', en: 'Click to track' },
  // Date range
  dateRange: { es: 'Rango de Fechas', en: 'Date Range' },
  selectDateRange: { es: 'Seleccionar fechas', en: 'Select dates' },
  from: { es: 'Desde', en: 'From' },
  toDate: { es: 'Hasta', en: 'To' },
  apply: { es: 'Aplicar', en: 'Apply' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
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
  boxSize: { es: 'Tamaño de Caja', en: 'Box Size' },
  orderStatus: { es: 'Estado de Orden', en: 'Order Status' },
  giaStatus: { es: 'Estado GIA', en: 'GIA Status' },
  clearAll: { es: 'Limpiar todo', en: 'Clear all' },
  applyFilters: { es: 'Aplicar filtros', en: 'Apply filters' },
  searchPlaceholderShort: { es: 'Buscar...', en: 'Search...' },
}

// Get reactive translations
const t = createTranslations(translations)

// Box sizes for filter
const boxSizes = [
  { value: 'extra-small', label: 'XS - Extra Small' },
  { value: 'small', label: 'S - Small' },
  { value: 'medium', label: 'M - Medium' },
  { value: 'large', label: 'L - Large' },
  { value: 'extra-large', label: 'XL - Extra Large' },
]

// Order statuses from composable
const orderStatuses = computed(() => getAllStatuses())

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return searchQuery.value || boxSizeFilter.value || orderStatusFilter.value || hasGiaFilter.value || fromDate.value || toDate.value
})

// Count active filters (excluding search)
const activeFilterCount = computed(() => {
  let count = 0
  if (boxSizeFilter.value) count++
  if (orderStatusFilter.value) count++
  if (hasGiaFilter.value) count++
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
  fetchBoxes(1)
}

const formatDateForInput = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const applyCustomDateRange = () => {
  datePreset.value = ''
  showDatePicker.value = false
  fetchBoxes(1)
}

const clearDateRange = () => {
  fromDate.value = ''
  toDate.value = ''
  datePreset.value = ''
  showDatePicker.value = false
  fetchBoxes(1)
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
  // Don't fetch here - will fetch when apply button is clicked
}

const applyMobileFilters = () => {
  showMobileFilters.value = false
  fetchBoxes(1)
}

// Methods
const fetchBoxes = async (page = 1) => {
  loading.value = true
  try {
    const response = await $customFetch('/admin/boxes', {
      params: {
        page,
        search: searchQuery.value || undefined,
        box_size: boxSizeFilter.value || undefined,
        order_status: orderStatusFilter.value || undefined,
        has_gia: hasGiaFilter.value || undefined,
        from_date: fromDate.value || undefined,
        to_date: toDate.value || undefined,
        per_page: 5
      }
    })

    boxes.value = response.data
    pagination.value = {
      currentPage: response.meta.current_page,
      lastPage: response.meta.last_page,
      from: ((response.meta.current_page - 1) * response.meta.per_page) + 1,
      to: Math.min(response.meta.current_page * response.meta.per_page, response.meta.total),
      total: response.meta.total
    }
    // Clear tracking data when boxes change (user must click to refresh)
    trackingData.value = {}
    trackingLoadingMap.value = {}
  } catch (error) {
    console.error('Error fetching boxes:', error)
  } finally {
    loading.value = false
  }
}

// Refresh tracking for a single guia number
const refreshTracking = async (guiaNumber) => {
  if (!guiaNumber) return

  trackingLoadingMap.value[guiaNumber] = true

  try {
    const response = await $customFetch('/shipment-tracking/track', {
      method: 'POST',
      body: {
        tracking_number: guiaNumber,
        carrier: 'estafeta',
        refresh: true
      }
    })

    if (response.success && response.data) {
      trackingData.value[guiaNumber] = response.data
    }
  } catch (error) {
    console.error('Error fetching tracking data:', error)
  } finally {
    trackingLoadingMap.value[guiaNumber] = false
  }
}

// Check if a specific guia is loading
const isTrackingLoading = (guiaNumber) => {
  return trackingLoadingMap.value[guiaNumber] === true
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.lastPage) {
    fetchBoxes(page)
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  boxSizeFilter.value = ''
  orderStatusFilter.value = ''
  hasGiaFilter.value = ''
  fromDate.value = ''
  toDate.value = ''
  datePreset.value = ''
  fetchBoxes(1)
}

const navigateTo = (path) => {
  router.push(path)
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    $toast.success(t.value.copiedToClipboard)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Box size helpers
const formatBoxSizeLabel = (size) => {
  const labels = {
    'extra-small': 'XS - Extra Small',
    'small': 'S - Small',
    'medium': 'M - Medium',
    'large': 'L - Large',
    'extra-large': 'XL - Extra Large',
  }
  return labels[size] || size
}

// Tracking helper functions
const getTrackingStatusLabel = (status) => {
  const statusMap = {
    'Pending': t.value.statusPending,
    'InfoReceived': t.value.statusInfoReceived,
    'InTransit': t.value.statusInTransit,
    'OutForDelivery': t.value.statusOutForDelivery,
    'AttemptFail': t.value.statusAttemptFail,
    'Delivered': t.value.statusDelivered,
    'AvailableForPickup': t.value.statusDelivered,
    'Exception': t.value.statusException,
    'Expired': t.value.statusExpired
  }
  return statusMap[status] || t.value.statusUnknown
}

const getTrackingStatusColor = (status) => {
  const colors = {
    'Pending': 'bg-gray-100 text-gray-700 border-gray-200',
    'InfoReceived': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'InTransit': 'bg-blue-50 text-blue-700 border-blue-200',
    'OutForDelivery': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'AttemptFail': 'bg-orange-50 text-orange-700 border-orange-200',
    'Delivered': 'bg-green-50 text-green-700 border-green-200',
    'AvailableForPickup': 'bg-cyan-50 text-cyan-700 border-cyan-200',
    'Exception': 'bg-red-50 text-red-700 border-red-200',
    'Expired': 'bg-gray-100 text-gray-500 border-gray-200'
  }
  return colors[status] || 'bg-gray-100 text-gray-600 border-gray-200'
}

const getTrackingStatusIcon = (status) => {
  const icons = {
    'Pending': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    'InfoReceived': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    'InTransit': 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
    'OutForDelivery': 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
    'AttemptFail': 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    'Delivered': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    'AvailableForPickup': 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    'Exception': 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    'Expired': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  }
  return icons[status] || icons['Pending']
}

const getBoxTrackingInfo = (guiaNumber) => {
  if (!guiaNumber || !trackingData.value[guiaNumber]) return null
  return trackingData.value[guiaNumber]
}

// Watch filters
watch([boxSizeFilter, orderStatusFilter, hasGiaFilter], () => {
  fetchBoxes(1)
})

// Watch search query with debounce
watch(searchQuery, () => {
  clearTimeout(searchDebounce.value)
  searchDebounce.value = setTimeout(() => {
    fetchBoxes(1)
  }, 300)
})

// Fetch boxes on mount
onMounted(() => {
  fetchBoxes()
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