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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">{{ t.orderDetails }}</h1>
              <p class="text-sm text-gray-500">{{ order?.order_number }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            

            <!-- Status Badge -->
            <span
              v-if="order"
              :class="['px-3 py-1 rounded-full text-xs font-medium', getStatusColor(order.status)]"
            >
              {{ getStatusLabel(order.status) }}
            </span>

            <div class="relative">
              <button
                @click="showActionsMenu = !showActionsMenu"
                @blur="() => setTimeout(() => (showActionsMenu = false), 200)"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
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
                <div
                  v-if="showActionsMenu"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50"
                >
                  <NuxtLink
                    :to="`/app/admin/orders/${order.id}/edit`"
                    @click="showActionsMenu = false"
                    class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {{ t.editOrder }}
                  </NuxtLink>
                  <hr class="my-1 border-gray-100" />
                  <button
                    @click="openDeleteModal"
                    class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
      <div class="mb-6 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div class="flex flex-wrap gap-3 items-center">
          <span class="text-sm font-medium text-gray-500 mr-2">{{ t.currentStage }}:</span>

          <!-- 1. Waiting for Packages -->
          <div
            v-if="['collecting', 'awaiting_packages'].includes(order.status)"
            class="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ t.waitingForPackages }}
          </div>

          <!-- 2. Start Processing -->
          <button
            v-if="order.status === 'packages_complete'"
            @click="showStartProcessingModal = true"
            class="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ t.startProcessing }}
          </button>

          <!-- 3a. Ship Order - SHIPPING orders only -->
          <button
            v-if="order.status === 'processing' && !isCrossing"
            @click="showShipOrderModal = true"
            class="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
            {{ t.shipOrder }}
          </button>

          <!-- 3b. Mark Ready for Pickup - CROSSING orders only -->
          <button
            v-if="order.status === 'processing' && isCrossing"
            @click="showReadyForPickupModal = true"
            class="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
            </svg>
            {{ t.markReadyForPickup }}
          </button>

          <!-- 4a. SHIPPING: Mark as Delivered (after shipped) -->
          <button
            v-if="order.status === 'shipped' && !isCrossing"
            @click="showMarkDeliveredModal = true"
            class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ t.markAsDelivered }}
          </button>

          <!-- 4b. CROSSING: Awaiting Payment (shipped but not paid) -->
          <div
            v-if="order.status === 'shipped' && isCrossing && !order.paid_at"
            class="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 text-sm rounded-lg"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ t.awaitingPayment }}
            <button
              @click="showMarkPaidModal = true"
              class="ml-2 px-2 py-1 bg-orange-600 text-white text-xs font-medium rounded hover:bg-orange-700 transition-colors"
            >
              {{ t.markPaidManual }}
            </button>
          </div>

          <!-- 4c. CROSSING: Payment Received - Ready to Mark Picked Up -->
          <div
            v-if="order.status === 'shipped' && isCrossing && order.paid_at"
            class="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 text-sm rounded-lg"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ t.paymentReceived }}
            <button
              @click="showMarkDeliveredModal = true"
              class="ml-2 px-2 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
            >
              {{ t.markAsPickedUp }}
            </button>
          </div>

          <!-- 5a. SHIPPING: Send Final Invoice (after delivered) -->
          <button
            v-if="order.status === 'delivered' && !isCrossing"
            @click="showFinalInvoiceModal = true"
            class="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            {{ t.sendFinalInvoice }}
          </button>

          <!-- 6. SHIPPING: Mark as Paid (after awaiting_payment) -->
          <button
            v-if="order.status === 'awaiting_payment' && !isCrossing"
            @click="showMarkPaidModal = true"
            class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ t.markAsPaid }}
          </button>

          <!-- Order Complete indicator -->
          <div
            v-if="(order.status === 'paid' && !isCrossing) || (order.status === 'delivered' && isCrossing)"
            class="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 text-sm rounded-lg"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ t.orderComplete }}
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Customer Info -->
          <div class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              {{ t.customerInformation }}
            </h2>
            <div class="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
              <!-- Name -->
              <div>
                <p class="text-xs sm:text-sm text-gray-500">{{ t.name }}</p>
                <p class="font-medium text-sm sm:text-base text-gray-900">{{ order.user.name }}</p>
              </div>

              <!-- Email -->
              <div class="min-w-0">
                <p class="text-xs sm:text-sm text-gray-500">{{ t.email }}</p>
                <a
                  :href="`mailto:${order.user.email}`"
                  class="font-medium text-sm sm:text-base text-primary-600 hover:text-primary-700 hover:underline block truncate"
                  :title="order.user.email"
                >
                  {{ order.user.email }}
                </a>
              </div>

              <!-- Delivery Address (SHIPPING orders only) -->
              <div
                v-if="!isCrossing"
                class="sm:col-span-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100"
              >
                <p class="text-xs sm:text-sm text-gray-500 mb-1">{{ t.deliveryAddress }}</p>
                <p class="text-sm font-medium text-gray-900 break-words">
                  {{ formatAddress(order.delivery_address) }}
                </p>
                <div class="flex flex-wrap gap-2 mt-2">
                  <a
                    v-if="order.delivery_address"
                    :href="`https://maps.google.com/?q=${encodeURIComponent(formatAddress(order.delivery_address))}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ t.viewOnMap }}
                  </a>
                  <button
                    v-if="order.delivery_address"
                    @click="copyToClipboard(formatAddress(order.delivery_address))"
                    class="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {{ t.copyAddress }}
                  </button>
                </div>
              </div>

              <!-- Pickup Location (CROSSING orders only) -->
              <div
                v-if="isCrossing"
                class="sm:col-span-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100"
              >
                <p class="text-xs sm:text-sm text-gray-500 mb-1">{{ t.pickupLocation }}</p>
                <div class="bg-amber-50 rounded-lg p-3 border border-amber-100">
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-semibold text-gray-900">{{ t.warehouseName }}</p>
                      <p class="text-xs text-gray-600 mt-0.5">{{ t.warehouseAddress }}</p>
                      <a
                        href="https://maps.app.goo.gl/4SsEVjy2D4noFM9n8"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 mt-2 font-medium"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {{ t.getDirections }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Items List -->
          <AdminOrderItemsList
            :items="order.items"
            :order-status="order.status"
            @mark-arrived="openMarkArrivedModal"
          />
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Order Summary -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.orderSummary }}</h2>
            <div class="space-y-3">
              <div class="flex justify-between">
                <p class="text-sm text-gray-500">{{ t.orderNumber }}</p>
                <p class="font-medium">{{ order.order_number }}</p>
              </div>
              <div class="flex justify-between">
                <p class="text-sm text-gray-500">{{ t.trackingNumber }}</p>
                <p class="font-medium">{{ order.tracking_number }}</p>
              </div>
              <div class="flex justify-between">
                <p class="text-sm text-gray-500">{{ t.orderType }}</p>
                <span
                  :class="[
                    'px-2 py-0.5 rounded text-xs font-medium',
                    isCrossing ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  ]"
                >
                  {{ isCrossing ? t.crossingOnly : t.shipping }}
                </span>
              </div>
              <div class="flex justify-between">
                <p class="text-sm text-gray-500">{{ t.totalWeight }}</p>
                <p class="font-medium">{{ order.total_weight || 0 }} kg</p>
              </div>

              <!-- Multi-Box Display -->
              <div v-if="hasMultipleBoxes" class="border-t border-gray-100 pt-3 mt-3">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-700">{{ t.boxes }}</p>
                  <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                    {{ totalBoxCount }} {{ totalBoxCount === 1 ? t.box : t.boxes }}
                  </span>
                </div>
                <div class="space-y-2">
                  <div
                    v-for="box in order.boxes"
                    :key="box.id"
                    class="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="getBoxSizeColor(box.box_size)">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-900">
                          {{ box.quantity > 1 ? `${box.quantity}x ` : '' }}{{ box.box_name }}
                        </p>
                        <p class="text-xs text-gray-500">{{ formatBoxSizeLabel(box.box_size) }}</p>
                      </div>
                    </div>
                    <p class="text-sm font-semibold text-gray-900">${{ (box.box_price * box.quantity).toFixed(2) }}</p>
                  </div>
                </div>
                <div class="flex justify-between items-center mt-3 pt-2 border-t border-gray-200">
                  <p class="text-sm font-semibold text-gray-700">{{ t.totalBoxPrice }}</p>
                  <p class="text-base font-bold text-gray-900">${{ totalBoxPrice.toFixed(2) }}</p>
                </div>
              </div>

              <!-- Single Box Display -->
              <div v-else-if="order.box_size" class="flex justify-between">
                <p class="text-sm text-gray-500">{{ t.boxSize }}</p>
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded flex items-center justify-center" :class="getBoxSizeColor(order.box_size)">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </span>
                  <p class="font-medium capitalize">{{ order.box_size.replace('-', ' ') }}</p>
                </div>
              </div>

              <!-- Guia Number (SHIPPING only) -->
              <div
                v-if="order.guia_number && !isCrossing"
                class="flex justify-between items-center border-t border-gray-100 pt-3 mt-3"
              >
                <p class="text-sm font-medium text-primary-700">{{ t.guiaNumber }}</p>
                <NuxtLink
                  :to="`/track?tracking_number=${order.guia_number}`"
                  target="_blank"
                  class="flex items-center gap-1 font-bold text-primary-700 font-mono hover:text-primary-900 hover:underline decoration-2 underline-offset-2 transition-colors"
                >
                  {{ order.guia_number }}
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </NuxtLink>
              </div>

              <!-- FINANCIALS SECTION -->
              <div
                v-if="order.deposit_amount || order.quoted_amount || order.amount_paid"
                class="mt-6 pt-4 border-t-2 border-gray-100"
              >
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{{ t.financials }}</h3>

                <!-- SHIPPING: Deposit (50%) -->
                <div v-if="order.deposit_amount && !isCrossing" class="mb-3 p-3 bg-gray-50 rounded-lg">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-xs font-semibold text-gray-600">{{ t.deposit }} (50%)</span>
                    <span class="text-sm font-bold text-gray-900">${{ order.deposit_amount }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span
                      class="text-[10px] px-1.5 py-0.5 rounded font-medium"
                      :class="order.deposit_paid_at ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'"
                    >
                      {{ order.deposit_paid_at ? t.paid : t.pending }}
                    </span>
                    <div class="flex items-center gap-2">
                      <span v-if="order.deposit_paid_at" class="text-xs text-gray-500">
                        {{ formatDate(order.deposit_paid_at) }}
                      </span>
                      <a
                        v-if="order.deposit_payment_link"
                        :href="order.deposit_payment_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-xs text-primary-600 hover:text-primary-800 hover:underline flex items-center gap-1"
                      >
                        {{ t.invoice }}
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <!-- CROSSING: Full Payment (100%) - Uses paid_at NOT deposit_paid_at -->
                <div v-if="order.deposit_amount && isCrossing" class="mb-3 p-3 bg-gray-50 rounded-lg">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-xs font-semibold text-gray-600">{{ t.fullPayment }} (100%)</span>
                    <span class="text-sm font-bold text-gray-900">${{ order.deposit_amount }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span
                      class="text-[10px] px-1.5 py-0.5 rounded font-medium"
                      :class="order.paid_at ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'"
                    >
                      {{ order.paid_at ? t.paid : t.pending }}
                    </span>
                    <div class="flex items-center gap-2">
                      <span v-if="order.paid_at" class="text-xs text-gray-500">
                        {{ formatDate(order.paid_at) }}
                      </span>
                      <a
                        v-if="order.deposit_payment_link"
                        :href="order.deposit_payment_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-xs text-primary-600 hover:text-primary-800 hover:underline flex items-center gap-1"
                      >
                        {{ t.invoice }}
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <!-- SHIPPING: Final Balance (remaining 50%) -->
                <div v-if="order.quoted_amount && !isCrossing" class="mb-3 p-3 bg-gray-50 rounded-lg">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-xs font-semibold text-gray-600">{{ t.finalBalance }}</span>
                    <span class="text-sm font-bold text-gray-900">${{ order.quoted_amount }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span
                      class="text-[10px] px-1.5 py-0.5 rounded font-medium"
                      :class="order.paid_at ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'"
                    >
                      {{ order.paid_at ? t.paid : t.pending }}
                    </span>
                    <div class="flex items-center gap-2">
                      <span v-if="order.paid_at" class="text-xs text-gray-500">
                        {{ formatDate(order.paid_at) }}
                      </span>
                      <a
                        v-if="order.payment_link"
                        :href="order.payment_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-xs text-primary-600 hover:text-primary-800 hover:underline flex items-center gap-1"
                      >
                        {{ t.invoice }}
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Total Paid -->
                <div v-if="showTotalPaid" class="mt-3 pt-3 border-t border-gray-200">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-bold text-gray-700">{{ t.totalPaid }}</span>
                    <span class="text-xl font-black text-green-600">${{ actualAmountPaid.toFixed(2) }}</span>
                  </div>
                  <div class="mt-2">
                    <div class="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{{ t.paymentProgress }}</span>
                      <span>{{ paymentPercentage }}%</span>
                    </div>
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-green-500 rounded-full transition-all duration-500"
                        :style="{ width: `${paymentPercentage}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <AdminOrderTimeline :order="order" />
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AdminOrderModalStartProcessing
      :show="showStartProcessingModal"
      :order="order"
      @close="showStartProcessingModal = false"
      @success="handleModalSuccess"
    />

    <AdminOrderModalShipOrder
      :show="showShipOrderModal"
      :order="order"
      @close="showShipOrderModal = false"
      @success="handleModalSuccess"
    />

    <AdminOrderModalReadyForPickup
      :show="showReadyForPickupModal"
      :order="order"
      @close="showReadyForPickupModal = false"
      @success="handleModalSuccess"
    />

    <AdminOrderModalMarkDelivered
      :show="showMarkDeliveredModal"
      :order="order"
      @close="showMarkDeliveredModal = false"
      @success="handleModalSuccess"
    />

    <AdminOrderModalFinalInvoice
      :show="showFinalInvoiceModal"
      :order="order"
      @close="showFinalInvoiceModal = false"
      @success="handleModalSuccess"
    />

    <AdminOrderModalMarkPaid
      :show="showMarkPaidModal"
      :order="order"
      @close="showMarkPaidModal = false"
      @success="handleModalSuccess"
    />

    <AdminOrderModalMarkArrived
      :show="showMarkArrivedModal"
      :item="selectedItem"
      :order-id="order?.id"
      @close="closeMarkArrivedModal"
      @success="handleModalSuccess"
    />

    <AdminOrderModalDelete
      :show="showDeleteModal"
      :order="order"
      @close="showDeleteModal = false"
      @success="() => router.push('/app/admin/orders')"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AdminOrderItemsList from "~/components/admin/AdminOrderItemsList.vue";
import AdminOrderTimeline from "~/components/admin/AdminOrderTimeline.vue";
import AdminOrderModalStartProcessing from "~/components/admin/AdminOrderModalStartProcessing.vue";
import AdminOrderModalShipOrder from "~/components/admin/AdminOrderModalShipOrder.vue";
import AdminOrderModalReadyForPickup from "~/components/admin/AdminOrderModalReadyForPickup.vue";
import AdminOrderModalMarkDelivered from "~/components/admin/AdminOrderModalMarkDelivered.vue";
import AdminOrderModalFinalInvoice from "~/components/admin/AdminOrderModalFinalInvoice.vue";
import AdminOrderModalMarkPaid from "~/components/admin/AdminOrderModalMarkPaid.vue";
import AdminOrderModalMarkArrived from "~/components/admin/AdminOrderModalMarkArrived.vue";
import AdminOrderModalDelete from "~/components/admin/AdminOrderModalDelete.vue";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const { $customFetch, $toast } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const { t: createTranslations } = useLanguage();

const order = ref(null);
const loading = ref(true);
const showActionsMenu = ref(false);

// Modal States
const showStartProcessingModal = ref(false);
const showShipOrderModal = ref(false);
const showReadyForPickupModal = ref(false);
const showMarkDeliveredModal = ref(false);
const showFinalInvoiceModal = ref(false);
const showMarkPaidModal = ref(false);
const showMarkArrivedModal = ref(false);
const showDeleteModal = ref(false);
const selectedItem = ref(null);

const translations = {
  orderDetails: { es: "Detalles de la Orden", en: "Order Details" },
  loading: { es: "Cargando...", en: "Loading..." },
  editOrder: { es: "Editar Orden", en: "Edit Order" },
  deleteOrder: { es: "Eliminar Orden", en: "Delete Order" },
  crossingOnly: { es: "Solo Cruce", en: "Crossing Only" },
  shipping: { es: "Envío", en: "Shipping" },
  currentStage: { es: "Etapa Actual", en: "Current Stage" },
  waitingForPackages: { es: "Esperando Paquetes", en: "Waiting for Packages" },
  startProcessing: { es: "Iniciar Procesamiento", en: "Start Processing" },
  shipOrder: { es: "Enviar (50% Depósito)", en: "Ship (50% Deposit)" },
  markReadyForPickup: { es: "Listo para Recoger", en: "Ready for Pickup" },
  markAsDelivered: { es: "Marcar Entregado", en: "Mark Delivered" },
  markAsPickedUp: { es: "Marcar Recogido", en: "Mark Picked Up" },
  sendFinalInvoice: { es: "Enviar Factura Final", en: "Send Final Invoice" },
  markAsPaid: { es: "Marcar Pagado", en: "Mark Paid" },
  markPaidManual: { es: "Marcar Pagado", en: "Mark Paid" },
  awaitingPayment: { es: "Listo para recoger! Esperando Pago", en: "Ready for pickup! Awaiting Payment" },
  paymentReceived: { es: "Pago Recibido", en: "Payment Received" },
  orderComplete: { es: "Orden Completada", en: "Order Complete" },
  customerInformation: { es: "Información del Cliente", en: "Customer Information" },
  name: { es: "Nombre", en: "Name" },
  email: { es: "Email", en: "Email" },
  deliveryAddress: { es: "Dirección de Entrega", en: "Delivery Address" },
  pickupLocation: { es: "Ubicación de Recolección", en: "Pickup Location" },
  warehouseName: { es: "Colectivo Las Ferias La Cacho", en: "Colectivo Las Ferias La Cacho" },
  warehouseAddress: { es: "Blvd. Insurgentes #18512, Río Tijuana 3ra Etapa, Tijuana, BC", en: "Blvd. Insurgentes #18512, Río Tijuana 3ra Etapa, Tijuana, BC" },
  getDirections: { es: "Ver en Google Maps", en: "See in Google Maps" },
  orderSummary: { es: "Resumen", en: "Summary" },
  orderNumber: { es: "Orden #", en: "Order #" },
  trackingNumber: { es: "Rastreo #", en: "Tracking #" },
  orderType: { es: "Tipo", en: "Type" },
  totalWeight: { es: "Peso Total", en: "Total Weight" },
  boxes: { es: "Cajas", en: "Boxes" },
  box: { es: "Caja", en: "Box" },
  boxSize: { es: "Tamaño de Caja", en: "Box Size" },
  totalBoxPrice: { es: "Precio Total Cajas", en: "Total Box Price" },
  guiaNumber: { es: "Número de Guía", en: "Guia Number" },
  financials: { es: "Financieros", en: "Financials" },
  deposit: { es: "Depósito", en: "Deposit" },
  fullPayment: { es: "Pago Completo", en: "Full Payment" },
  finalBalance: { es: "Saldo Final", en: "Final Balance" },
  paid: { es: "PAGADO", en: "PAID" },
  pending: { es: "PENDIENTE", en: "PENDING" },
  invoice: { es: "Factura", en: "Invoice" },
  totalPaid: { es: "Total Pagado", en: "Total Paid" },
  paymentProgress: { es: "Progreso de Pago", en: "Payment Progress" },
  viewOnMap: { es: "Ver en mapa", en: "View on map" },
  copyAddress: { es: "Copiar", en: "Copy" },
  copiedToClipboard: { es: "¡Copiado!", en: "Copied!" },
};

const t = createTranslations(translations);

// Helper: Check if this is a crossing order
const isCrossing = computed(() => order.value?.order_type === 'crossing');

const hasMultipleBoxes = computed(() => {
  return order.value?.boxes && order.value.boxes.length > 0;
});

const totalBoxCount = computed(() => {
  if (!order.value?.boxes) return 0;
  return order.value.boxes.reduce((sum, box) => sum + (box.quantity || 1), 0);
});

const totalBoxPrice = computed(() => {
  if (!order.value?.boxes || order.value.boxes.length === 0) {
    return order.value?.box_price || 0;
  }
  return order.value.boxes.reduce((sum, box) => sum + box.box_price * (box.quantity || 1), 0);
});

// Check if payment is complete based on order type
const isPaymentComplete = computed(() => {
  if (!order.value) return false;
  
  if (isCrossing.value) {
    // Crossing: single 100% payment, check paid_at
    return !!order.value.paid_at;
  } else {
    // Shipping: check if both deposit and final payment are done
    return !!order.value.paid_at;
  }
});

// Check if deposit/initial payment is complete
const isInitialPaymentComplete = computed(() => {
  if (!order.value) return false;
  
  if (isCrossing.value) {
    // Crossing: 100% payment via paid_at
    return !!order.value.paid_at;
  } else {
    // Shipping: 50% deposit via deposit_paid_at
    return !!order.value.deposit_paid_at;
  }
});

const actualAmountPaid = computed(() => {
  if (!order.value) return 0;
  
  // If amount_paid is explicitly set, use it
  if (order.value.amount_paid > 0) {
    return parseFloat(order.value.amount_paid);
  }
  
  if (isCrossing.value) {
    // Crossing: 100% payment - check paid_at
    if (order.value.paid_at && order.value.deposit_amount) {
      return parseFloat(order.value.deposit_amount);
    }
  } else {
    // Shipping: Could have deposit + final payment
    let total = 0;
    
    // Add deposit if paid
    if (order.value.deposit_paid_at && order.value.deposit_amount) {
      total += parseFloat(order.value.deposit_amount);
    }
    
    // Add final payment if paid
    if (order.value.paid_at && order.value.quoted_amount) {
      total += parseFloat(order.value.quoted_amount);
    }
    
    return total;
  }
  
  return 0;
});

const paymentPercentage = computed(() => {
  if (!order.value) return 0;
  
  const totalDue = parseFloat(order.value.box_price || 0) + 
    (order.value.quote_breakdown?.reduce((s, i) => s + i.amount, 0) || 0);
  
  if (totalDue <= 0) return 0;
  
  const paid = actualAmountPaid.value;
  return Math.min(100, Math.round((paid / totalDue) * 100));
});

// Show total paid section only when there's payment info
const showTotalPaid = computed(() => {
  if (!order.value) return false;
  
  const hasPaymentData = order.value.deposit_amount || order.value.quoted_amount;
  const hasPayment = isCrossing.value ? order.value.paid_at : (order.value.deposit_paid_at || order.value.paid_at);
  
  return hasPaymentData && hasPayment;
});

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    $toast.success(t.value.copiedToClipboard);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

const fetchOrder = async () => {
  loading.value = true;
  try {
    const response = await $customFetch(`/admin/orders/${route.params.id}`);
    order.value = response.data;
  } catch (error) {
    $toast.error("Error loading order");
    router.push("/app/admin/orders");
  } finally {
    loading.value = false;
  }
};

const handleModalSuccess = async () => {
  showStartProcessingModal.value = false;
  showShipOrderModal.value = false;
  showReadyForPickupModal.value = false;
  showMarkDeliveredModal.value = false;
  showFinalInvoiceModal.value = false;
  showMarkPaidModal.value = false;
  showMarkArrivedModal.value = false;
  await fetchOrder();
};

const openMarkArrivedModal = (item) => {
  selectedItem.value = item;
  showMarkArrivedModal.value = true;
};

const closeMarkArrivedModal = () => {
  showMarkArrivedModal.value = false;
  selectedItem.value = null;
};

const openDeleteModal = () => {
  showActionsMenu.value = false;
  showDeleteModal.value = true;
};

const getStatusColor = (status) => {
  const colors = {
    collecting: "bg-primary-100 text-primary-700",
    awaiting_packages: "bg-amber-100 text-amber-700",
    packages_complete: "bg-primary-100 text-primary-700",
    processing: "bg-primary-100 text-primary-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    awaiting_payment: "bg-orange-100 text-orange-700",
    paid: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

const getStatusLabel = (status) => {
  return status ? status.replace(/_/g, " ").toUpperCase() : "";
};

const getBoxSizeColor = (size) => {
  const colors = {
    "extra-small": "bg-gray-100 text-gray-600",
    small: "bg-blue-100 text-blue-600",
    medium: "bg-green-100 text-green-600",
    large: "bg-amber-100 text-amber-600",
    "extra-large": "bg-red-100 text-red-600",
  };
  return colors[size] || "bg-gray-100 text-gray-600";
};

const formatBoxSizeLabel = (size) => {
  const labels = { "extra-small": "XS", small: "S", medium: "M", large: "L", "extra-large": "XL" };
  return labels[size] || size;
};

const formatAddress = (address) => {
  if (!address) return "-";
  if (address.full_address) return address.full_address;
  return [address.street, address.exterior_number, address.colonia, address.municipio, address.estado, address.postal_code].filter(Boolean).join(", ") || "-";
};

onMounted(() => {
  fetchOrder();
});
</script>