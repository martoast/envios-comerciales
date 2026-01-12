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
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      
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

            <!-- Bulk Actions Bar -->
            <div v-if="selectedPackages.length > 0" class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-primary-50 border border-primary-200 rounded-xl mt-3">
              <div class="flex items-center gap-3">
                <span class="text-sm font-medium text-primary-900">
                  {{ selectedPackages.length }} {{ t.selected }}
                </span>
                <button
                  @click="clearSelection"
                  class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {{ t.clearSelection }}
                </button>
              </div>
              <div class="flex items-center gap-2">
                <!-- Mark as Arrived button (for pending packages) -->
                <button
                  v-if="selectedPendingCount > 0"
                  @click="bulkMarkArrived"
                  :disabled="bulkProcessing"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg v-if="!bulkProcessing" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <svg v-else class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  {{ t.markArrived }} ({{ selectedPendingCount }})
                </button>
                <!-- Mark as Pending button (for arrived packages) -->
                <button
                  v-if="selectedArrivedCount > 0"
                  @click="bulkMarkPending"
                  :disabled="bulkProcessing"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg v-if="!bulkProcessing" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                  </svg>
                  <svg v-else class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  {{ t.markPending }} ({{ selectedArrivedCount }})
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
<table class="min-w-full">
  <thead>
    <tr class="border-b border-gray-200">
      <th class="px-4 py-3 text-left w-12">
        <input
          type="checkbox"
          :checked="allSelected"
          @change="toggleSelectAll"
          class="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
          :title="t.selectAll"
        >
      </th>
      <th class="px-6 py-3 text-left">
        <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.product }}</span>
      </th>
      <th class="px-6 py-3 text-left">
        <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.order }}</span>
      </th>
      <th class="px-6 py-3 text-left">
        <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.customer }}</span>
      </th>
      <th class="px-6 py-3 text-left">
        <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.expectedDelivery }}</span>
      </th>
      <th class="px-6 py-3 text-left">
        <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.status }}</span>
      </th>
      <th class="px-6 py-3 text-left">
        <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.weight }}</span>
      </th>
      <th class="px-6 py-3 text-right">
        <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">{{ t.actions }}</span>
      </th>
    </tr>
  </thead>
  <tbody class="bg-white">
    <tr
      v-for="pkg in packages"
      :key="pkg.id"
      @click="navigateToPackage(pkg.id)"
      class="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
      :class="{ 'bg-primary-50/50': isSelected(pkg.id) }"
    >
      <td class="px-4 py-4" @click.stop>
        <input
          type="checkbox"
          :checked="isSelected(pkg.id)"
          @change="toggleSelection(pkg.id)"
          class="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
        >
      </td>
      <td class="px-6 py-4">
        <div class="text-sm font-medium text-gray-900">
          {{ pkg.product_name || t.noName }}
        </div>
        <div class="text-sm text-gray-500">
          {{ t.qty }}: {{ pkg.quantity }}
        </div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-900">
          {{ pkg.order.order_number }}
        </div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-900">
          {{ pkg.order.user.name }}
        </div>
      </td>
      <td class="px-6 py-4">
        <div v-if="pkg.estimated_delivery_date && !pkg.arrived">
          <div class="text-sm font-medium" :class="getDeliveryStatusColor(pkg)">
            {{ formatDeliveryDate(pkg.estimated_delivery_date) }}
          </div>
          <div class="text-xs mt-0.5" :class="getDeliveryStatusTextColor(pkg)">
            {{ getDaysUntilDelivery(pkg.estimated_delivery_date) }}
          </div>
        </div>
        <div v-else-if="pkg.arrived && pkg.arrived_at" class="text-sm text-green-600">
          {{ t.arrivedOn }} {{ formatDeliveryDate(pkg.arrived_at) }}
        </div>
        <div v-else class="text-sm text-gray-400">-</div>
      </td>
      <td class="px-6 py-4">
        <span :class="[
          'inline-flex px-2 py-1 text-xs font-medium rounded-full',
          getPackageStatusColor(pkg)
        ]">
          {{ getPackageStatusLabel(pkg) }}
        </span>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-900">
          {{ pkg.weight ? `${pkg.weight} kg` : '-' }}
        </div>
      </td>
      <td class="px-6 py-4 text-right" @click.stop>
        <button
          v-if="!pkg.arrived"
          @click="openMarkArrivedModal(pkg)"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          {{ t.markArrived }}
        </button>
        <button
          v-else
          @click="markAsPending(pkg)"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
          </svg>
          {{ t.markPending }}
        </button>
      </td>
    </tr>
  </tbody>
