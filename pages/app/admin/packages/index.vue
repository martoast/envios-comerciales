<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Admin Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <!-- Mobile Layout -->
          <div class="lg:hidden space-y-4">
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-extrabold text-gray-900">{{ t.packages }}</h1>
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
              <h1 class="text-3xl font-extrabold text-gray-900">{{ t.packages }}</h1>
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
  
        <!-- Packages Section -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn" style="animation-delay: 0.3s">
          <!-- Search and Filters Section -->
          <div class="px-4 sm:px-6 py-4 bg-gray-50/50 border-b border-gray-100">
            <div class="space-y-3">
              <!-- Search and Status Filter Row -->
              <div class="flex flex-col sm:flex-row gap-3">
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
  
                <!-- Status Filter Dropdown -->
                <select
                  v-model="statusFilter"
                  class="px-4 py-3 sm:py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="">{{ t.allStatuses }}</option>
                  <option value="pending">{{ t.pending }}</option>
                  <option value="arrived">{{ t.arrived }}</option>
                  <option value="missing_weight">{{ t.missingWeight }}</option>
                </select>
              </div>
              
              <!-- Active Filters Display -->
              <div v-if="(searchQuery || statusFilter) && !loading" class="flex items-center justify-between text-sm">
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
            <p class="text-gray-500">{{ t.loadingPackages }}</p>
          </div>
  
          <!-- Empty State -->
          <div v-else-if="!loading && packages.length === 0" class="px-6 py-16 text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ t.noPackages }}</h3>
            <p class="text-gray-500 mb-6 max-w-md mx-auto">{{ t.noPackagesFound }}</p>
          </div>
  
          <!-- Packages List -->
          <div v-else>
            <!-- Desktop Table -->
            <div class="hidden sm:block overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.product }}</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.value }}</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.order }}</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.customer }}</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.status }}</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.weight }}</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.date }}</th>
                    <th class="relative px-6 py-3"><span class="sr-only">{{ t.actions }}</span></th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr 
                    v-for="pkg in packages" 
                    :key="pkg.id"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-6 py-4">
                      <div>
                        <p class="text-sm text-gray-900 line-clamp-1">{{ pkg.product_name || t.noName }}</p>
                        <a 
                          v-if="pkg.product_url" 
                          :href="pkg.product_url" 
                          target="_blank"
                          class="text-xs text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                        >
                          {{ t.viewProduct }}
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                        </a>
                        <p class="text-xs text-gray-500">{{ t.qty }}: {{ pkg.quantity }}</p>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${{ pkg.declared_value }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div>
                        <NuxtLink 
                          :to="`/app/admin/orders/${pkg.order.id}`"
                          class="text-sm font-medium text-primary-600 hover:text-primary-700"
                        >
                          {{ pkg.order.order_number }}
                        </NuxtLink>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <NuxtLink 
                        :to="`/app/admin/customers/${pkg.order.user.id}`"
                        class="text-sm text-gray-900 hover:text-primary-600"
                      >
                        {{ pkg.order.user.name }}
                      </NuxtLink>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getPackageStatusColor(pkg)
                      ]">
                        {{ getPackageStatusLabel(pkg) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ pkg.weight ? `${pkg.weight} kg` : '-' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(pkg.arrived_at || pkg.created_at) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        v-if="!pkg.arrived"
                        @click="openMarkArrivedModal(pkg)"
                        class="text-primary-600 hover:text-primary-900"
                      >
                        {{ t.markArrived }}
                      </button>
                      <button 
                        v-else-if="!pkg.weight"
                        @click="openAddWeightModal(pkg)"
                        class="text-orange-600 hover:text-orange-900"
                      >
                        {{ t.addWeight }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <!-- Mobile Cards -->
            <div class="sm:hidden divide-y divide-gray-100">
              <div v-for="pkg in packages" :key="pkg.id" class="p-4">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">{{ pkg.product_name || t.noName }}</p>
                    <a 
                      v-if="pkg.product_url" 
                      :href="pkg.product_url" 
                      target="_blank"
                      class="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 mt-1"
                    >
                      {{ t.viewProduct }}
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  </div>
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getPackageStatusColor(pkg)
                  ]">
                    {{ getPackageStatusLabel(pkg) }}
                  </span>
                </div>
                
                <div class="space-y-2 text-sm">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-500">{{ t.value }}:</span>
                    <span class="font-medium text-gray-900">${{ pkg.declared_value }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-500">{{ t.order }}:</span>
                    <NuxtLink 
                      :to="`/app/admin/orders/${pkg.order.id}`"
                      class="font-medium text-primary-600"
                    >
                      {{ pkg.order.order_number }}
                    </NuxtLink>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-500">{{ t.customer }}:</span>
                    <NuxtLink 
                      :to="`/app/admin/customers/${pkg.order.user.id}`"
                      class="font-medium text-gray-900"
                    >
                      {{ pkg.order.user.name }}
                    </NuxtLink>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-500">{{ t.weight }}:</span>
                    <span class="font-medium text-gray-900">{{ pkg.weight ? `${pkg.weight} kg` : '-' }}</span>
                  </div>
                </div>
  
                <div class="mt-3">
                  <button 
                    v-if="!pkg.arrived"
                    @click="openMarkArrivedModal(pkg)"
                    class="w-full px-4 py-2 bg-primary-50 text-primary-600 font-medium rounded-lg hover:bg-primary-100 transition-all"
                  >
                    {{ t.markArrived }}
                  </button>
                  <button 
                    v-else-if="!pkg.weight"
                    @click="openAddWeightModal(pkg)"
                    class="w-full px-4 py-2 bg-orange-50 text-orange-600 font-medium rounded-lg hover:bg-orange-100 transition-all"
                  >
                    {{ t.addWeight }}
                  </button>
                </div>
              </div>
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
  
      <!-- Mark Arrived Modal -->
      <TransitionRoot :show="showMarkArrivedModal" as="template">
        <Dialog as="div" class="relative z-50" @close="showMarkArrivedModal = false">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </TransitionChild>
  
          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                  <div class="p-6">
                    <DialogTitle class="text-lg font-semibold text-gray-900 mb-4">
                      {{ t.markPackageArrived }}
                    </DialogTitle>
                    
                    <div v-if="selectedPackage" class="space-y-4">
                      <!-- Package Info -->
                      <div class="bg-gray-50 rounded-lg p-4">
                        <p class="text-sm font-medium text-gray-900 mb-1">{{ selectedPackage.product_name || t.noName }}</p>
                        <p class="text-xs text-gray-500">{{ t.value }}: ${{ selectedPackage.declared_value }}</p>
                        <p class="text-xs text-gray-500">{{ t.order }}: {{ selectedPackage.order.order_number }}</p>
                        <p class="text-xs text-gray-500">{{ t.customer }}: {{ selectedPackage.order.user.name }}</p>
                      </div>
  
                      <!-- Weight Input -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                          {{ t.packageWeight }} <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <input
                            v-model.number="arrivedForm.weight"
                            type="number"
                            step="0.01"
                            min="0.01"
                            max="999.99"
                            class="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            :placeholder="t.weightPlaceholder"
                          >
                          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span class="text-gray-500 text-sm">kg</span>
                          </div>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">{{ t.weightHint }}</p>
                      </div>
  
                      <!-- Dimensions (Optional) -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                          {{ t.dimensions }} <span class="text-gray-400">({{ t.optional }})</span>
                        </label>
                        <div class="grid grid-cols-3 gap-2">
                          <div>
                            <input
                              v-model.number="arrivedForm.dimensions.length"
                              type="number"
                              step="1"
                              min="1"
                              max="999"
                              class="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="L"
                            >
                          </div>
                          <div>
                            <input
                              v-model.number="arrivedForm.dimensions.width"
                              type="number"
                              step="1"
                              min="1"
                              max="999"
                              class="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="W"
                            >
                          </div>
                          <div>
                            <input
                              v-model.number="arrivedForm.dimensions.height"
                              type="number"
                              step="1"
                              min="1"
                              max="999"
                              class="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="H"
                            >
                          </div>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">{{ t.dimensionsHint }}</p>
                      </div>
  
                      <!-- Warning Message -->
                      <div class="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <div class="flex items-start gap-2">
                          <svg class="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                          </svg>
                          <p class="text-sm text-amber-700">{{ t.arrivedWarning }}</p>
                        </div>
                      </div>
                    </div>
  
                    <div class="mt-6 flex gap-3">
                      <button
                        @click="confirmMarkArrived"
                        :disabled="!arrivedForm.weight || markingArrived"
                        class="flex-1 px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span v-if="!markingArrived">{{ t.confirmArrived }}</span>
                        <span v-else class="flex items-center justify-center gap-2">
                          <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {{ t.marking }}
                        </span>
                      </button>
                      <button
                        @click="closeMarkArrivedModal"
                        class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all"
                      >
                        {{ t.cancel }}
                      </button>
                    </div>
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
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  
  // Define page meta
  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin']
  })
  
  // Nuxt imports
  const { $customFetch, $toast } = useNuxtApp()
  
  // Use language composable
  const { t: createTranslations } = useLanguage()
  
  // State
  const packages = ref([])
  const loading = ref(true)
  const searchQuery = ref('')
  const statusFilter = ref('')
  const searchDebounce = ref(null)
  const showMarkArrivedModal = ref(false)
  const selectedPackage = ref(null)
  const markingArrived = ref(false)
  
  const pagination = ref({
    currentPage: 1,
    lastPage: 1,
    from: 0,
    to: 0,
    total: 0
  })
  
  const arrivedForm = ref({
    weight: null,
    dimensions: {
      length: null,
      width: null,
      height: null
    }
  })
  
  // Translations
  const translations = {
    packages: {
      es: 'Paquetes',
      en: 'Packages'
    },
    dashboard: {
      es: 'Panel de Control',
      en: 'Dashboard'
    },
    searchPlaceholder: {
      es: 'Buscar por producto, orden o cliente...',
      en: 'Search by product, order or customer...'
    },
    allStatuses: {
      es: 'Todos los Estados',
      en: 'All Statuses'
    },
    pending: {
      es: 'Pendiente',
      en: 'Pending'
    },
    arrived: {
      es: 'Llegó',
      en: 'Arrived'
    },
    missingWeight: {
      es: 'Sin Peso',
      en: 'Missing Weight'
    },
    showingFiltered: {
      es: 'Mostrando resultados filtrados',
      en: 'Showing filtered results'
    },
    clearFilters: {
      es: 'Limpiar filtros',
      en: 'Clear filters'
    },
    loadingPackages: {
      es: 'Cargando paquetes...',
      en: 'Loading packages...'
    },
    noPackages: {
      es: 'No se encontraron paquetes',
      en: 'No packages found'
    },
    noPackagesFound: {
      es: 'No se encontraron paquetes con los filtros actuales.',
      en: 'No packages found with current filters.'
    },
    product: {
      es: 'Producto',
      en: 'Product'
    },
    value: {
      es: 'Valor',
      en: 'Value'
    },
    order: {
      es: 'Orden',
      en: 'Order'
    },
    customer: {
      es: 'Cliente',
      en: 'Customer'
    },
    status: {
      es: 'Estado',
      en: 'Status'
    },
    weight: {
      es: 'Peso',
      en: 'Weight'
    },
    date: {
      es: 'Fecha',
      en: 'Date'
    },
    actions: {
      es: 'Acciones',
      en: 'Actions'
    },
    markArrived: {
      es: 'Marcar como Llegado',
      en: 'Mark as Arrived'
    },
    addWeight: {
      es: 'Agregar Peso',
      en: 'Add Weight'
    },
    noName: {
      es: 'Sin nombre',
      en: 'No name'
    },
    viewProduct: {
      es: 'Ver producto',
      en: 'View product'
    },
    qty: {
      es: 'Cant',
      en: 'Qty'
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
    totalPackages: {
      es: 'Total de Paquetes',
      en: 'Total Packages'
    },
    pendingPackages: {
      es: 'Paquetes Pendientes',
      en: 'Pending Packages'
    },
    arrivedToday: {
      es: 'Llegaron Hoy',
      en: 'Arrived Today'
    },
    packagesNeedWeight: {
      es: 'Necesitan Peso',
      en: 'Need Weight'
    },
    // Modal translations
    markPackageArrived: {
      es: 'Marcar Paquete como Llegado',
      en: 'Mark Package as Arrived'
    },
    packageWeight: {
      es: 'Peso del Paquete',
      en: 'Package Weight'
    },
    weightPlaceholder: {
      es: 'Ej: 1.5',
      en: 'Ex: 1.5'
    },
    weightHint: {
      es: 'Ingrese el peso en kilogramos con hasta 2 decimales',
      en: 'Enter weight in kilograms with up to 2 decimal places'
    },
    dimensions: {
      es: 'Dimensiones',
      en: 'Dimensions'
    },
    optional: {
      es: 'Opcional',
      en: 'Optional'
    },
    dimensionsHint: {
      es: 'Largo x Ancho x Alto en centímetros',
      en: 'Length x Width x Height in centimeters'
    },
    arrivedWarning: {
      es: 'Esta acción no se puede deshacer. Asegúrese de haber pesado el paquete correctamente.',
      en: 'This action cannot be undone. Make sure you have weighed the package correctly.'
    },
    confirmArrived: {
      es: 'Confirmar Llegada',
      en: 'Confirm Arrival'
    },
    marking: {
      es: 'Marcando...',
      en: 'Marking...'
    },
    cancel: {
      es: 'Cancelar',
      en: 'Cancel'
    }
  }
  
  const t = createTranslations(translations)
  
  // Computed stats
  const stats = computed(() => {
    // These would normally come from a dashboard API endpoint
    // For now, we'll calculate from loaded data
    const totalPackages = pagination.value.total || 0
    const pendingCount = packages.value.filter(p => !p.arrived).length
    const todayCount = packages.value.filter(p => {
      if (!p.arrived_at) return false
      const arrivedDate = new Date(p.arrived_at).toDateString()
      return arrivedDate === new Date().toDateString()
    }).length
    const missingWeightCount = packages.value.filter(p => p.arrived && !p.weight).length
  
    return [
      {
        label: t.value.totalPackages,
        value: totalPackages,
        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
        bgColor: 'bg-primary-50',
        iconColor: 'text-primary-600'
      },
      {
        label: t.value.pendingPackages,
        value: pendingCount,
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        bgColor: 'bg-yellow-50',
        iconColor: 'text-yellow-600'
      },
      {
        label: t.value.arrivedToday,
        value: todayCount,
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600'
      },
      {
        label: t.value.packagesNeedWeight,
        value: missingWeightCount,
        icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600'
      }
    ]
  })
  
  // Methods
  const fetchPackages = async (page = 1) => {
    loading.value = true
    try {
      const params = {
        page,
        search: searchQuery.value || undefined,
        status: statusFilter.value || undefined
      }
  
      const response = await $customFetch('/admin/packages', { params })
      
      packages.value = response.data.data
      pagination.value = {
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        from: response.data.from,
        to: response.data.to,
        total: response.data.total
      }
    } catch (error) {
      console.error('Error fetching packages:', error)
      $toast.error('Error loading packages')
    } finally {
      loading.value = false
    }
  }
  
  const changePage = (page) => {
    if (page >= 1 && page <= pagination.value.lastPage) {
      fetchPackages(page)
    }
  }
  
  const clearFilters = () => {
    searchQuery.value = ''
    statusFilter.value = ''
    fetchPackages(1)
  }
  
  const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  const getPackageStatusColor = (pkg) => {
    if (!pkg.arrived) return 'bg-yellow-100 text-yellow-700'
    if (pkg.arrived && !pkg.weight) return 'bg-orange-100 text-orange-700'
    return 'bg-green-100 text-green-700'
  }
  
  const getPackageStatusLabel = (pkg) => {
    if (!pkg.arrived) return t.value.pending
    if (pkg.arrived && !pkg.weight) return t.value.missingWeight
    return t.value.arrived
  }
  
  const openMarkArrivedModal = (pkg) => {
    selectedPackage.value = pkg
    arrivedForm.value = {
      weight: null,
      dimensions: {
        length: null,
        width: null,
        height: null
      }
    }
    showMarkArrivedModal.value = true
  }
  
  const closeMarkArrivedModal = () => {
    showMarkArrivedModal.value = false
    selectedPackage.value = null
    arrivedForm.value = {
      weight: null,
      dimensions: {
        length: null,
        width: null,
        height: null
      }
    }
  }
  
  const confirmMarkArrived = async () => {
    if (!selectedPackage.value || !arrivedForm.value.weight) return
  
    markingArrived.value = true
    try {
      const body = {
        arrived: true,
        weight: parseFloat(arrivedForm.value.weight)
      }
  
      // Only add dimensions if all three values are provided
      if (arrivedForm.value.dimensions.length && 
          arrivedForm.value.dimensions.width && 
          arrivedForm.value.dimensions.height) {
        body.dimensions = arrivedForm.value.dimensions
      }
  
      await $customFetch(`/admin/orders/${selectedPackage.value.order.id}/items/${selectedPackage.value.id}/arrived`, {
        method: 'PUT',
        body
      })
  
      $toast.success('Package marked as arrived')
      await fetchPackages(pagination.value.currentPage)
      closeMarkArrivedModal()
    } catch (error) {
      console.error('Error marking package arrived:', error)
      $toast.error('Error updating package')
    } finally {
      markingArrived.value = false
    }
  }
  
  const openAddWeightModal = (pkg) => {
    // Reuse the same modal for adding weight
    openMarkArrivedModal(pkg)
  }
  
  // Watch search query with debounce
  watch(searchQuery, () => {
    clearTimeout(searchDebounce.value)
    searchDebounce.value = setTimeout(() => {
      fetchPackages(1)
    }, 300)
  })
  
  // Watch status filter
  watch(statusFilter, () => {
    fetchPackages(1)
  })
  
  // Fetch data on mount
  onMounted(() => {
    fetchPackages()
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