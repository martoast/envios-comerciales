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
      
      <!-- Payment Received Banner (when awaiting_payment) -->
      <div v-if="order.status === 'awaiting_payment'" class="mb-6 bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 rounded-xl p-6 shadow-sm">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-orange-900">{{ t.awaitingPaymentTitle }}</h3>
            <p class="text-sm text-orange-800 mt-1">{{ t.awaitingPaymentMessage }}</p>
            <div class="mt-4 flex flex-wrap gap-3">
              <a 
                v-if="order.payment_link"
                :href="order.payment_link" 
                target="_blank"
                class="inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-700 text-sm font-medium rounded-lg border border-orange-300 hover:bg-orange-50 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                {{ t.viewInvoice }}
              </a>
              <button
                @click="showMarkPaidModal = true"
                class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ t.markAsPaid }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Completed Banner (when paid) -->
      <div v-if="order.status === 'paid'" class="mb-6 bg-gradient-to-r from-green-50 to-emerald-100 border-l-4 border-green-500 rounded-xl p-6 shadow-sm">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-green-900">{{ t.orderCompletedTitle }}</h3>
            <p class="text-sm text-green-800 mt-1">{{ t.orderCompletedMessage }}</p>
            <div v-if="order.paid_at" class="mt-2 text-sm text-green-700">
              {{ t.paidOn }}: {{ formatDate(order.paid_at) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Bar - Shows only the NEXT action in the workflow -->
      <div class="mb-6 bg-white rounded-xl border border-gray-200 p-4">
        <div class="flex flex-wrap gap-3">
          <!-- Packages Complete → Start Processing -->
          <button
            v-if="order.status === 'packages_complete'"
            @click="showStartProcessingModal = true"
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            {{ t.startProcessing }}
          </button>

          <!-- Processing → Ship Order -->
          <button
            v-if="order.status === 'processing'"
            @click="showShipConfirmModal = true"
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
            </svg>
            {{ t.shipOrder }}
          </button>

          <!-- Shipped → Mark as Delivered -->
          <button
            v-if="order.status === 'shipped'"
            @click="showMarkDeliveredModal = true"
            class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            {{ t.markAsDelivered }}
          </button>

          <!-- Delivered → Create Invoice/Quote -->
          <button
            v-if="order.status === 'delivered'"
            @click="showCreateInvoiceModal = true"
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            {{ t.createInvoice }}
          </button>

          <!-- Awaiting Payment or Paid → View/Manage Invoice -->
          <NuxtLink
            v-if="order.status === 'awaiting_payment' || order.status === 'paid'"
            :to="`/app/admin/orders/${order.id}/quote`"
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 text-sm font-medium rounded-lg hover:bg-primary-200 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            {{ t.viewInvoice }}
          </NuxtLink>

          <!-- Info message for earlier stages -->
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

          <!-- Items List -->
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
                <div class="flex justify-between items-start">
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

          <!-- Quote Breakdown (if exists) -->
          <div v-if="order.quote_breakdown && order.quote_breakdown.length > 0" class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.invoiceBreakdown }}</h2>
            <div class="space-y-3">
              <div 
                v-for="(item, index) in order.quote_breakdown" 
                :key="index"
                class="flex justify-between items-start p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ item.item }}</p>
                  <p class="text-xs text-gray-500">{{ item.description }}</p>
                </div>
                <span class="text-sm font-semibold text-gray-900">
                  ${{ parseFloat(item.amount).toFixed(2) }} {{ item.currency || 'MXN' }}
                </span>
              </div>
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-200">
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-gray-900">{{ t.total }}</span>
                <span class="text-xl font-bold text-primary-600">
                  ${{ parseFloat(order.quoted_amount || 0).toFixed(2) }} MXN
                </span>
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
              <div v-if="order.dhl_waybill_number">
                <p class="text-sm text-gray-500">{{ t.dhlWaybill }}</p>
                <a 
                  :href="`https://www.dhl.com/mx-es/home/tracking.html?tracking-id=${order.dhl_waybill_number.replace(/\s/g, '')}`"
                  target="_blank"
                  class="font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                >
                  {{ order.dhl_waybill_number }}
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.totalWeight }}</p>
                <p class="font-medium">{{ order.total_weight || 0 }} kg</p>
              </div>
              <div v-if="order.quoted_amount">
                <p class="text-sm text-gray-500">{{ t.quotedAmount }}</p>
                <p class="font-medium">${{ order.quoted_amount }} MXN</p>
              </div>
              <div v-if="order.amount_paid">
                <p class="text-sm text-gray-500">{{ t.amountPaid }}</p>
                <p class="font-medium text-green-600">${{ order.amount_paid }} MXN</p>
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
              <div v-if="order.completed_at" class="flex gap-3">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-amber-400 mt-1.5"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ t.orderSubmitted }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(order.completed_at) }}</p>
                </div>
              </div>
              <div v-if="order.processing_started_at" class="flex gap-3">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-primary-400 mt-1.5"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ t.processingStarted }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(order.processing_started_at) }}</p>
                </div>
              </div>
              <div v-if="order.shipped_at" class="flex gap-3">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-primary-400 mt-1.5"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ t.shipped }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(order.shipped_at) }}</p>
                </div>
              </div>
              <div v-if="order.delivered_at" class="flex gap-3">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-green-400 mt-1.5"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ t.delivered }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(order.delivered_at) }}</p>
                </div>
              </div>
              <div v-if="order.quote_sent_at" class="flex gap-3">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-orange-400 mt-1.5"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ t.invoiceSent }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(order.quote_sent_at) }}</p>
                </div>
              </div>
              <div v-if="order.paid_at" class="flex gap-3">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-400 mt-1.5"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ t.paymentReceived }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(order.paid_at) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="order.notes" class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.notes }}</h2>
            <p class="text-sm text-gray-600 whitespace-pre-wrap">{{ order.notes }}</p>
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
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
})