</table>
</div>

<!-- Mobile Cards -->
<div class="sm:hidden space-y-4 p-4">
<div
  v-for="pkg in packages"
  :key="pkg.id"
  @click="navigateToPackage(pkg.id)"
  class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
  :class="{ 'border-primary-300 bg-primary-50/30': isSelected(pkg.id) }"
>
  <div class="flex justify-between items-start mb-3">
    <div class="flex items-start gap-3">
      <input
        type="checkbox"
        :checked="isSelected(pkg.id)"
        @change="toggleSelection(pkg.id)"
        @click.stop
        class="mt-1 h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
      >
      <div class="flex-1">
        <h3 class="font-medium text-gray-900">{{ pkg.product_name || t.noName }}</h3>
        <p class="text-sm text-gray-500 mt-1">{{ t.qty }}: {{ pkg.quantity }}</p>
      </div>
    </div>
    <span :class="[
      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
      getPackageStatusColor(pkg)
    ]">
      {{ getPackageStatusLabel(pkg) }}
    </span>
  </div>
  
  <div class="grid grid-cols-2 gap-3 text-sm mb-3">
    <div>
      <p class="text-gray-500">{{ t.order }}</p>
      <p class="font-medium text-gray-900">{{ pkg.order.order_number }}</p>
    </div>
    <div>
      <p class="text-gray-500">{{ t.customer }}</p>
      <p class="font-medium text-gray-900">{{ pkg.order.user.name }}</p>
    </div>
    <div>
      <p class="text-gray-500">{{ t.weight }}</p>
      <p class="font-medium text-gray-900">{{ pkg.weight ? `${pkg.weight} kg` : '-' }}</p>
    </div>
    <div>
      <p class="text-gray-500">{{ t.value }}</p>
      <p class="font-medium text-gray-900">${{ pkg.declared_value || '0.00' }}</p>
    </div>
  </div>

  <!-- Estimated Delivery Section -->
  <div v-if="pkg.estimated_delivery_date && !pkg.arrived" class="p-3 rounded-lg mb-3" :class="getDeliveryStatusBgColor(pkg)">
    <p class="text-xs font-medium" :class="getDeliveryStatusTextColor(pkg)">{{ t.expectedDelivery }}</p>
    <p class="text-sm font-semibold mt-0.5" :class="getDeliveryStatusTextColor(pkg)">
      {{ formatDeliveryDate(pkg.estimated_delivery_date) }}
    </p>
    <p class="text-xs mt-1" :class="getDeliveryStatusTextColor(pkg)">
      {{ getDaysUntilDelivery(pkg.estimated_delivery_date) }}
    </p>
  </div>
  <div v-else-if="pkg.arrived && pkg.arrived_at" class="p-3 bg-green-50 rounded-lg mb-3">
    <p class="text-xs font-medium text-green-900">{{ t.arrivedOn }}</p>
    <p class="text-sm font-semibold text-green-700 mt-0.5">
      {{ formatDeliveryDate(pkg.arrived_at) }}
    </p>
  </div>

  <div @click.stop>
    <button
      v-if="!pkg.arrived"
      @click="openMarkArrivedModal(pkg)"
      class="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      {{ t.markArrived }}
    </button>
    <button
      v-else
      @click="markAsPending(pkg)"
      class="w-full py-2.5 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
      </svg>
      {{ t.markPending }}
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

    <!-- Mark Arrived Modal (keeping existing modal code) -->
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
                      <p class="text-xs text-gray-500">{{ t.value }}: ${{ selectedPackage.declared_value ?? '-' }}</p>
                      <p class="text-xs text-gray-500">{{ t.order }}: {{ selectedPackage.order.order_number }}</p>
                      <p class="text-xs text-gray-500">{{ t.customer }}: {{ selectedPackage.order.user.name }}</p>
                    </div>

                    <!-- Weight Input (Optional) -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ t.packageWeight }} <span class="text-gray-400">({{ t.optional }})</span>
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
                  </div>

                  <div class="mt-6 flex gap-3">
                    <button
                      @click="confirmMarkArrived"
                      :disabled="markingArrived"
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

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

