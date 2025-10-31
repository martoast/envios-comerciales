<!-- pages/app/admin/orders/[id]/index.vue -->
<template>
  <section class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-4">
            <NuxtLink 
              to="/app/admin/orders" 
              class="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">{{ t.orderDetails }}</h1>
              <p class="text-sm text-gray-500">{{ order?.order_number }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <span v-if="order" :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              getStatusColor(order.status)
            ]">
              {{ getStatusLabel(order.status) }}
            </span>
            
            <div class="relative">
              <button
                @click="showActionsMenu = !showActionsMenu"
                @blur="() => setTimeout(() => showActionsMenu = false, 200)"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                </svg>
              </button>
              
              <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div v-if="showActionsMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                  <NuxtLink
                    :to="`/app/admin/orders/${order.id}/edit`"
                    @click="showActionsMenu = false"
                    class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    {{ t.editOrder }}
                  </NuxtLink>
                  
                  <hr class="my-1 border-gray-100">
                  
                  <button
                    @click="openDeleteModal"
                    class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    {{ t.deleteOrder }}
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="w-12 h-12 border-3 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p class="mt-4 text-sm text-gray-600">{{ t.loading }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="order" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <!-- Quick Actions Bar -->
      <div class="mb-6 bg-white rounded-xl border border-gray-200 p-4">
        <div class="flex flex-wrap gap-3">
          <!-- Actions buttons... (keeping existing) -->
          <div
            v-if="['collecting', 'awaiting_packages'].includes(order.status)"
            class="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ t.waitingForPackages }}
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Customer Info -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.customerInformation }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">{{ t.name }}</p>
                <p class="font-medium">{{ order.user.name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.email }}</p>
                <p class="font-medium">{{ order.user.email }}</p>
              </div>
              <div class="col-span-2">
                <p class="text-sm text-gray-500">{{ t.deliveryAddress }}</p>
                <p class="text-sm font-medium">
                  {{ formatAddress(order.delivery_address) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Items List with Estimated Delivery -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">{{ t.items }}</h2>
              <span class="text-sm text-gray-500">{{ order.items.length }} {{ t.itemsCount }}</span>
            </div>
            <div class="divide-y divide-gray-100">
              <div
                v-for="item in order.items"
                :key="item.id"
                class="px-6 py-4"
              >
                <div class="flex justify-between items-start mb-3">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ item.product_name }}</p>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ t.quantity }}: {{ item.quantity }} | 
                      <span v-if="item.weight">{{ t.weight }}: {{ item.weight || 0 }} kg</span>
                      <template v-if="item.declared_value">
                        | {{ t.value }}: ${{ item.declared_value }}
                      </template>
                    </p>
                    <p v-if="item.dimensions" class="text-xs text-gray-500">
                      {{ t.dimensions }}: {{ formatDimensions(item.dimensions) }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      item.arrived ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    ]">
                      {{ item.arrived ? t.arrived : t.pending }}
                    </span>
                    <button
                      v-if="!item.arrived && order.status !== 'collecting'"
                      @click="openMarkArrivedModal(item)"
                      class="p-1.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      :title="t.markArrived"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Estimated Delivery Date Section (NEW) -->
                <div v-if="item.estimated_delivery_date" class="mt-3 bg-blue-50 rounded-lg p-3">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-xs font-medium text-blue-900">{{ t.expectedDelivery }}</p>
                      <p class="text-sm font-semibold text-blue-700 mt-0.5">
                        {{ formatDeliveryDate(item.estimated_delivery_date) }}
                      </p>
                      <!-- Status Badge -->
                      <div class="mt-1">
                        <span v-if="getDeliveryStatus(item.estimated_delivery_date, item.arrived) === 'overdue'" class="inline-flex items-center gap-1 text-xs text-red-600">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          {{ getDaysUntilDelivery(item.estimated_delivery_date) }}
                        </span>
                        <span v-else-if="getDeliveryStatus(item.estimated_delivery_date, item.arrived) === 'today'" class="inline-flex items-center gap-1 text-xs text-blue-600 font-medium">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          {{ t.expectedToday }}
                        </span>
                        <span v-else-if="getDeliveryStatus(item.estimated_delivery_date, item.arrived) === 'soon'" class="inline-flex items-center gap-1 text-xs text-amber-600">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          {{ getDaysUntilDelivery(item.estimated_delivery_date) }}
                        </span>
                        <span v-else class="text-xs text-gray-600">
                          {{ getDaysUntilDelivery(item.estimated_delivery_date) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Proof of Purchase Section -->
                <div v-if="item.proof_of_purchase_full_url" class="mt-3 bg-gray-50 rounded-lg p-3">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <div class="p-1.5 bg-primary-100 rounded-lg">
                          <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                          </svg>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900 text-xs">{{ t.proofOfPurchase }}</p>
                          <p v-if="item.proof_of_purchase_filename" class="text-xs text-gray-500">
                            {{ item.proof_of_purchase_filename }}
                            <span v-if="item.proof_of_purchase_size"> • {{ formatFileSize(item.proof_of_purchase_size) }}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div class="flex gap-2">
                        <a 
                          :href="item.proof_of_purchase_full_url" 
                          target="_blank"
                          class="inline-flex items-center gap-1 px-2 py-1 bg-white text-primary-700 text-xs font-medium rounded-lg border border-primary-200 hover:bg-primary-50 transition-colors"
                        >
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                          {{ t.viewDocument }}
                        </a>
                        <a 
                          :href="item.proof_of_purchase_full_url" 
                          download
                          class="inline-flex items-center gap-1 px-2 py-1 bg-white text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                          </svg>
                          {{ t.downloadDocument }}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Order Summary -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.orderSummary }}</h2>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">{{ t.orderNumber }}</p>
                <p class="font-medium">{{ order.order_number }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.trackingNumber }}</p>
                <p class="font-medium">{{ order.tracking_number }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.totalWeight }}</p>
                <p class="font-medium">{{ order.total_weight || 0 }} kg</p>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.timeline }}</h2>
            <div class="space-y-4">
              <div v-if="order.created_at" class="flex gap-3">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-gray-400 mt-1.5"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ t.orderCreated }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(order.created_at) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Start Processing Modal -->
    <TransitionRoot :show="showStartProcessingModal" as="template">
      <Dialog class="relative z-50" @close="showStartProcessingModal = false">
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
                  <div class="flex items-center gap-3 mb-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                      </svg>
                    </div>
                    <DialogTitle class="text-lg font-semibold text-gray-900">
                      {{ t.startProcessingTitle }}
                    </DialogTitle>
                  </div>

                  <p class="text-sm text-gray-600 mb-6">
                    {{ t.startProcessingMessage }}
                  </p>

                  <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm text-gray-600">{{ t.orderNumber }}</span>
                      <span class="text-sm font-medium text-gray-900">{{ order?.order_number }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">{{ t.totalPackages }}</span>
                      <span class="text-sm font-medium text-gray-900">{{ order?.items?.length || 0 }}</span>
                    </div>
                  </div>

                  <div class="flex gap-3">
                    <button
                      @click="confirmStartProcessing"
                      :disabled="processingStatus"
                      class="flex-1 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50"
                    >
                      <span v-if="!processingStatus">{{ t.confirmStartProcessing }}</span>
                      <span v-else class="inline-flex items-center gap-2">
                        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        {{ t.processing }}
                      </span>
                    </button>
                    <button
                      @click="showStartProcessingModal = false"
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

    <!-- Ship Confirm Modal -->
    <TransitionRoot :show="showShipConfirmModal" as="template">
      <Dialog class="relative z-50" @close="showShipConfirmModal = false">
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
                  <div class="flex items-center gap-3 mb-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                      </svg>
                    </div>
                    <DialogTitle class="text-lg font-semibold text-gray-900">
                      {{ t.shipOrderTitle }}
                    </DialogTitle>
                  </div>

                  <p class="text-sm text-gray-600 mb-6">
                    {{ t.shipOrderMessage }}
                  </p>

                  <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm text-gray-600">{{ t.orderNumber }}</span>
                      <span class="text-sm font-medium text-gray-900">{{ order?.order_number }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">{{ t.totalWeight }}</span>
                      <span class="text-sm font-medium text-gray-900">{{ order?.total_weight || 0 }} kg</span>
                    </div>
                  </div>

                  <div class="flex gap-3">
                    <NuxtLink
                      :to="`/app/admin/orders/${order.id}/ship`"
                      class="flex-1 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all text-center"
                    >
                      {{ t.continueToShip }}
                    </NuxtLink>
                    <button
                      @click="showShipConfirmModal = false"
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

    <!-- Mark as Delivered Modal -->
    <TransitionRoot :show="showMarkDeliveredModal" as="template">
      <Dialog class="relative z-50" @close="showMarkDeliveredModal = false">
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
                  <div class="flex items-center gap-3 mb-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <DialogTitle class="text-lg font-semibold text-gray-900">
                      {{ t.markAsDeliveredTitle }}
                    </DialogTitle>
                  </div>

                  <p class="text-sm text-gray-600 mb-6">
                    {{ t.markAsDeliveredMessage }}
                  </p>

                  <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm text-gray-600">{{ t.orderNumber }}</span>
                      <span class="text-sm font-medium text-gray-900">{{ order?.order_number }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">{{ t.customer }}</span>
                      <span class="text-sm font-medium text-gray-900">{{ order?.user?.name }}</span>
                    </div>
                  </div>

                  <div class="flex gap-3">
                    <button
                      @click="confirmMarkAsDelivered"
                      :disabled="processingStatus"
                      class="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
                    >
                      <span v-if="!processingStatus">{{ t.confirmDelivered }}</span>
                      <span v-else class="inline-flex items-center gap-2">
                        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        {{ t.processing }}
                      </span>
                    </button>
                    <button
                      @click="showMarkDeliveredModal = false"
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

    <!-- Create Invoice Modal -->
    <TransitionRoot :show="showCreateInvoiceModal" as="template">
      <Dialog class="relative z-50" @close="showCreateInvoiceModal = false">
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
                  <div class="flex items-center gap-3 mb-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <DialogTitle class="text-lg font-semibold text-gray-900">
                      {{ t.createInvoiceTitle }}
                    </DialogTitle>
                  </div>

                  <p class="text-sm text-gray-600 mb-6">
                    {{ t.createInvoiceMessage }}
                  </p>

                  <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm text-gray-600">{{ t.orderNumber }}</span>
                      <span class="text-sm font-medium text-gray-900">{{ order?.order_number }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">{{ t.totalWeight }}</span>
                      <span class="text-sm font-medium text-gray-900">{{ order?.total_weight || 0 }} kg</span>
                    </div>
                  </div>

                  <div class="flex gap-3">
                    <NuxtLink
                      :to="`/app/admin/orders/${order.id}/quote`"
                      class="flex-1 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all text-center"
                    >
                      {{ t.continueToInvoice }}
                    </NuxtLink>
                    <button
                      @click="showCreateInvoiceModal = false"
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

    <!-- Mark as Paid Modal -->
    <TransitionRoot :show="showMarkPaidModal" as="template">
      <Dialog class="relative z-50" @close="showMarkPaidModal = false">
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
                  <div class="flex items-center gap-3 mb-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <DialogTitle class="text-lg font-semibold text-gray-900">
                      {{ t.markAsPaidTitle }}
                    </DialogTitle>
                  </div>

                  <p class="text-sm text-gray-600 mb-6">
                    {{ t.markAsPaidMessage }}
                  </p>

                  <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm text-gray-600">{{ t.invoiceAmount }}</span>
                      <span class="text-lg font-bold text-gray-900">${{ order?.quoted_amount || 0 }} MXN</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">{{ t.orderNumber }}</span>
                      <span class="text-sm font-medium text-gray-900">{{ order?.order_number }}</span>
                    </div>
                  </div>

                  <div class="flex gap-3">
                    <button
                      @click="confirmMarkAsPaid"
                      :disabled="markingPaid"
                      class="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
                    >
                      <span v-if="!markingPaid">{{ t.confirmPaid }}</span>
                      <span v-else class="inline-flex items-center gap-2">
                        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        {{ t.processing }}
                      </span>
                    </button>
                    <button
                      @click="showMarkPaidModal = false"
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

    <!-- Mark Arrived Modal -->
    <TransitionRoot :show="showMarkArrivedModal" as="template">
      <Dialog class="relative z-50" @close="showMarkArrivedModal = false">
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

                  <div v-if="selectedItem" class="space-y-4">
                    <div class="bg-gray-50 rounded-lg p-4">
                      <p class="text-sm font-medium text-gray-900">
                        {{ selectedItem.product_name }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1">
                        {{ t.quantity }}: {{ selectedItem.quantity }}
                      </p>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ t.packageWeight }}
                        <span class="text-red-500">*</span>
                      </label>
                      <div class="relative">
                        <input
                          v-model.number="arrivedForm.weight"
                          type="number"
                          step="0.01"
                          min="0.01"
                          max="999.99"
                          class="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="0.00"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span class="text-gray-500 text-sm">kg</span>
                        </div>
                      </div>
                      <p class="mt-1 text-xs text-gray-500">
                        {{ t.weightHint }}
                      </p>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ t.dimensions }}
                        <span class="text-gray-400">({{ t.optional }})</span>
                      </label>
                      <div class="grid grid-cols-3 gap-2">
                        <input
                          v-model.number="arrivedForm.dimensions.length"
                          type="number"
                          placeholder="L"
                          class="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <input
                          v-model.number="arrivedForm.dimensions.width"
                          type="number"
                          placeholder="W"
                          class="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <input
                          v-model.number="arrivedForm.dimensions.height"
                          type="number"
                          placeholder="H"
                          class="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <p class="mt-1 text-xs text-gray-500">
                        {{ t.dimensionsHint }}
                      </p>
                    </div>
                  </div>

                  <div class="mt-6 flex gap-3">
                    <button
                      @click="confirmMarkArrived"
                      :disabled="!arrivedForm.weight || markingArrived"
                      class="flex-1 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50"
                    >
                      <span v-if="!markingArrived">{{ t.confirmArrived }}</span>
                      <span v-else class="inline-flex items-center gap-2">
                        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
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

    <!-- Delete Order Modal -->
    <TransitionRoot :show="showDeleteModal" as="template">
      <Dialog class="relative z-50" @close="showDeleteModal = false">
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
                  <div class="flex items-center gap-4 mb-4">
                    <div class="p-3 bg-red-100 rounded-xl">
                      <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <DialogTitle class="text-lg font-semibold text-gray-900">
                        {{ t.deleteOrderTitle }}
                      </DialogTitle>
                      <p class="text-sm text-gray-500 mt-1">
                        {{ t.deleteOrderWarning }}
                      </p>
                    </div>
                  </div>

                  <div v-if="order" class="bg-gray-50 rounded-lg p-4 mb-6">
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-500">{{ t.orderNumber }}:</span>
                        <span class="font-medium text-gray-900">{{ order.order_number }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-500">{{ t.customer }}:</span>
                        <span class="font-medium text-gray-900">{{ order.user.name }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-500">{{ t.items }}:</span>
                        <span class="font-medium text-gray-900">{{ order.items?.length || 0 }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                    <p class="text-sm text-red-800">
                      <strong>{{ t.warningTitle }}:</strong> {{ t.deleteWarningMessage }}
                    </p>
                  </div>

                  <div class="flex gap-3">
                    <button
                      @click="confirmDeleteOrder"
                      :disabled="deletingOrder"
                      class="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                      <span v-if="!deletingOrder">{{ t.confirmDelete }}</span>
                      <span v-else class="inline-flex items-center justify-center gap-2">
                        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        {{ t.deleting }}
                      </span>
                    </button>
                    <button
                      @click="showDeleteModal = false"
                      :disabled="deletingOrder"
                      class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
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
import { ref, onMounted } from 'vue'
import { 
  Dialog, 
  DialogPanel, 
  DialogTitle, 
  TransitionRoot, 
  TransitionChild 
} from '@headlessui/vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
})

const { $customFetch, $toast } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const { t: createTranslations } = useLanguage()
const user = useUser().value

// State
const order = ref(null)
const loading = ref(true)
const showActionsMenu = ref(false)
const showMarkArrivedModal = ref(false)
const showDeleteModal = ref(false)
const showStartProcessingModal = ref(false)
const showShipConfirmModal = ref(false)
const showMarkDeliveredModal = ref(false)
const showCreateInvoiceModal = ref(false)
const showMarkPaidModal = ref(false)
const selectedItem = ref(null)
const processingStatus = ref(false)
const markingArrived = ref(false)
const markingPaid = ref(false)
const deletingOrder = ref(false)

const arrivedForm = ref({
  weight: null,
  dimensions: {
    length: null,
    width: null,
    height: null,
  }
})

// Translations
const translations = {
  orderDetails: { es: 'Detalles de la Orden', en: 'Order Details' },
  loading: { es: 'Cargando...', en: 'Loading...' },
  editOrder: { es: 'Editar Orden', en: 'Edit Order' },
  deleteOrder: { es: 'Eliminar Orden', en: 'Delete Order' },
  waitingForPackages: { es: 'Esperando que todos los paquetes lleguen...', en: 'Waiting for all packages to arrive...' },
  customerInformation: { es: 'Información del Cliente', en: 'Customer Information' },
  name: { es: 'Nombre', en: 'Name' },
  email: { es: 'Email', en: 'Email' },
  deliveryAddress: { es: 'Dirección de Entrega', en: 'Delivery Address' },
  items: { es: 'Artículos', en: 'Items' },
  itemsCount: { es: 'artículos', en: 'items' },
  quantity: { es: 'Cantidad', en: 'Quantity' },
  weight: { es: 'Peso', en: 'Weight' },
  value: { es: 'Valor', en: 'Value' },
  dimensions: { es: 'Dimensiones', en: 'Dimensions' },
  arrived: { es: 'Llegó', en: 'Arrived' },
  pending: { es: 'Pendiente', en: 'Pending' },
  markArrived: { es: 'Marcar como Llegado', en: 'Mark as Arrived' },
  orderSummary: { es: 'Resumen de Orden', en: 'Order Summary' },
  orderNumber: { es: 'Número de Orden', en: 'Order Number' },
  trackingNumber: { es: 'Número de Rastreo', en: 'Tracking Number' },
  totalWeight: { es: 'Peso Total', en: 'Total Weight' },
  timeline: { es: 'Línea de Tiempo', en: 'Timeline' },
  orderCreated: { es: 'Orden Creada', en: 'Order Created' },
  proofOfPurchase: { es: 'Comprobante de Compra', en: 'Proof of Purchase' },
  viewDocument: { es: 'Ver Documento', en: 'View Document' },
  downloadDocument: { es: 'Descargar', en: 'Download' },
  expectedDelivery: { es: 'Entrega Estimada', en: 'Expected Delivery' },
  expectedToday: { es: 'Llega hoy', en: 'Expected today' },
  daysOverdue: { es: 'días de retraso', en: 'days overdue' },
  dayOverdue: { es: 'día de retraso', en: 'day overdue' },
  daysAway: { es: 'días', en: 'days away' },
  dayAway: { es: 'día', en: 'day away' },
  packageWeight: { es: 'Peso del Paquete', en: 'Package Weight' },
  weightHint: { es: 'Ingresa el peso en kilogramos', en: 'Enter weight in kilograms' },
  dimensionsHint: { es: 'Largo × Ancho × Alto (cm)', en: 'Length × Width × Height (cm)' },
  optional: { es: 'Opcional', en: 'Optional' },
  confirmArrived: { es: 'Confirmar Llegada', en: 'Confirm Arrival' },
  marking: { es: 'Marcando...', en: 'Marking...' },
  markPackageArrived: { es: 'Marcar Paquete como Llegado', en: 'Mark Package as Arrived' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  startProcessingTitle: { es: 'Iniciar Procesamiento', en: 'Start Processing' },
  startProcessingMessage: { es: '¿Estás seguro que quieres iniciar el procesamiento de esta orden?', en: 'Are you sure you want to start processing this order?' },
  totalPackages: { es: 'Total de Paquetes', en: 'Total Packages' },
  confirmStartProcessing: { es: 'Iniciar Procesamiento', en: 'Start Processing' },
  processing: { es: 'Procesando...', en: 'Processing...' },
  shipOrderTitle: { es: 'Enviar Orden', en: 'Ship Order' },
  shipOrderMessage: { es: '¿Listo para enviar esta orden?', en: 'Ready to ship this order?' },
  continueToShip: { es: 'Continuar a Envío', en: 'Continue to Ship' },
  markAsDeliveredTitle: { es: 'Marcar como Entregado', en: 'Mark as Delivered' },
  markAsDeliveredMessage: { es: '¿Confirmas que esta orden fue entregada al cliente?', en: 'Confirm that this order was delivered to the customer?' },
  customer: { es: 'Cliente', en: 'Customer' },
  confirmDelivered: { es: 'Confirmar Entrega', en: 'Confirm Delivery' },
  createInvoiceTitle: { es: 'Crear Factura', en: 'Create Invoice' },
  createInvoiceMessage: { es: 'Crear una factura para esta orden', en: 'Create an invoice for this order' },
  continueToInvoice: { es: 'Continuar a Factura', en: 'Continue to Invoice' },
  markAsPaidTitle: { es: 'Marcar como Pagado', en: 'Mark as Paid' },
  markAsPaidMessage: { es: '¿Confirmas que esta orden ha sido pagada?', en: 'Confirm that this order has been paid?' },
  invoiceAmount: { es: 'Monto de Factura', en: 'Invoice Amount' },
  confirmPaid: { es: 'Confirmar Pago', en: 'Confirm Payment' },
  deleteOrderTitle: { es: 'Eliminar Orden', en: 'Delete Order' },
  deleteOrderWarning: { es: 'Esta acción no se puede deshacer', en: 'This action cannot be undone' },
  warningTitle: { es: 'Advertencia', en: 'Warning' },
  deleteWarningMessage: { es: 'Todos los datos asociados con esta orden se eliminarán permanentemente.', en: 'All data associated with this order will be permanently deleted.' },
  confirmDelete: { es: 'Eliminar Orden', en: 'Delete Order' },
  deleting: { es: 'Eliminando...', en: 'Deleting...' },
  collecting: { es: 'Recolectando', en: 'Collecting' },
  awaiting_packages: { es: 'Esperando Paquetes', en: 'Awaiting Packages' },
  packages_complete: { es: 'Paquetes Completos', en: 'Packages Complete' },
  shipped: { es: 'Enviado', en: 'Shipped' },
  delivered: { es: 'Entregado', en: 'Delivered' },
  awaiting_payment: { es: 'Esperando Pago', en: 'Awaiting Payment' },
  paid: { es: 'Pagado', en: 'Paid' },
  cancelled: { es: 'Cancelado', en: 'Cancelled' },
}

const t = createTranslations(translations)

// Methods
const fetchOrder = async () => {
  loading.value = true
  try {
    const response = await $customFetch(`/admin/orders/${route.params.id}`)
    order.value = response.data
  } catch (error) {
    console.error('Error fetching order:', error)
    $toast.error('Error loading order')
    await router.push('/app/admin/orders')
  } finally {
    loading.value = false
  }
}

const getStatusColor = (status) => {
  const colors = {
    collecting: 'bg-blue-100 text-blue-700',
    awaiting_packages: 'bg-amber-100 text-amber-700',
    packages_complete: 'bg-purple-100 text-purple-700',
    processing: 'bg-primary-100 text-primary-700',
    shipped: 'bg-primary-100 text-primary-700',
    delivered: 'bg-green-100 text-green-700',
    awaiting_payment: 'bg-orange-100 text-orange-700',
    paid: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

const getStatusLabel = (status) => {
  return t.value[status] || status
}

const formatAddress = (address) => {
  if (!address) return '-'
  const parts = [
    address.street,
    address.exterior_number,
    address.colonia,
    address.municipio,
    address.estado,
    address.postal_code
  ].filter(Boolean)
  return parts.join(', ')
}

const formatDimensions = (dimensions) => {
  if (!dimensions) return '-'
  const length = dimensions.length || dimensions.l || 0
  const width = dimensions.width || dimensions.w || 0
  const height = dimensions.height || dimensions.h || 0
  if (!length && !width && !height) return '-'
  return `${length} × ${width} × ${height} cm`
}

const formatDate = (date) => {
  if (!date) return '-'
  const locale = user?.preferred_language === 'es' ? 'es-MX' : 'en-US'
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatFileSize = (bytes) => {
  if (!bytes) return ''
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

// Delivery date helper methods
const formatDeliveryDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const locale = user?.preferred_language === 'es' ? 'es-MX' : 'en-US'
  
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getDeliveryStatus = (dateString, arrived) => {
  if (arrived) return 'arrived'
  if (!dateString) return 'unknown'
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deliveryDate = new Date(dateString)
  deliveryDate.setHours(0, 0, 0, 0)
  
  const diffTime = deliveryDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'overdue'
  if (diffDays === 0) return 'today'
  if (diffDays <= 3) return 'soon'
  return 'future'
}

const getDaysUntilDelivery = (dateString) => {
  if (!dateString) return ''
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deliveryDate = new Date(dateString)
  deliveryDate.setHours(0, 0, 0, 0)
  
  const diffTime = deliveryDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) {
    const absDays = Math.abs(diffDays)
    return absDays === 1 
      ? `1 ${t.value.dayOverdue}` 
      : `${absDays} ${t.value.daysOverdue}`
  } else if (diffDays === 0) {
    return t.value.expectedToday
  } else {
    return diffDays === 1 
      ? `1 ${t.value.dayAway}` 
      : `${diffDays} ${t.value.daysAway}`
  }
}

const openMarkArrivedModal = (item) => {
  selectedItem.value = item
  arrivedForm.value = {
    weight: null,
    dimensions: {
      length: null,
      width: null,
      height: null,
    }
  }
  showMarkArrivedModal.value = true
}

const closeMarkArrivedModal = () => {
  showMarkArrivedModal.value = false
  selectedItem.value = null
  arrivedForm.value = {
    weight: null,
    dimensions: {
      length: null,
      width: null,
      height: null,
    }
  }
}

const confirmMarkArrived = async () => {
  if (!arrivedForm.value.weight || !selectedItem.value) return
  
  markingArrived.value = true
  try {
    const payload = {
      arrived: true,  // ADD THIS
      weight: parseFloat(arrivedForm.value.weight),  // Also parseFloat for consistency
    }
    
    // Only include dimensions if at least one value is provided
    if (arrivedForm.value.dimensions.length || arrivedForm.value.dimensions.width || arrivedForm.value.dimensions.height) {
      payload.dimensions = arrivedForm.value.dimensions
    }
    
    await $customFetch(`/admin/orders/${order.value.id}/items/${selectedItem.value.id}/arrived`, {
      method: 'PUT',
      body: payload
    })
    
    $toast.success('Package marked as arrived')
    closeMarkArrivedModal()
    await fetchOrder()
  } catch (error) {
    console.error('Error marking package as arrived:', error)
    $toast.error(error.data?.message || 'Error marking package as arrived')
  } finally {
    markingArrived.value = false
  }
}

const confirmStartProcessing = async () => {
  processingStatus.value = true
  try {
    await $customFetch(`/admin/orders/${order.value.id}/start-processing`, {
      method: 'PUT'
    })
    
    $toast.success('Order processing started')
    showStartProcessingModal.value = false
    await fetchOrder()
  } catch (error) {
    console.error('Error starting processing:', error)
    $toast.error(error.data?.message || 'Error starting processing')
  } finally {
    processingStatus.value = false
  }
}

const confirmMarkAsDelivered = async () => {
  processingStatus.value = true
  try {
    await $customFetch(`/admin/orders/${order.value.id}/mark-delivered`, {
      method: 'PUT'
    })
    
    $toast.success('Order marked as delivered')
    showMarkDeliveredModal.value = false
    await fetchOrder()
  } catch (error) {
    console.error('Error marking as delivered:', error)
    $toast.error(error.data?.message || 'Error marking as delivered')
  } finally {
    processingStatus.value = false
  }
}

const confirmMarkAsPaid = async () => {
  markingPaid.value = true
  try {
    await $customFetch(`/admin/orders/${order.value.id}/mark-paid`, {
      method: 'PUT'
    })
    
    $toast.success('Order marked as paid')
    showMarkPaidModal.value = false
    await fetchOrder()
  } catch (error) {
    console.error('Error marking as paid:', error)
    $toast.error(error.data?.message || 'Error marking as paid')
  } finally {
    markingPaid.value = false
  }
}

const openDeleteModal = () => {
  showActionsMenu.value = false
  showDeleteModal.value = true
}

const confirmDeleteOrder = async () => {
  deletingOrder.value = true
  try {
    await $customFetch(`/admin/orders/${order.value.id}`, {
      method: 'DELETE'
    })
    
    $toast.success('Order deleted successfully')
    await router.push('/app/admin/orders')
  } catch (error) {
    console.error('Error deleting order:', error)
    $toast.error(error.data?.message || 'Error deleting order')
  } finally {
    deletingOrder.value = false
  }
}

onMounted(() => {
  fetchOrder()
})
</script>

<style scoped>
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Smooth transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>