const { $customFetch, $toast } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const { t: createTranslations } = useLanguage()

// State
const order = ref(null)
const loading = ref(true)
const processingStatus = ref(false)
const showStartProcessingModal = ref(false)
const showShipConfirmModal = ref(false)
const showMarkDeliveredModal = ref(false)
const showCreateInvoiceModal = ref(false)
const showMarkPaidModal = ref(false)
const showMarkArrivedModal = ref(false)
const showDeleteModal = ref(false)
const showActionsMenu = ref(false)
const markingPaid = ref(false)
const markingArrived = ref(false)
const deletingOrder = ref(false)
const selectedItem = ref(null)

const arrivedForm = ref({
  weight: null,
  declared_value: null,
  dimensions: {
    length: null,
    width: null,
    height: null,
  },
})

// Translations
const translations = {
  orderDetails: { es: 'Detalles de la Orden', en: 'Order Details' },
  loading: { es: 'Cargando...', en: 'Loading...' },
  awaitingPaymentTitle: { es: '💰 Esperando Pago del Cliente', en: '💰 Awaiting Customer Payment' },
  awaitingPaymentMessage: { es: 'La factura ha sido enviada al cliente. Una vez que el cliente complete el pago, marca la orden como pagada para finalizarla.', en: 'Invoice has been sent to customer. Once customer completes payment, mark order as paid to finalize it.' },
  viewInvoice: { es: 'Ver Factura', en: 'View Invoice' },
  markAsPaid: { es: 'Marcar como Pagado', en: 'Mark as Paid' },
  orderCompletedTitle: { es: '✅ Orden Completada', en: '✅ Order Completed' },
  orderCompletedMessage: { es: 'El pago ha sido recibido y la orden está completamente finalizada.', en: 'Payment has been received and the order is fully completed.' },
  paidOn: { es: 'Pagado el', en: 'Paid on' },
  editOrder: { es: 'Editar Orden', en: 'Edit Order' },
  createInvoice: { es: 'Crear Factura', en: 'Create Invoice' },
  startProcessing: { es: 'Iniciar Procesamiento', en: 'Start Processing' },
  shipOrder: { es: 'Enviar Orden', en: 'Ship Order' },
  markAsDelivered: { es: 'Marcar como Entregado', en: 'Mark as Delivered' },
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
  invoiceBreakdown: { es: 'Desglose de Factura', en: 'Invoice Breakdown' },
  total: { es: 'Total', en: 'Total' },
  orderSummary: { es: 'Resumen de Orden', en: 'Order Summary' },
  orderNumber: { es: 'Número de Orden', en: 'Order Number' },
  trackingNumber: { es: 'Número de Rastreo', en: 'Tracking Number' },
  dhlWaybill: { es: 'Guía DHL', en: 'DHL Waybill' },
  totalWeight: { es: 'Peso Total', en: 'Total Weight' },
  totalPackages: { es: 'Total de Paquetes', en: 'Total Packages' },
  quotedAmount: { es: 'Monto Cotizado', en: 'Quoted Amount' },
  amountPaid: { es: 'Monto Pagado', en: 'Amount Paid' },
  timeline: { es: 'Línea de Tiempo', en: 'Timeline' },
  orderCreated: { es: 'Orden Creada', en: 'Order Created' },
  orderSubmitted: { es: 'Orden Enviada', en: 'Order Submitted' },
  processingStarted: { es: 'Procesamiento Iniciado', en: 'Processing Started' },
  shipped: { es: 'Enviado', en: 'Shipped' },
  delivered: { es: 'Entregado', en: 'Delivered' },
  invoiceSent: { es: 'Factura Enviada', en: 'Invoice Sent' },
  paymentReceived: { es: 'Pago Recibido', en: 'Payment Received' },
  notes: { es: 'Notas', en: 'Notes' },
  startProcessingTitle: { es: 'Iniciar Procesamiento', en: 'Start Processing' },
  startProcessingMessage: { es: '¿Estás listo para comenzar a procesar esta orden? Los paquetes se empaquetarán y prepararán para el envío.', en: 'Ready to start processing this order? Packages will be packed and prepared for shipment.' },
  confirmStartProcessing: { es: 'Sí, Iniciar', en: 'Yes, Start' },
  shipOrderTitle: { es: 'Preparar Envío', en: 'Prepare Shipment' },
  shipOrderMessage: { es: 'Estás a punto de marcar esta orden como lista para enviar. Se te pedirá el número de guía y otros detalles.', en: "You're about to mark this order as ready to ship. You'll be asked for DHL waybill number and other details." },
  continueToShip: { es: 'Continuar al Envío', en: 'Continue to Ship' },
  markAsDeliveredTitle: { es: 'Confirmar Entrega', en: 'Confirm Delivery' },
  markAsDeliveredMessage: { es: '¿Confirmas que esta orden ha sido entregada al cliente? Después de esto podrás crear la factura.', en: 'Confirm that this order has been delivered to the customer? After this you can create the invoice.' },
  confirmDelivered: { es: 'Confirmar Entrega', en: 'Confirm Delivery' },
  createInvoiceTitle: { es: 'Crear Factura', en: 'Create Invoice' },
  createInvoiceMessage: { es: 'La orden ha sido entregada. Ahora puedes crear la factura con los costos finales para enviarla al cliente.', en: 'The order has been delivered. Now you can create the invoice with final costs to send to the customer.' },
  continueToInvoice: { es: 'Continuar a Factura', en: 'Continue to Invoice' },
  markAsPaidTitle: { es: 'Confirmar Pago Recibido', en: 'Confirm Payment Received' },
  markAsPaidMessage: { es: '¿Confirmas que el pago ha sido recibido? Esto finalizará la orden y notificará al cliente.', en: 'Confirm that payment has been received? This will finalize the order and notify the customer.' },
  invoiceAmount: { es: 'Monto de Factura', en: 'Invoice Amount' },
  confirmPaid: { es: 'Confirmar Pagado', en: 'Confirm Paid' },
  processing: { es: 'Procesando...', en: 'Processing...' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  markPackageArrived: { es: 'Marcar Paquete como Llegado', en: 'Mark Package as Arrived' },
  packageWeight: { es: 'Peso del Paquete', en: 'Package Weight' },
  weightHint: { es: 'Ingrese el peso en kilogramos', en: 'Enter weight in kilograms' },
  dimensionsHint: { es: 'Largo x Ancho x Alto en centímetros', en: 'Length x Width x Height in centimeters' },
  optional: { es: 'Opcional', en: 'Optional' },
  confirmArrived: { es: 'Confirmar Llegada', en: 'Confirm Arrival' },
  marking: { es: 'Marcando...', en: 'Marking...' },
  deleteOrder: { es: 'Eliminar Orden', en: 'Delete Order' },
  deleteOrderTitle: { es: 'Eliminar Orden Permanentemente', en: 'Delete Order Permanently' },
  deleteOrderWarning: { es: 'Esta acción no se puede deshacer.', en: 'This action cannot be undone.' },
  customer: { es: 'Cliente', en: 'Customer' },
  warningTitle: { es: 'Advertencia', en: 'Warning' },
  deleteWarningMessage: { es: 'Se eliminarán todos los datos asociados con esta orden, incluyendo artículos, archivos y registros de pago.', en: 'All data associated with this order will be deleted, including items, files, and payment records.' },
  confirmDelete: { es: 'Sí, Eliminar', en: 'Yes, Delete' },
  deleting: { es: 'Eliminando...', en: 'Deleting...' },
  collecting: { es: 'Agregando Artículos', en: 'Adding Items' },
  awaiting_packages: { es: 'Esperando Paquetes', en: 'Awaiting Packages' },
  packages_complete: { es: 'Paquetes Completos', en: 'Packages Complete' },
  processingStatus: { es: 'Procesando', en: 'Processing' },
  shippedStatus: { es: 'Enviado', en: 'Shipped' },
  deliveredStatus: { es: 'Entregado', en: 'Delivered' },
  awaiting_payment: { es: 'Esperando Pago', en: 'Awaiting Payment' },
  paid: { es: 'Pagado', en: 'Paid' },
  cancelled: { es: 'Cancelado', en: 'Cancelled' },
  proofOfPurchase: { es: 'Comprobante de Compra', en: 'Proof of Purchase' },
  viewDocument: { es: 'Ver Documento', en: 'View Document' },
  downloadDocument: { es: 'Descargar', en: 'Download' },
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

const confirmStartProcessing = async () => {
  processingStatus.value = true
  try {
    await $customFetch(`/admin/orders/${order.value.id}/process`, {
      method: 'PUT'
    })
    $toast.success('Order marked as processing')
    showStartProcessingModal.value = false
    await fetchOrder()
  } catch (error) {
    console.error('Error marking as processing:', error)
    $toast.error(error.data?.message || 'Error marking as processing')
  } finally {
    processingStatus.value = false
  }
}

const confirmMarkAsDelivered = async () => {
  processingStatus.value = true
  try {
    await $customFetch(`/admin/orders/${order.value.id}/status`, {
      method: 'PUT',
      body: {
        status: 'delivered'
      }
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
    await $customFetch(`/admin/orders/${order.value.id}/status`, {
      method: 'PUT',
      body: {
        status: 'paid'
      }
    })
    $toast.success('Order marked as paid successfully! 🎉')
    showMarkPaidModal.value = false
    await fetchOrder()
  } catch (error) {
    console.error('Error marking as paid:', error)
    $toast.error(error.data?.message || 'Error marking as paid')
  } finally {
    markingPaid.value = false
  }
}

const openMarkArrivedModal = (item) => {
  selectedItem.value = item
  arrivedForm.value = {
    weight: null,
    declared_value: item.declared_value || null,
    dimensions: {
      length: null,
      width: null,
      height: null,
    },
  }
  showMarkArrivedModal.value = true
}

const closeMarkArrivedModal = () => {
  showMarkArrivedModal.value = false
  selectedItem.value = null
  arrivedForm.value = {
    weight: null,
    declared_value: null,
    dimensions: {
      length: null,
      width: null,
      height: null,
    },
  }
}

const confirmMarkArrived = async () => {
  if (!selectedItem.value || !arrivedForm.value.weight) return

  markingArrived.value = true
  try {
    const body = {
      arrived: true,
      weight: parseFloat(arrivedForm.value.weight),
    }

    if (arrivedForm.value.declared_value !== null && arrivedForm.value.declared_value !== '') {
      body.declared_value = parseFloat(arrivedForm.value.declared_value)
    }

    if (arrivedForm.value.dimensions.length && arrivedForm.value.dimensions.width && arrivedForm.value.dimensions.height) {
      body.dimensions = arrivedForm.value.dimensions
    }

    await $customFetch(`/admin/orders/${order.value.id}/items/${selectedItem.value.id}/arrived`, {
      method: 'PUT',
      body,
    })

    $toast.success('Item marked as arrived')
    await fetchOrder()
    closeMarkArrivedModal()
  } catch (error) {
    console.error('Error marking item arrived:', error)
    $toast.error('Error updating item')
  } finally {
    markingArrived.value = false
  }
}

const openDeleteModal = () => {
  showActionsMenu.value = false
  showDeleteModal.value = true
}

const confirmDeleteOrder = async () => {
  deletingOrder.value = true
  try {
    await $customFetch(`/admin/management/orders/${order.value.id}`, {
      method: 'DELETE'
    })
    
    $toast.success('Order deleted successfully')
    await router.push('/app/admin/orders')
  } catch (error) {
    console.error('Error deleting order:', error)
    $toast.error('Error deleting order')
  } finally {
    deletingOrder.value = false
    showDeleteModal.value = false
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
  const statusMap = {
    collecting: 'collecting',
    awaiting_packages: 'awaiting_packages',
    packages_complete: 'packages_complete',
    processing: 'processingStatus',
    shipped: 'shippedStatus',
    delivered: 'deliveredStatus',
    awaiting_payment: 'awaiting_payment',
    paid: 'paid',
    cancelled: 'cancelled',
  }
  return t.value[statusMap[status]] || status
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
  return new Date(date).toLocaleDateString('es-MX', {
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
</style>