const { $customFetch, $toast } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const { storeReturnUrl } = useListReturnUrl('packages')
const { t: createTranslations } = useLanguage()
const user = useUser().value

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

// Multi-select state
const selectedPackages = ref([])
const bulkProcessing = ref(false)

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
  packages: { es: 'Paquetes', en: 'Packages' },
  dashboard: { es: 'Panel de Control', en: 'Dashboard' },
  searchPlaceholder: { es: 'Buscar por producto, orden o cliente...', en: 'Search by product, order or customer...' },
  allStatuses: { es: 'Todos los Estados', en: 'All Statuses' },
  pending: { es: 'Pendiente', en: 'Pending' },
  arrived: { es: 'Llegó', en: 'Arrived' },
  showingFiltered: { es: 'Mostrando resultados filtrados', en: 'Showing filtered results' },
  clearFilters: { es: 'Limpiar filtros', en: 'Clear filters' },
  loadingPackages: { es: 'Cargando paquetes...', en: 'Loading packages...' },
  noPackages: { es: 'No se encontraron paquetes', en: 'No packages found' },
  noPackagesFound: { es: 'No se encontraron paquetes con los filtros actuales.', en: 'No packages found with current filters.' },
  product: { es: 'Producto', en: 'Product' },
  value: { es: 'Valor', en: 'Value' },
  order: { es: 'Orden', en: 'Order' },
  customer: { es: 'Cliente', en: 'Customer' },
  status: { es: 'Estado', en: 'Status' },
  weight: { es: 'Peso', en: 'Weight' },
  actions: { es: 'Acciones', en: 'Actions' },
  expectedDelivery: { es: 'Entrega Estimada', en: 'Expected Delivery' },
  markArrived: { es: 'Marcar Llegado', en: 'Mark Arrived' },
  markPending: { es: 'Marcar Pendiente', en: 'Mark Pending' },
  noName: { es: 'Sin nombre', en: 'No name' },
  qty: { es: 'Cant', en: 'Qty' },
  showing: { es: 'Mostrando', en: 'Showing' },
  to: { es: 'a', en: 'to' },
  of: { es: 'de', en: 'of' },
  results: { es: 'resultados', en: 'results' },
  previous: { es: 'Anterior', en: 'Previous' },
  next: { es: 'Siguiente', en: 'Next' },
  totalPackages: { es: 'Total de Paquetes', en: 'Total Packages' },
  pendingPackages: { es: 'Paquetes Pendientes', en: 'Pending Packages' },
  arrivedPackages: { es: 'Paquetes Llegados', en: 'Arrived Packages' },
  arrivedToday: { es: 'Llegaron Hoy', en: 'Arrived Today' },
  markPackageArrived: { es: 'Marcar Paquete como Llegado', en: 'Mark Package as Arrived' },
  packageWeight: { es: 'Peso del Paquete', en: 'Package Weight' },
  weightPlaceholder: { es: 'Ej: 1.5', en: 'Ex: 1.5' },
  weightHint: { es: 'Ingrese el peso en kilogramos con hasta 2 decimales', en: 'Enter weight in kilograms with up to 2 decimal places' },
  dimensions: { es: 'Dimensiones', en: 'Dimensions' },
  optional: { es: 'Opcional', en: 'Optional' },
  dimensionsHint: { es: 'Largo x Ancho x Alto en centímetros', en: 'Length x Width x Height in centimeters' },
  confirmArrived: { es: 'Confirmar Llegada', en: 'Confirm Arrival' },
  marking: { es: 'Marcando...', en: 'Marking...' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  arrivedOn: { es: 'Llegó el', en: 'Arrived on' },
  today: { es: 'Hoy', en: 'Today' },
  tomorrow: { es: 'Mañana', en: 'Tomorrow' },
  daysAway: { es: 'días', en: 'days away' },
  dayAway: { es: 'día', en: 'day away' },
  daysOverdue: { es: 'días de retraso', en: 'days overdue' },
  dayOverdue: { es: 'día de retraso', en: 'day overdue' },
  selected: { es: 'seleccionados', en: 'selected' },
  clearSelection: { es: 'Limpiar selección', en: 'Clear selection' },
  markSelectedArrived: { es: 'Marcar como Llegados', en: 'Mark as Arrived' },
  processing: { es: 'Procesando...', en: 'Processing...' },
  selectAll: { es: 'Seleccionar todos pendientes', en: 'Select all pending' },
}

const t = createTranslations(translations)

// Computed stats
const stats = computed(() => {
  const totalPackages = pagination.value.total || 0
  const pendingCount = packages.value.filter(p => !p.arrived).length
  const arrivedCount = packages.value.filter(p => p.arrived).length
  const todayCount = packages.value.filter(p => {
    if (!p.arrived_at) return false
    const arrivedDate = new Date(p.arrived_at).toDateString()
    return arrivedDate === new Date().toDateString()
  }).length

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
      label: t.value.arrivedPackages,
      value: arrivedCount,
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      label: t.value.arrivedToday,
      value: todayCount,
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    }
  ]
})

// Delivery date helper methods
const formatDeliveryDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const locale = user?.preferred_language === 'es' ? 'es-MX' : 'en-US'
  
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric'
  })
}

const getDeliveryStatus = (dateString) => {
  if (!dateString) return null
  
  const deliveryDate = new Date(dateString)
  const today = new Date()
  
  deliveryDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  
  const diffTime = deliveryDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'overdue'
  if (diffDays === 0) return 'today'
  if (diffDays <= 3) return 'soon'
  return 'future'
}

const getDaysUntilDelivery = (dateString) => {
  if (!dateString) return ''
  
  const deliveryDate = new Date(dateString)
  const today = new Date()
  
  deliveryDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  
  const diffTime = deliveryDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) {
    const absDays = Math.abs(diffDays)
    return absDays === 1 
      ? `1 ${t.value.dayOverdue}` 
      : `${absDays} ${t.value.daysOverdue}`
  } else if (diffDays === 0) {
    return t.value.today
  } else if (diffDays === 1) {
    return t.value.tomorrow
  } else {
    return `${diffDays} ${t.value.daysAway}`
  }
}

const getDeliveryStatusColor = (pkg) => {
  const status = getDeliveryStatus(pkg.estimated_delivery_date)
  if (status === 'overdue') return 'text-red-600'
  if (status === 'today') return 'text-blue-600'
  if (status === 'soon') return 'text-amber-600'
  return 'text-gray-900'
}

const getDeliveryStatusTextColor = (pkg) => {
  const status = getDeliveryStatus(pkg.estimated_delivery_date)
  if (status === 'overdue') return 'text-red-600'
  if (status === 'today') return 'text-blue-600'
  if (status === 'soon') return 'text-amber-600'
  return 'text-gray-600'
}

const getDeliveryStatusBgColor = (pkg) => {
  const status = getDeliveryStatus(pkg.estimated_delivery_date)
  if (status === 'overdue') return 'bg-red-50'
  if (status === 'today') return 'bg-blue-50'
  if (status === 'soon') return 'bg-amber-50'
  return 'bg-gray-50'
}

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
    fetchPackages(page).then(() => updateQueryParams())
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  fetchPackages(1).then(() => updateQueryParams())
}

// Sync filters to URL query params
const updateQueryParams = () => {
  const query = {}
  if (searchQuery.value) query.search = searchQuery.value
  if (statusFilter.value) query.status = statusFilter.value
  if (pagination.value.currentPage > 1) query.page = pagination.value.currentPage
  router.replace({ query })
}

// Initialize filters from URL query params
const initFiltersFromQuery = () => {
  const q = route.query
  if (q.search) searchQuery.value = q.search
  if (q.status) statusFilter.value = q.status
}

const getPackageStatusColor = (pkg) => {
  return pkg.arrived ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
}

const getPackageStatusLabel = (pkg) => {
  return pkg.arrived ? t.value.arrived : t.value.pending
}

// Multi-select helpers
const allSelected = computed(() => {
  return packages.value.length > 0 && packages.value.every(p => selectedPackages.value.includes(p.id))
})

const selectedPendingCount = computed(() => {
  return packages.value.filter(p => selectedPackages.value.includes(p.id) && !p.arrived).length
})

const selectedArrivedCount = computed(() => {
  return packages.value.filter(p => selectedPackages.value.includes(p.id) && p.arrived).length
})

const isSelected = (packageId) => {
  return selectedPackages.value.includes(packageId)
}

const toggleSelection = (packageId) => {
  const index = selectedPackages.value.indexOf(packageId)
  if (index > -1) {
    selectedPackages.value.splice(index, 1)
  } else {
    selectedPackages.value.push(packageId)
  }
}

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedPackages.value = []
  } else {
    selectedPackages.value = packages.value.map(p => p.id)
  }
}

const clearSelection = () => {
  selectedPackages.value = []
}

const bulkMarkArrived = async () => {
  const packagesToMark = packages.value.filter(p => selectedPackages.value.includes(p.id) && !p.arrived)
  if (packagesToMark.length === 0) return

  bulkProcessing.value = true
  try {
    await Promise.all(packagesToMark.map(pkg =>
      $customFetch(`/admin/orders/${pkg.order.id}/items/${pkg.id}/arrived`, {
        method: 'PUT',
        body: { arrived: true }
      })
    ))

    $toast.success(`${packagesToMark.length} packages marked as arrived`)
    selectedPackages.value = []
    await fetchPackages(pagination.value.currentPage)
  } catch (error) {
    console.error('Error marking packages arrived:', error)
    $toast.error('Error updating packages')
  } finally {
    bulkProcessing.value = false
  }
}

const bulkMarkPending = async () => {
  const packagesToMark = packages.value.filter(p => selectedPackages.value.includes(p.id) && p.arrived)
  if (packagesToMark.length === 0) return

  bulkProcessing.value = true
  try {
    await Promise.all(packagesToMark.map(pkg =>
      $customFetch(`/admin/orders/${pkg.order.id}/items/${pkg.id}/arrived`, {
        method: 'PUT',
        body: { arrived: false }
      })
    ))

    $toast.success(`${packagesToMark.length} packages marked as pending`)
    selectedPackages.value = []
    await fetchPackages(pagination.value.currentPage)
  } catch (error) {
    console.error('Error marking packages pending:', error)
    $toast.error('Error updating packages')
  } finally {
    bulkProcessing.value = false
  }
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
  if (!selectedPackage.value) return

  markingArrived.value = true
  try {
    const body = {
      arrived: true
    }

    // Only include weight if provided
    if (arrivedForm.value.weight) {
      body.weight = parseFloat(arrivedForm.value.weight)
    }

    // Only include dimensions if all values provided
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

const navigateToPackage = (packageId) => {
  navigateTo(`/app/admin/packages/${packageId}`)
}

const markAsPending = async (pkg) => {
  try {
    await $customFetch(`/admin/orders/${pkg.order.id}/items/${pkg.id}/arrived`, {
      method: 'PUT',
      body: { arrived: false }
    })
    $toast.success('Package marked as pending')
    await fetchPackages(pagination.value.currentPage)
  } catch (error) {
    console.error('Error marking package pending:', error)
    $toast.error('Error updating package')
  }
}

// Watch search query with debounce
watch(searchQuery, () => {
  clearTimeout(searchDebounce.value)
  searchDebounce.value = setTimeout(() => {
    fetchPackages(1).then(() => updateQueryParams())
  }, 300)
})

// Watch status filter
watch(statusFilter, () => {
  fetchPackages(1).then(() => updateQueryParams())
})

// Store URL for back navigation whenever route changes
watch(() => route.fullPath, (newPath) => {
  storeReturnUrl(newPath)
}, { immediate: true })

// Fetch data on mount
onMounted(() => {
  initFiltersFromQuery()
  const initialPage = parseInt(route.query.page) || 1
  fetchPackages(initialPage)
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

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>